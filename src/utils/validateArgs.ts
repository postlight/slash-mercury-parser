export async function validateArgs(args: string) {
  if (args) {
    const modifiedArgs = args.trim().split(/\s+/);
    if (modifiedArgs.length !== 1) {
      throw new Error('please provide only one URL argument: /mercury <url>');
    }
  } else {
    throw new Error('please provide one URL argument: /mercury <url>');
  }
}
