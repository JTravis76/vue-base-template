# Vue Boilerplate Template with TypeScript and Rollup
Basic template for building VueJS web app with Typescript.

## Why?
Basically, I feel that many other front-end projects rely on so many different tools to get a simple job done. Goal here is reduce the over-head to the necessary tools to develop and bundle an application using the things I love; `ES6 modules`, `Typescript`, `Vue JS`, and `Rollup JS`.

## Installation & Setup

> NOTE: You may get a TSC compile error after running `npm run tsc`. Please see `VUEX Strong Typings` section in this document. 

```
:: installs application dependencies
npm install

:: runs all TS code through Typescript
npm run tsc

:: Bundle TS to JS and SCSS to CSS
npm run rollup
```

## Vuex Strong Typings:

This project contains a custom Store State interface to assist with strong-typing through-out the entire application.

> **MUST** disable the VUEX typings within the node_modules folder before using.

Navigate to `node_modules/vuex/types/vue.d.ts`. Open and comment out the entire document. Then save and close.
This will allow Vue to use the our custom Vuex $store types. File can be modified here: `./typings/app.d.ts`.


## Writing Vue Component Modules
As you may know, there are many ways to write components within Vue JS. Below will discuss few of the ways that is supported using Typescript.

*Pure Typescript module*  
This is the most straight-forward way to create Vue components using Typescript.  
See `src\views\not-found.ts` for full example.

* PROs
    * Uses *.ts file extensions
    * No conversion to Typescript from another module style
    * Uses Vue's standard mixin object
* CONs
    * template embeded into string literal
        * string can be parse into HTML via extension
    * Weak strong typings withpit cast objects and use Interfaces
    * All styles must either in-line or in a global CSS file

*Vue Component via Standard Vue Mixin*  
This module using Vue's single component model where code is split into 3 parts; Template, Script, & Style.  
See `src\views\Home.vue` or `src\components\Avatar.vue` for full example.

> Script section continue to use Vue's standard mixin object.

* PROs
    * Uses Vue's single component file
    * Easying edit template as HTML code
* CONs
    * Must convert Vue's single component to TS equivalent
    * Weak strong typings without cast objects and use Interfaces

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
    * Bundle or reference external Javascript library

## Contribute
Feel free to use this for you any use, or provide feedback.

## License
MIT