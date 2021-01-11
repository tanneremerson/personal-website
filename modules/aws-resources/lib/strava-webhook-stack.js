const cdk = require('@aws-cdk/core');

const apigateway = require('@aws-cdk/aws-apigateway');
const lambda = require('@aws-cdk/aws-lambda');
const lambdaEventSource = require('@aws-cdk/aws-lambda-event-sources');
const sqs = require('@aws-cdk/aws-sqs');
const ssm = require('@aws-cdk/aws-ssm');

const defaultLambdaConfig = {
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: 'index.handler',
  reservedConcurrentExecutions: 1,
};

class StravaWebhookStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'strava/event', {
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        methodOptions: {
          '/*/*': {
            throttlingRateLimit: 1,
            throttlingBurstLimit: 1,
          },
        },
      },
    });

    const stravaEventQueueDLQ = new sqs.Queue(this, 'strava-event-DLQ', {});

    const stravaEventQueue = new sqs.Queue(this, 'strava-event', {
      deadLetterQueue: {
        maxReceiveCount: 2,
        queue: stravaEventQueueDLQ,
      },
    });

    // Function to process incoming events from strava
    const StravaWebhookProcessor = new lambda.Function(this, 'strava-webhook-processor', {
      ...defaultLambdaConfig,
      code: lambda.Code.asset('lambda/strava-webhook-processor'),
      environment: {
        QUEUE_URL: stravaEventQueue.queueUrl,
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    });

    // Allow Lambda to send messages to SQS
    stravaEventQueue.grantSendMessages(StravaWebhookProcessor);

    // Create new route with lambda integration
    api.root
      .resourceForPath('strava/event')
      .addMethod('POST', new apigateway.LambdaIntegration(StravaWebhookProcessor));

    // functions to process messages from the queue
    const stravaEventProcessor = new lambda.Function(this, 'strava-event-processor', {
      ...defaultLambdaConfig,
      code: lambda.Code.asset('lambda/strava-event-processor'),
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    });

    stravaEventProcessor.addEventSource(new lambdaEventSource.SqsEventSource(stravaEventQueue));

    /*
     * In order to create the webhook you have to verify the request.
     * Once this is complete, the requests should only be POSTs.
     * Remove resource unless required for bootstrapping.
     */
    const stravaVerifyToken = ssm.StringParameter.valueForStringParameter(
      this,
      '/strava/verify-token'
    );

    const stravaWebhookVerifier = new lambda.Function(this, 'strava-webhook-verifier', {
      ...defaultLambdaConfig,
      code: lambda.Code.asset('lambda/strava-webhook-verifier'),
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        STRAVA_VERIFY_TOKEN: stravaVerifyToken,
      },
    });

    api.root
      .resourceForPath('strava/event')
      .addMethod('GET', new apigateway.LambdaIntegration(stravaWebhookVerifier));

    /*
     * Store the useful bits in parameter store
     */
    // eslint-disable-next-line no-new
    new ssm.StringParameter(this, 'strava-api-gateway', {
      description: 'URL assigned to API gateway',
      parameterName: '/strava/api-gateway-url',
      stringValue: api.url,
    });
  }
}

module.exports = { StravaWebhookStack };
