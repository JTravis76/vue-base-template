# Pagination.vue

Simple Bootstrap Pagination component for Vue Js written in TypeScript.

## Props

|Name|DataType|Required?|Default|Description|
|---|---|---|---|---|
| pageIndex | number | no | 1| current page number|
| totalPages| number | no | 1| total pages of records|
| targetId  | string | no | pagination1| Id for pagination element|


## Emits
There is one emit named `selected` that returned the page number selected by the user.

## Code Example

```html
<template>
    <pagination targetId="div-pager" :pageIndex="page" :totalPages="pagecount" v-on:selected="OnPaginate($event)"></pagination>
</template>
```

```ts
export default {
        components: {
            Pagination
        },
        data() {
            return {
                page: 1,
                pagecount: 1
            }
        },
        methods: {
            OnPaginate(page: number) {
                console.log("Page: " + page + " was selected.");
                GetData(this, page);
            }
        },
        created() {
            GetData(this, 1);
        }
}

function GetData(vm: Vue, page: number): void {
    //fake a delay while quering server
    window.setTimeout(() => {
        vm.pagecount = 14;
    }, 1000);

    vm.page = page;
}
```

## Issues
No known issues.

## Change Log
* v1.0.0 initial release