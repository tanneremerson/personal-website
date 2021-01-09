import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambdaEventSource from "@aws-cdk/aws-lambda-event-sources";
import * as sqs from "@aws-cdk/aws-sqs";
import * as ssm from "@aws-cdk/aws-ssm";
import { v4 as uuidv4 } from "uuid";

import * as cdk from "@aws-cdk/core";

const defaultLambdaConfig = {
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: "index.handler",
  reservedConcurrentExecutions: 1,
};

export class StravaWebhookStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "strava/event", {
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        methodOptions: {
          "/*/*": {
            throttlingRateLimit: 1,
            throttlingBurstLimit: 1,
          },
        },
      },
    });

    const stravaEventQueueDLQ = new sqs.Queue(this, "strava-event-DLQ", {});

    const stravaEventQueue = new sqs.Queue(this, "strava-event", {
      deadLetterQueue: {
        maxReceiveCount: 2,
        queue: stravaEventQueueDLQ,
      },
    });

    // Function to process incoming events from strava
    const StravaWebhookProcessor = new lambda.Function(
      this,
      "strava-webhook-processor",
      {
        ...defaultLambdaConfig,
        code: lambda.Code.asset("lambda/strava-webhook-processor"),
        environment: {
          QUEUE_URL: stravaEventQueue.queueUrl,
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
        },
      }
    );

    // Allow Lambda to send messages to SQS
    stravaEventQueue.grantSendMessages(StravaWebhookProcessor);

    // Create new route with lambda integration
    api.root
      .resourceForPath("strava/event")
      .addMethod(
        "POST",
        new apigateway.LambdaIntegration(StravaWebhookProcessor)
      );

    // functions to process messages from the queue
    const stravaEventProcessor = new lambda.Function(
      this,
      "strava-event-processor",
      {
        ...defaultLambdaConfig,
        code: lambda.Code.asset("lambda/strava-event-processor"),
        environment: {
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
        },
      }
    );

    stravaEventProcessor.addEventSource(
      new lambdaEventSource.SqsEventSource(stravaEventQueue)
    );

    /*
     * In order to create the webhook you have to verify the request.
     * Once this is complete, the requests should only be POSTs.
     * Remove resource unless required for bootstrapping.
     */

    const stravaVerifyToken = uuidv4();

    // Parameter used when creating strava webhook
    new ssm.StringParameter(this, "Parameter", {
      description: "This is a test parameter",
      parameterName: "/strava/verify-token",
      stringValue: stravaVerifyToken,
    });

    const stravaWebhookVerifier = new lambda.Function(
      this,
      "strava-webhook-verifier",
      {
        ...defaultLambdaConfig,
        code: lambda.Code.asset("lambda/strava-webhook-verifier"),
        environment: {
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
          STRAVA_VERIFY_TOKEN: stravaVerifyToken,
        },
      }
    );

    api.root
      .resourceForPath("strava/event")
      .addMethod(
        "GET",
        new apigateway.LambdaIntegration(stravaWebhookVerifier)
      );
  }
}
