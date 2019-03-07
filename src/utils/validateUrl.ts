export async function validateUrl(url: string) {
  if (url) {
    const modifiedArgs = url.trim().split(/\s+/);
    if (modifiedArgs.length !== 1) {
      throw new Error('please provide only one URL argument: /mercury <url>');
    }
  } else {
    throw new Error('please provide one URL argument: /mercury <url>');
  }
}
