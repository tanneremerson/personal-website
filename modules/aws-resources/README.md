# AWS Infrastructure

This module contains scripts to provision and destroy infrastructure in AWS.
In addition, contains code for each of the lambdas that are provisioned in the `./lambda`
directory.

## Spinning up new environment

To provision the environment and setup the Strava webhook

```sh
./bootstrap/up.js
```

## Tearing down environment

To tear down the environment, run the down script

```sh
./bootstrap/down.js
```

## Useful CDK Information

The `cdk.json` file tells the CDK Toolkit how to execute your app.

 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
