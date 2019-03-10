import AWS from 'aws-sdk';

const lambda = new AWS.Lambda();

export default async function invokeLambda({ body }: any) {
  console.log('invoking second lambda function');
  console.log('BODY', body);
  lambda.invoke(
    {
      FunctionName: 'serverless-mercury-slackbot-production-uploadPost',
      Payload: JSON.stringify(body),
      InvocationType: 'Event',
    },
    (err, data) => {
      if (err) {
        console.log('INVOKE ERROR', err);
        return;
      }
      console.log('Success', data);
      return {
        statusCode: 200,
        body: 'parsing your article',
      };
    }
  );
}
