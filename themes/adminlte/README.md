# AdmlinLTE
This template is based on the popular admin dashboard [AdminLTE](https://github.com/ColorlibHQ/AdminLTE).

> NOTE: this theme uses Bootstrap 3.4.1

```
npm i awesome-bootstrap-checkbox@0.3.7 axios@0.19.2 bootstrap-sass@3.4.1 bootstrap.native@2.0.27 font-awesome@4.7.0
```

* Copy layout from `themes\adminlte\layout` to `src\view\layout`
* Copy scss from `themes\adminlte\scss` to `src\scss`
    * over-write the index.scss
* Copy images from `themes\adminlte\img` to `dist\img`
* Replace App.vue from `themes\adminlte\App.vue` to `src\App.vue`
* Replace index.html from `themes\adminlte\index.html` to `dist\index.html`
* Replace main.ts from `themes\adminlte\main.ts` to `src\main.ts`
* Replace rollup.config.js from `themes\adminlte\rollup.config.js` to `rollup.config.js`
* Copy Font-Awesome fonts from `node_modules\font-awesome\fonts` to `dist\fonts`
* Copy Bootstrap fonts from `node_modules\bootstrap-sass\assets\fonts` to `dist\fonts`
    * Must copy bootstrap directory !!


Rebuild project
```
npm run build
```