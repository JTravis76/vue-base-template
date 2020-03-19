# ValidationSummary.vue

Validation summary component for Vue Js written in TypeScript. Errors can be either a single error or a collection of errors.
The error collection models after Microsoft MVC Validation result.

```json
[{ ErrorMessge:"", Exception: null }]
```


> NOTE: This component require access to Vuex to save errors as global state. Vuex module is available with this component.

## Props
|Name|Required|Data Type|Description|
|---|---|---|---|
|title|no|string|message title for the alert box.

## Emits
No Emits.

## Vuex
This component requires access to the Vuex store to save/fetch errors across all components.

Sample _store/index.ts_:
```ts
import Vue from "vue";
import Vuex from "vuex";

import ValidationSummary, { IValidationState } from "./modules/validation-summary";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ValidationSummary,
    },
    state: {},
    mutations: {}
});

export interface IRootState {
    /**Validation Summary store state module */
    ValidationSummary?: IValidationState;
}
```

## Issues
No known issues.

## Change Log
v1.0.0 - init commit