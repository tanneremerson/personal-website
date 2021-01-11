# Personal Website

## Status JAN-10-2020
- Completed bootstrapping scripts to spin up and tear down infra. This will create all
  parameters in aws, deploy the stack, and create the webhook on spinup. On tear down, it
  runs the scripts in the reverse order. This will be useful if I need to deploy in another
  AWS account.
- Added linting to ensure consistent style between files.
- Added precommit hook to ensure linting standards are maintained.
- TODO: Really should add unit test and add them to the precommit script.
- Next Steps (Order is not necessarily meaningful here):
  - Add dynamo db table and fetch all initial data from strava. Look into how to leverage
    single table design. This will require looking at what data we get from strava.
  - Per the terms of service, I need to add Powered by Strava to front end.
  - Add code to process the events. This should be able to handle each of the events that
    strava creates (create, update and delete).
  - Add code that can update the strava access tokens and write them to SSM (Is this the best
    place to store these kinds of things?)
  - Start updating the frontend to display this data.
  - When new event comes in from Strava, we should use the Vercel deploy hook to trigger update.
  - Look into how to prevent Vercel deployments on commits to AWS module changes.

## Status JAN-09-2020
- Updated the CDK code to generate a dynamic verify token when creating the webhook. The token
  is then added to the lambda as an environment variable when deployed to verify the webhook.
- Created bootstrapping scripts to spin up and tear down the environment. This will create the
  webhook once the infra is up or delete it when tearing it down.
- Finish bootstrapping scripts to save the webhook or read on tear down. All webhooks should be
  removed before tearing down API Gateway.

## Status JAN-03-2020
- Created a basic pipeline to process Strava webhooks. All infra is created in using the AWS
  CDK and can be built and torn down with the commands `cdk deploy` and `cdk destroy`. Still
  need to add additional automation for the creation of the webhook.
- The next step is to figure out how to handle the auth tokens and refreshes as required by strava.
- Once we are able to auth, we need to figure out the best datastore to store and analyze run data.
- Once the run data is stored, we need to add more logic to the event processor to read and update
  the datastore with the latest runs.
- Once the new run is detected, the vercel hook for builds should be triggered to redeploy the
  site. This will ensure that the website always has the latest data.

## Goal

**Have Fun**

The goal of this repository is to showcase my personal website and build a
framework for keeping track of the progress I am making in life. As I learn
to build new things with new experiences and learnings, this project will
continue to grow. My current goals are to support the following features:

- [x] Create a static frontend with Next.js [](tanneremerson.vercel.app)
- [ ] Create a server to support dynamic call outs (contact me, etc.)
- [ ] Create a cron scheduler that can fetch data from various datasources and
  update the static frontend. Example of datasources are things like Strava to
  track running, github to track software work, and list of playlist from
  YouTube of videos I found insightful or interesting.

## Metrics of success

- All things must be built using templates.
- All things must be deployed upon build completion.
- All things must be automated.

## Technologies

- AWS
  - CDK
- Node.js
- Next.js
