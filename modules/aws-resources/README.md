# AWS Infrastructure

This module contains scripts to provision and destroy infrastructure in AWS.
In addition, contains code for each of the lambdas that are provisioned in the `./lambda`
directory.

## Spinning up new environment

> NOTE: The parameter scripts are not tracked.

The following command will create the parameters required to provision the webhook.
It will then run the `cdk deploy` command to deploy the infrastructure to AWS. Once the
infrastructure is up and the endpoint is created, the subscription is created for
new events with Strava.

```sh
npm install
npm run spinup
```

## Tearing down environment

This script will first read and delete all of the subscriptions created with Strava.
After that `cdk destroy` is run to remove the infrastructure. Once that is removed,
all of the parameters are deleted.

```sh
npm run teardown
```

## Useful CDK Information

The `cdk.json` file tells the CDK Toolkit how to execute your app.

 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
