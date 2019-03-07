import Mercury from '@postlight/mercury-parser';

export async function getUrlContent(url: string) {
  try {
    const result = await Mercury.parse(url, {
      contentType: 'markdown',
    });

    if (result.error) {
      throw new Error(result.messages);
    }

    const { title, content, lead_image_url } = result;

    return {
      title,
      parsedContent: `![lead Image](${lead_image_url})
      ${content}`,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
