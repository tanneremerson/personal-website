# Personal Site

## Getting Started

To run the development server, run the following,

```bash
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

I am using Planetscale as my backend datastore. It is a The MySQL-compatible serverless database platform.

The pscale cli client installation instructions are found [here](https://github.com/planetscale/cli#installation).

To create the database run the following,

```bash
$ pscale auth login
$ pscale database create personal-site
```

To connect to the database,

```bash
$ pscale connect personal-site
```

## Reference

[Vercel CLI](https://vercel.com/docs/cli)
[Knex Docs](https://knexjs.org/)
[PScale CLI](https://docs.planetscale.com/reference/planetscale-environment-setup)
