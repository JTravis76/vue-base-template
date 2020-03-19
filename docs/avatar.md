# Avatar.vue

Initial `Avatar` component for VueJs written in TypeScript.

### **Props**

|Name|Required|DataType|Default|Description|
|---|---|---|:---:|---|
|name|no|string|"?"|Name to display initials|
|round|no|boolean|false| Square or round box|
|size|no|number|100|Size of avatar image|

`name` prop can be formatted either of the following:
* Doe, Joe
* Joe Doe

Custom sizing can be done via a div wrapper or use the `size` prop.

_Example div wrapper_
```html
<div style="width:100px;margin-left: auto; margin-right: auto;">
    <div style="width:200px;">
        <avatar round :name="fullName"></avatar>
    </div>
</div>
```

### **Emits**

> No emits for this component.

## Issues
No known issues.

## Change Log
* v1.0.0 inital release