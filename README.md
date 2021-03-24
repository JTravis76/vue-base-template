# Vue Boilerplate Template with TypeScript and Rollup
Basic template for building VueJS web app with Typescript.

## Why?
Basically, I feel that many other front-end projects rely on so many different tools to get a simple job done.
The goal here is reduce the over-head to the necessary tools to develop and bundle an application using the things I love; `ES6 modules`, `Typescript`, `Vue JS`, and `Rollup JS`.

## Installation & Setup

> NOTE: You may get a TSC compile error after running `npm run tsc`. Please see `VUEX Strong Typings` section in this document. 

```
:: installs application dependencies
npm install
:: or to install from package.lock.json
npm ci

:: runs all TS code through Typescript
npm run tsc

:: Bundle TS to JS and SCSS to CSS
npm run build
```

## Configuration
At the heart of most application, is a configuration that allows us to update global values. 
In this application, `configuration.ts` is a Vuex store module that allows us to change the behavior or provide some form of user's information. 
Using this Rollup plugin's (plugin-replace), can assist in updating those values for different environments. 
To bundle other environments, create a rollup.config.ENV.js. Set the replace values, then run command.

> NOTE: replace ENV with the name of your environment

```
node_modules\.bin\rollup -c rollup.config.{ENV}.js
```

Another option would be to use the environment variable `ASPNETCORE_ENVIRONMENT` to toggle the various builds; Development, Staging, Production. This environment variable is used within Microsoft's .NET Core applications. 
Just reused, since I develop in both.

> NOTE: local is default

## Vuex Strong Typings:
This project contains a custom Store State interface to assist with strong-typing throughout the entire application.
To allow Vue to use the our custom Vuex $store types, we must disable the default version within Vuex NPM package.

> **MUST** disable the VUEX typings within the node_modules folder before using the custom store typings.

Navigate to `node_modules/vuex/types/vue.d.ts`. Open and comment out the entire document. Then save and close.  
Or use npm script to clear results

```
npm run cls-vuex
```


## Writing Vue Component Modules
As you may know, there are many ways to write components within Vue JS. Below will discuss few of the ways that is supported using Typescript.

*Pure Typescript module*  
This is the most straight-forward way to create Vue components using Typescript.  
See `src\views\not-found.ts` for full example.

* PROs
    * Uses *.ts file extensions
    * No conversion to Typescript from another module style
    * Uses Vue's standard mixin object
    * Sourcemaps works great in Visual Studio or browser debugger
* CONs
    * template embeded into string literal
        * string can be parse into HTML via extension
    * Weak strong typings without casting objects and using Interfaces
    * All styles must either in-line or in a global CSS file

*Vue Component via Standard Vue Mixin*  
This module using Vue's single component model where code is split into 3 parts; Template, Script, & Style.  
See `src\views\Home.vue` or `src\components\Avatar.vue` for full example.

> Script section continue to use Vue's standard mixin object.

* PROs
    * Uses Vue's single component file
    * Easing edit template as HTML code
* CONs
    * Must convert Vue's single component to TS equivalent
    * Weak strong typings without casting objects and using Interfaces
    * Sourcemap line index is out-of-sync in debugger

*Vue Component via Vue-Property-Decorator*  
This module using Vue's single component model where code is split into 3 parts; Template, Script, & Style.  
See `src\views\App.vue` or `src\components\About.vue` for full example.

> Script section uses vue-property-decorator.

* PROs
    * Uses Vue's single component file
    * Easying edit template as HTML code
    * Improved strong-typing on `this` keyword
    * No need for extra interfaces to cast Vue's objects.
* CONs
    * Must convert Vue's single component to TS equivalent
    * Bundle or reference additional external Javascript library
    * Sourcemap line index is out-of-sync in debugger

## Custom Vue Components
I needed a place to store some custom vue components created in many of my projects. Decided this would be the best place. Under the `src\components` directory is a collection of components. Many uses additional libraries, Vuex store, etc. Feel free to use. Documentation for each component is provide under the `docs` directory.

## Template CLI
A [DENO](https://deno.land) script to apply various templates I used in some of my projects.

```
deno run --unstable --allow-write --allow-read --allow-run template-cli.ts
```

## Change Log
2021-03-24: Updated to the latest npm packages. Fixed a few things related to those updates.


## Contribute
Feel free to use this template for your next project, or provide feedback.

## License
MIT