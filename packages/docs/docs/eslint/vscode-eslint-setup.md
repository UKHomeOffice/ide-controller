---
id: eslint-setup-vscode
title: Eslint Setup
sidebar_label: Visual Studio
slug: /eslint-setup/vscode
---

## Eslint and Prettier Setup

## What it does

- Fixes issues and formatting errors with Prettier
- Lints + Fixes React via eslint-config-airbnb

## With VS Code

Instructions for VS Code:

1. Install the [ESLint package](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Now we need to setup some VS Code settings via `Code/File` → `Preferences` → `Settings`. It's easier to enter these settings while editing the `settings.json` file, so click the `{}` icon in the top right corner:

```js
"editor.formatOnSave": true,
// turn it off for JS and JSX
"[javascript]": {
  "editor.formatOnSave": false
},
"[javascriptreact]": {
  "editor.formatOnSave": false
},
// tell ESLint plugin to run on save
"editor.codeActionsOnSave": {
  "source.fixAll": true
},
// Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
"prettier.disableLanguages": ["javascript", "javascriptreact"],

// You may need to add this line if there are more than one eslint config
"eslint.workingDirectories": [ "./packages/react", "./packages/electron" ]
```

3. Make sure you have run `npm install`. This will install the required packages including `eslint-config-prettier` and `eslint-plugin-prettier`.

## Refrences

- [ESlint rules here](https://eslint.org/docs/rules/)
- [Prettier rules here](https://prettier.io/docs/en/options.html)
