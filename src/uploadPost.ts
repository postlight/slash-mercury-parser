import qs from 'qs';
import request from 'request';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { runWarm, getSlackData, validateUrl, getUrlContent } from './utils';

const uploadPost = async (event: APIGatewayProxyEvent) => {
  console.log(
    '--------------------------- SECOND FUNCTION ------------------------'
  );
  console.log('BODY', event.body);
  const req = qs.parse(event.body || '');
  const url = req.text;

  try {
    await validateUrl(url);
    const content = await getUrlContent(url);
    console.log('URL IS OK');
    const slackData = await getSlackData(req, content);
    console.log(slackData);
    console.log('POSTING TO SLACK');
    request.post('https://slack.com/api/files.upload', slackData);

    return {
      statusCode: 200,
      body: 'Getting your article',
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: err.message,
    };
  }
};

export default runWarm(uploadPost);
