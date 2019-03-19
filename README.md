# Slash Mercury Parser

This is a [serverless](https://serverless.com/) Slack Bot that uses Postlight's [mercury parser](https://github.com/postlight/mercury-parser) to display the parsed content directly in your slack channel! So instead of sending a link to a certain article, you will be sending the article as a readable post inside the channel.

You can install the bot by adding it to your workspace:

<a href="https://slack.com/oauth/authorize?client_id=314193735138.565850724470&scope=bot,commands"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

Once everything is set, use it as follows:

```bash
/mercury <url>
```

![bot-demo](https://user-images.githubusercontent.com/32297675/54197472-b740b880-44cc-11e9-9d5a-f413ca3cff52.gif)

## Development

This repo is based on Postlight's [serverless-babel-starter](https://github.com/postlight/serverless-babel-starter). You can refer to it for serverless development documentation.

### Setting up the workspace

clone this repo:

```bash
git clone https://github.com/postlight/slash-mercury-parser.git
```

Install dependencies:

```bash
yarn install
```

### Creating your Slack Bot

Create a new slack app [here](https://api.slack.com/apps?new_app=1) and link it to your development slack workspace.

Under `Add feature and functionality`:

- Add a bot:

  - Click on `Bots`
  - Click on `Add a bot User`
  - Enter a `Display name` and `Default username`
  - Click on `Add bot User`
    &nbsp;

- Add a slash command
  - Click on `Slash Commands`
  - Click on `Create New Command`
  - Enter `/mercury`, `https://example.com/invoke`, and `Renders the parsed content` for `Command`, `Request URL`, and `Short Description`
  - Click on `Save`

**NOTE:** you will fill in a correct `Request URL` once you deploy your functions. You can leave it as is for now.

### Environment variables

After you've installed the bot in your slack workspace, navigate to `Install App` under `Settings` and copy your `Bot User OAuth Access Token`. This token will be used to verify the slack API call.

Create a `secrets.json` file in the project root and add the following:

```json
{
  "SLACK_AUTH_TOKEN": "xxxx-YOUR-ACCESS-TOKEN"
}
```

### Deploying the functions

```bash
yarn deploy:env
```

Windows users should modify the `deploy` scripts as follows:

```json
{
  "deploy:dev": "sls deploy --stage dev",
  "deploy:stage": "sls deploy --stage stage",
  "deploy:production": "sls deploy --stage production"
}
```

**NOTE:** save your `/post` URL when the deployment is complete. It looks like this: `https://xxxxxxx.execute-api.region.amazonaws.com/env/invoke` and replace your `Request URL` with it.

### Testing the bot

Inside a `public` channel in your slack workspace, invoke the bot using:

```bash
/mercury <url>
```

You should see a `Parsing your article ..` message which is only visible to you, followed by a bot response of the parsed content as a post.

## The logic behind a slack bot

- Whenever the slash command is executed, slack makes a `POST` request to your app via the `Request URL` that was set.
- Your logic will get executed and will invoke a slack API call.
- Slack expects a response within 3 seconds
- [Slack API Documentation](https://api.slack.com/web)

## The logic behind slash mercury bot

Since Slack expects an `OK` response within 3 seconds, the first lambda function `./src/invoke.js` checks for any errors in the URL, fetches the content from mercury, and invokes the second function `./src/uploadPost.js`. The second function is responsible for hitting the slack API and sending the post. If an error occurs, the user will be notified.

For example, `/mercury blabla` will result in this error:

![image](https://user-images.githubusercontent.com/32297675/54199202-ff61da00-44d0-11e9-8161-288152b424c9.png)

## Contributing

Unless it is explicitly stated otherwise, any contribution intentionally submitted for inclusion in the work, as defined in the Apache-2.0 license, shall be dual licensed as above without any additional terms or conditions.

---

🔬 A Labs project from your friends at [Postlight](https://postlight.com/labs)
