# React MobX Nimble
Nimble React starter using JSX, Typescript, Webpack 3 and MobX for state management.

# Table of Contents
* [Overview](#overview)
* [Quick start](#quick-start)
* [File structure](#file-structure)
* [Useful links](#useful-links)
* [Author](#author)

## Overview
This starter includes a sample React Todo app which demostrates MobX integration and patterns. It's primary purpose is educational and to serve as a hacking starter.

### Features
* [Mobx](https://github.com/mobxjs/mobx)
* [Mobx React](https://github.com/mobxjs/mobx-react)
* [Mobx React Devtools](https://github.com/mobxjs/mobx-react-devtools)
* [Mobx React Router](https://github.com/alisd23/mobx-react-router/)
* [React](https://facebook.github.io/react/) 16
* [React Router](https://github.com/ReactTraining/react-router) 4.2
* [Todo example](http://todomvc.com)
* [Typescript](https://www.typescriptlang.org/) 2.5

### Build tools
* [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader)
* [CSS modules](https://github.com/css-modules/css-modules)
* [ExtractText Plugin](https://github.com/webpack/extract-text-webpack-plugin)
* [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
* [PostCSS Loader](https://github.com/postcss/postcss-loader)
* [Webpack](https://webpack.github.io) 3.8
* [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)

## Quick Start
Clone or Fork this repo to get started

```bash
$ git clone https://github.com/daniel-williams/react-mobx-nimble
```
Install dependencies
```bash
# using yarn
$ yarn

# using npm
$ npm i
```

Development
```bash
# browse to http:\\localhost:3000
$ npm start
```

Build
```bash
# output to /dist
$ npm run build:prod
```

## File Structure
```
root
 ├──client                     * static assets, copied to /dist on build
 |   └──assets                 * website static assets
 |       ├──images             * favicon
 |       └──styles             * vendor styles
 ├──config
 |   |   └──typings            * typings to support css modules
 |   ├──helpers.js             * project build helpers
 │   ├──webpack.build.js       * adds/overrides common configuration (prod/stag builds)
 │   ├──webpack.common.js      * common webpack configuration
 │   └──webpack.dev.js         * adds/overrides common configuration (dev/remote builds)
 ├──src/
 |   ├──app/                   * app source code
 |   ├──index.html             * entry file for app
 |   ├──polyfills.js           * libs to allow modern js syntax in legacy browsers
 │   └──vendors.js             * imports app dependencies
 ├──.gitignore                 * repo file exclusions
 ├──package.json               * Node Package Manager project file
 ├──README.md                  * this file
 ├──tsconfig.json              * Typescript environment configuration
 ├──yarn.lock                  * auto-generated file for consistent dependency versioning
 │
 └──dist/                      * prod/stag builds output files here
```

## Useful links

[MobX](https://mobxjs.github.io/mobx/)

## Author

Daniel Williams

<https://github.com/daniel-williams/react-mobx-nimble>