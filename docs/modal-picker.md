# ModalPicker.vue

This is a Vue component written in Typescript. It creates a Bootstrap modal popup to allow users to select an option from the pick list. A replacement for drop-down boxes.

## Props

| Name | Required? | Description |
|------|-----------|-------------|
| id   | string    | Id of modal. Default: "ModalPicker1"|
| title| string    | Title of modal. Default: "MyTitle"  |
| url  | string    | URL to API for fetching data. See `Picker Data Format`. Default: ""|
|subModal|boolean|Tells if the modal is a child of a parent modal. Default: false|
|showBlank|boolean|Add the empty blank to top of list. Use to clear a selected option. Default: false|
|multi|boolean|Set picker to allow multi-selection. Default: false|
|data|array|Collection of picker values to build the selection list. Cannot be used with `url`. See `Picker Data Format`. Default: generic set of data. |


## Picker Data Format

Data going in (via Props) and returned are the same type.

```json
[{text:"", value:"", selected:false, disabled:false, title:""}]
```

## Emits
There are two emits callbacks; `select` and `deselect`. Both callbacks wrapped the selection(s) in a single object. Id helps determine which picker component sent the selected record.

`deselect` is ONLY triggered when the `multi` flag is true.

```json
{id:"", selection: {text:"", value:"", selected:false, disabled:false, title:""}}
```

## Issues

### Bootstrap-Native
* Opening sub/child modals will hide the parent modal.

**Workaround:** Comment out the following code.
```js
// we elegantly hide any opened modal
var currentOpen = getElementsByClassName(DOC,component+' in')[0];
if (currentOpen && currentOpen !== modal) {
  modalTrigger in currentOpen && currentOpen[modalTrigger][stringModal].hide();
  stringModal in currentOpen && currentOpen[stringModal].hide();
}
```

* Data is not updated after Modal Picker opens.

When using the `url` prop, the HTTP request is _not- triggered.

**workaround:** Add the following code the modal Show() function.

```js
...
setTimeout( function() {
    /** Check if Vue instance is attached, if so, run the Modal-Picker's Open() command
     */
    if (modal.__vue__) {
        let vm = modal.__vue__;
        if (vm.master !== undefined && vm.multi !== undefined) {
            vm.Open();
        }
    }

    modal[style].display = 'block';
    ...
```

## Change Log
v1.0.0 - init commit