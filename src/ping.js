import AWS from 'aws-sdk';
import { runWarm } from './utils';

// const lambda = new AWS.Lambda();

// export default async function invokeLambda({ body }: any) {
//   console.log('invoking second lambda function');
//   console.log('BODY', body);
//   lambda.invoke(
//     {
//       FunctionName: 'serverless-mercury-slackbot-production-uploadPost',
//       Payload: JSON.stringify(body),
//       InvocationType: 'Event',
//     },
//     (err, data) => {
//       if (err) {
//         console.log('INVOKE ERROR', err);
//         return err;
//       }
//       console.log('Success', data);
//       return {
//         statusCode: 200,
//         body: 'parsing your article',
//       };
//     }
//   );
//   return {
//     statusCode: 200,
//     body: 'parsing your article',
//   };
// }

const handler = async (event, context, callback) => {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: 'serverless-mercury-slackbot-production-uploadPost',
    InvocationType: 'Event', // Ensures asynchronous execution
    Payload: JSON.stringify(event.body),
  };
  return lambda
    .invoke(params)
    .promise()
    .then(() =>
      callback(null, { statusCode: 200, body: 'Parsing your article' })
    );
};

export default runWarm(handler);
