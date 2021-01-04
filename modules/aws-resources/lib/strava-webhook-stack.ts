import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sqs from "@aws-cdk/aws-sqs";
import * as lambdaEventSource from "@aws-cdk/aws-lambda-event-sources";
import * as cdk from "@aws-cdk/core";

export class StravaWebhook extends cdk.Stack {
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
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.asset("functions/strava-webhook-processor"),
        handler: "index.handler",
        reservedConcurrentExecutions: 1,
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
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.asset("functions/strava-event-processor"),
        handler: "index.handler",
        reservedConcurrentExecutions: 1,
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

    // const stravaWebhookVerifier = new lambda.Function(
    //   this,
    //   "strava-webhook-verifier",
    //   {
    //     runtime: lambda.Runtime.NODEJS_12_X,
    //     code: lambda.Code.asset("functions/strava-webhook-verifier"),
    //     handler: "index.handler",
    //     reservedConcurrentExecutions: 1,
    //   }
    // );

    // api.root
    //   .resourceForPath("strava/event")
    //   .addMethod(
    //     "GET",
    //     new apigateway.LambdaIntegration(stravaWebhookVerifier)
    //   );
  }
}
