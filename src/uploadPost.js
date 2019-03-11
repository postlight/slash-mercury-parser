import qs from 'qs';
import rp from 'request-promise';

import { runWarm, getSlackData, validateUrl, getUrlContent } from './utils';

const handler = async (event, context, callback) => {
  console.log(
    '--------------------------- SECOND FUNCTION ------------------------'
  );
  console.log('EVENT', event);
  const req = qs.parse(event || '');
  const url = req.text;
  console.log('REQ', req);
  try {
    await validateUrl(url);
    const content = await getUrlContent(url);
    console.log('URL IS OK');
    const slackData = await getSlackData(req, content);
    console.log(slackData);
    console.log('POSTING TO SLACK');
    // const ret = await rp.get('http://worldclockapi.com/api/json/est/now');
    const ret = await rp.post('https://slack.com/api/files.upload', slackData);
    console.log('RET', ret);
    console.log('exiting function');
  } catch (err) {
    console.log('ERROORRRR', err);
    callback(null, { statusCode: 200, body: err.message });
  }
  // return new Promise((resolve, reject) => {
  //   const req = http.request(options, res => {
  //     resolve('Success');
  //   });
  //   req.on('error', e => {
  //     reject(e.message);
  //   });
  //   // send the request
  //   req.write('');
  //   req.end();
  // });
};

export default runWarm(handler);
