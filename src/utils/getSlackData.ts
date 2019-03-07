import dotenv from 'dotenv';

dotenv.config();

const { SLACK_AUTH_TOKEN } = process.env;

export async function getSlackData(req: any, content: any) {
  const { channel_id } = req;
  const { parsedContent, title } = content;

  return {
    form: {
      token: SLACK_AUTH_TOKEN,
      channels: channel_id,
      content: parsedContent,
      filetype: 'post',
      title,
    },
  };
}
