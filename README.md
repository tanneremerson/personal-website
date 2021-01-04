# Personal Website

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

- Node.js
- Next.js
