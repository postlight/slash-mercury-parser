import AWS from 'aws-sdk';
import qs from 'qs';

import { getSlackData, validateUrl, getUrlContent, runWarm } from './utils';

const lambda = new AWS.Lambda();

const invokeLambda = async ({ body }) => {
  const req = qs.parse(body);
  const url = req.text;

  try {
    await validateUrl(url);
    const content = await getUrlContent(url);
    const slackData = await getSlackData(req, content);
    await lambda
      .invoke({
        FunctionName: 'serverless-mercury-slackbot-production-uploadPost',
        Payload: JSON.stringify(slackData),
        InvocationType: 'Event',
      })
      .promise();

    return { statusCode: 200, body: 'Parsing your article...' };
  } catch (err) {
    console.log('ERROR', err.message);
    return { statusCode: 200, body: err.message };
  }
};

export default runWarm(invokeLambda);
