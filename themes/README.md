# VueJs Themes

Here are a few themes converted to use VueJs that was used in some of my projects.

## Template CLI
This tool will apply the selected themes. To install templates, run the following DENO script.

> Sorry, attempted this is Node, but getting permission errors.

```
deno run --unstable --allow-write --allow-read --allow-run template-cli.ts
```

## AdminLTE
This template is based on the popular admin dashboard [AdminLTE](https://github.com/ColorlibHQ/AdminLTE).

> NOTE: this theme uses Bootstrap 3.4.1


## Hierapolis 
Another template found on [github](https://github.com/lab2023/hierapolis) by Lab2023.

This theme was converted to use VueJs mixin within a TypeScript file.

> NOTE: this theme uses Bootstrap 3.3.7

In your `index.scss` file, add the following:

```scss
@import "normalize/normalize.scss";
@import "bootstrap-3.3.7/bootstrap.scss";
@import "font-awesome-4.7.0/font-awesome.scss";
@import "_hierapolis.scss";
```

(OPTIONAL) here was some Bootstrap overides.

```scss
/*Bootstrap Overrides*/
.navbar-default {
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);
}
.navbar-brand {
    color: #354b60 !important;
}
.navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {
    color: #333333;
    background-color: transparent;
}
.dropdown-menu {
    background-color: #2c3e50;
    border: 1px solid #1a242f;
    li > a {
        color: #ecf0f1;
    }
    .divider {
        background-color: #1a242f;
    }
}
```

## SmartAdmin
Cannot locate the source of this template. I remembered it was offered as a free download. The CSS had this copyright and a full live demo found [here](http://www.designbudy.com/nyasa/horizontal/index.html).

Project :	                Nyasa Admin Dashboard  
Version :	                1.1  
Last change :	            02/11/17 [Initail Release]  
Designed & Developed by :	Designbudy

> NOTE: this theme uses Bootstrap 3.3.7