import Mercury from '@postlight/mercury-parser';

export async function getUrlContent(url: string) {
  try {
    const result = await Mercury.parse(url, {
      contentType: 'markdown',
    });

    if (result.error) {
      throw new Error(result.messages);
    }

    const { title, content } = result;

    return {
      title,
      parsedContent: `${url} ${content}`,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
