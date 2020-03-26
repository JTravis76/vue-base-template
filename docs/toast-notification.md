# ToastNotification.vue

This component was ported from [here](https://github.com/ankurk91/vue-toast-notification) to Typescript / ES6 with Typings included.

## Usage
```js
import Vue from 'vue';
import Toast from '@/components/toastNotification.vue';
// Import any of available themes
import '@/assets/toast-notification/default/index.css';
//import '@/assets/toast-notification/sugar/index.css';

Vue.use(Toast);
Vue.$toast.open('You did it!');
Vue.$toast.open({/* options */});

// Close all opened toast immediately
Vue.$toast.clear();
```

## Available options
The API methods accepts these options:

| Attribute        | Type                | Default              | Description      |
| :---             | :---:               | :---:                | :---             |
|  message         | String              | --                   |  Message text (required)   |
|  type            | String              | `success`            |  One of `success`, `info`, `warning`, `error`, `default`  |
|  position        | String              | `bottom-right`       |  One of `top`, `bottom`, `top-right`, `bottom-right`,`top-left`, `bottom-left`  |
|  duration        | Number              | `3000`               |  Visibility duration in milliseconds    |
|  dismissible     | Boolean             | `true`               |  Allow user close by clicking    |
|  onClick         | Function            | --                   |  Do something when user clicks    |
|  onClose         | Function            | --                   |  Do something after toast gets dismissed    |
|  queue           | Boolean             | `false`              |  Wait for existing to close before showing new     |
         
## API methods
### `Vue.$toast.open(options)`
This is generic method, you can use this method to make any kind of toast.
```js
// Can accept a message as string and apply rest of options from defaults
Vue.$toast.open('message string');

// Can accept an Object of options
Vue.$toast.open({
    message: 'message string',
    type: 'error',
    // all other options
});
```
### `Vue.$toast.success(message,?options)`
There are some proxy methods to make it more readable.
```js
Vue.$toast.success('message string', {
  // optional options Object
})
```
### `Vue.$toast.error(message,?options)`
### `Vue.$toast.warning(message,?options)`
### `Vue.$toast.info(message,?options)`
### `Vue.$toast.default(message,?options)`

## Global options
You can set options for all of the instances during plugin initialization
```js
Vue.use(VueToast, {
  // One of options
  position: 'top'
})
```
Further you can override option when creating new instances
```js
Vue.$toast.success('message string', {
  // override the global option
  position: 'bottom'
})
```

## Credits
[here](https://github.com/ankurk91/vue-toast-notification)