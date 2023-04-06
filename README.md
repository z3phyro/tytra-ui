
![TyTra](./tytra.png)
# Typed Translations UI - TyTra-UI

UI for typed translations package (TyTra). It allows to use most of the functions of TyTra/core, including, initializing the project.

# Installation

## Install the dependency
```bash
npm i -D @z3phyro/tytra-ui
```

```bash
yarn add -D @z3phyro/tytra-ui
```

## Setup project package.json script

```json
{
  "scripts": {
    // Here you can change the port
    "tytra-ui": "PORT=8123 node ./node_modules/.bin/tytra-ui"
  }
}
```

## Run it!

```bash
npm run tytra-ui
```

# Important consideration

At the moment TyTra-UI doesn't use any security measures so if you decide to publish the url using a tool like <b>ngrok</b> or just host it using <b>Nginx</b> be aware of the fact this project reads and writes files in your codebase.

So, be sure to either use an unknown url, or use a vpn or some other security measures by yourself.

Also to share with other people that might help translating we recommend running it on a separate branch so you can see the changes on a PR before merging with the source code.