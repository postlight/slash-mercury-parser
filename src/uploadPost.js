import rp from 'request-promise';

import { runWarm } from './utils';

const handler = async event => {
  try {
    const slackData = event;
    console.log('POSTING TO SLACK');
    await rp.post('https://slack.com/api/files.upload', slackData);
    console.log('POSTED TO SLACK');
    return;
  } catch (err) {
    console.log('Error', err);
  }
};

export default runWarm(handler);
