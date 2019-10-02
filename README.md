# VueJS Base Template
Basic template for building VueJS web app with Typescript.

Since my company blocks NPM and Node.js is **not** on the approved software list. This is my attempt to build a Vue project with a strong TypeScript background verus Webpack and other build frameworks.

## Technology Used:

* Microsoft Typescript
* RequireJs - for Javscript AMD modules loading, since Webpack and Vue-Loader is __not__ an option
* Axios - HTTP request
* Vuejs, VueRouter, Vuex (State Management)
* IIS Express - backend server stuff

Goal of this project, is to build a web application using popular Vuejs front-end framework without NodeJs. I appreciate what NodeJs does for the Javascript world. However, not a fan of CommonJs modules and Webpack gets complex fast. Not to mention that node_modules like a endless pit :-) In the end, hopefully to have a working application with collections of re-useable components.


## Building Project
### SCSS
Setup SASS environment, details here https://sass-lang.com/install

 Example using *_Install Anywhere (Standalone)_*

    > sass index.scss ../Content/site.css --no-source-map

(optional file watcher)

    > sass index.scss ../Content/site.css --watch

Compress /  Minified

    > sass index.scss ../Content/site.min.css -s compressed

---
### Typescript
This project uses Javascript AMD module to load dependency. Require.JS is used for AMD module loading on the client-side. Typescript is used to compile/bundle TS modules into a single JS file.

To build JS output file from Typescript:

    tsc <MyWorkspace>\<PathToTSConfig>\tsconfig.json

Optional, Node file watcher:

	node "C:\Program Files (x86)\Microsoft SDKs\TypeScript\3.4\tsc.js" --watch -p "<MyWorkspace>\<PathToTSConfig>\tsconfig.json"

---
#### Project/Folder Structure
* SCSS - this folder stores the CSS related files that compiles into `contents/site.css`.
* Typescripts - this folder is where the modules are broken up into area domains. During a build, all TS files are complied into a single JS output file under the `scripts` folder. (see tsconfig.json)

---
## Production Builds
* Update any configurations under typescript -> store -> modules -> configuration.ts
* (optional) Rename main.js / main.js.map to reflex configuration version: EX: main-1.0.js
    * > _NOTE: this assist in cache busting and force browser to reload assets._
* Open index.html 
	* Remove urlArgs settings from require config. 
	* (optional) Update path "main": "main-1.0" to match renamed main.js from step above
	* RequireJS config: change *"vue": "vue"* to _"vue": "vue.min"_ 

### Excluding Files and Folders - Visual Studio
During the publish process via Visual Studio, severals files and folders are inculded in the WebDeploy package. To remove these unwanted items, edit the `website.publishproj` file.
Under the second set of `<PropertyGroup>`, add the following snippet.

```xml
<PropertyGroup>
	...

    <ExcludeFoldersFromDeployment>
      scss;typings;.vscode;
    </ExcludeFoldersFromDeployment>

    <ExcludeFilesFromDeployment>
      packages.config;Readme.md;tsconfig.json;
    </ExcludeFilesFromDeployment>
</PropertyGroup>
```