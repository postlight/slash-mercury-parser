import qs from 'qs';
import request from 'request';

import { runWarm, getSlackData, validateArgs, getUrlContent } from './utils';

const parse = async event => {
  const req = qs.parse(event.body);
  const url = req.text;

  try {
    await validateArgs(url);
    const content = await getUrlContent(url);
    const slackData = await getSlackData(req, content);
    request.post('https://slack.com/api/files.upload', slackData, () => {});

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

export default runWarm(parse);
