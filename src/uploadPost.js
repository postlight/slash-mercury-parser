import rp from 'request-promise';

import { runWarm } from './utils';

const handler = async event => {
  try {
    const slackData = event;
    await rp.post('https://slack.com/api/files.upload', slackData);
    return;
  } catch (err) {
    console.log('Error', err);
  }
};

export default runWarm(handler);
