# enterprise-fbm
An example Messenger bot using Condé Nast's [`launch-vehicle-fbm`]. The `enterprise-fbm` name is a nod to the [first orbiter of the Space Shuttle system]. Got to keep the 🚀 theme going, right?

[first orbiter of the Space Shuttle system]: https://en.wikipedia.org/wiki/Space_Shuttle_Enterprise

[`launch-vehicle-fbm`]: https://github.com/CondeNast/launch-vehicle-fbm

A fully baked _how to_ blog post can be found on the _[Condé Nast Engineering Blog]_ and _[Chatbots Magazine]_.

[Condé Nast Engineering Blog]: https://engineering.condenast.io/story/bot-building-with-launch-vehicle-fbm
[Chatbots Magazine]: https://chatbotsmagazine.com/bot-building-with-launch-vehicle-fbm-c17170c65e75#.j2pxmx7vu

### Using this example

This is not going to cover setting up a Facebook page and application with the necessary identifiers and secrets. I would recommend reading through the [Messenger Platform Quick Start Guide] provided by Facebook.

This also assumes that [nodemon] is installed globally. Feel free to edit the _dev_ scripts in `packages.json` to your liking if nodemon is not a part of your preferred development setup.

Clone this repo, `enterprise-fbm`, and install the dependencies:
```shell
git clone git@github.com:stripethree/enterprise-fbm.git
cd enterprise-fbm
npm i
```

Copy `example.env` to `.env` and replace it with the identifiers and secrets for your Facebook page and application. Then export these values into the environment:
```shell
export $(cat .env | xargs)
```

Start up [_localtunnel_], I'd recommend using the _subdomain_ argument:
```shell
lt --port 3000 --subdomain <pick a subdomain>
```
This URL is what will also populate the _Callback URL_ field when configuring the _Page Subscription_ for the application's webhook.

Start up the bot!
```shell
npm run dev
```

Off you go! The example supports responding to greetings (try saying _hello_) and requests for assistance (try saying _help_). It will also echo back any other text sent as well as images sent.

[_localtunnel_]: https://github.com/localtunnel/localtunnel
[Messenger Platform Quick Start Guide]: https://developers.facebook.com/docs/messenger-platform/guides/quick-start
[nodemon]: https://github.com/remy/nodemon
