# PageLoader.vue

Page loader component for Vue Js written in TypeScript.

`index.ts` is a Typescript version of `PageLoader.vue`.


> NOTE: This component require access to Vuex to trigger loading as global state. 

## Props

|Name|DataType|Required?|Description|
|-|-|-|-|
|src|string|no|source path to image. Default: base64 img|
|imgcss|string|no|CSS style for the image. Default: "width:auto;" |
|imgclass|string|no|CSS class for the image. Default: ""|

## Emits
No Emits.

## CSS style - SASS
CSS classes for the page-loader can be complied in your SASS project.

## Vuex
This component requires access to the Vuex store to trigger page loader.

Sample store.ts:
```ts
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pageLoading: false,
    },
    mutations: {
        pageloader(state, payload: boolean = true) {
            state.pageLoading = payload;
        }
    }
});
```

```ts
// Vuex commit sample
this.$store.commit("pageloader", true);
```

## Issues
No known issues.

## Change Log

* v1.0.0. Inital release of component 