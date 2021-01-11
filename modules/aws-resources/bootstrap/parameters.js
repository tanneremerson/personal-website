process.env.AWS_SDK_LOAD_CONFIG = 1;

const AWS = require('aws-sdk');

const translations = {
  '/strava/access-token': 'STRAVA_ACCESS_TOKEN',
  '/strava/api-gateway-url': 'API_GATEWAY_URL',
  '/strava/api-url': 'STRAVA_URL',
  '/strava/athlete-id': 'STRAVA_ATHLETE_ID',
  '/strava/authorization-token': 'STRAVA_AUTHORIZATION_TOKEN',
  '/strava/client-id': 'STRAVA_CLIENT_ID',
  '/strava/client-secret': 'STRAVA_CLIENT_SECRET',
  '/strava/refresh-token': 'STRAVA_REFRESH_TOKEN',
  '/strava/verify-token': 'STRAVA_VERIFY_TOKEN',
};

async function getParameters() {
  console.log({ msg: 'Fetching Parameters' });

  const ssm = new AWS.SSM();

  const params = { Path: '/strava' };
  const data = await ssm.getParametersByPath(params).promise();
  if (!data || !data.Parameters || !data.Parameters.length)
    throw new Error('Something went wrong fetching params...');

  const formattedParams = data.Parameters.reduce(
    (acc, p) => ({ ...acc, [translations[p.Name]]: p.Value }),
    {}
  );

  console.log({
    msg: 'Add parameters to Insomnia environment config',
    params: JSON.stringify(formattedParams),
  });

  return formattedParams;
}

module.exports = {
  getParameters,
};
