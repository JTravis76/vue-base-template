# AddressBook.vue

This is a Address Book component for VueJs written in TypeScript.

> NOTE: Netcenter Base API Url is read from the Vuex `config` store module.

## Props

|Name|Required?|Data Type|Default|Description|
|---|---|---|---|---|
|selectedList|true|GroupMember Array|[ ]|A preselected list of GroupMembers to be displayed|
|id|true|number|undefined|primary id of Group related to it's members|

`selectedList` is updated via Vue reactivity upon selecting a new member or removing an existing member.

## Emits
no emits

## Issues
no known issues

## Change Log
* 1.0.0 initial commit