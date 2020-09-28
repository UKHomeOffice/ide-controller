---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /getting-started
---

## Folder Structure

After creation, your project should look like this:

```
ide-controller
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .drone.yml
├── lerna.json
└── packages
    ├── react
    ├── electron
    └── docs
    ...
```

Each package has it's own `package.json`, `node_modules`, `.eslintrc.js` etc. These packages should be as independent as possible from the root
package. It is possible to use packages from the root but these should only be `devdependencies`.

[Lerna](https://github.com/lerna/lerna) is used to manage these packages. It's a tool that optimises the workflow around managing multi-package repositories with git and npm and is used by projects like Babel, React, Angular, Ember, Meteor, Jest.
