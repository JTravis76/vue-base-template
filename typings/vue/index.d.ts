
/*
 This works, but the new Vue object will not understand the ComponentOption unless explictly set like so; new Vue({} as Componentoptions);
*/
//  declare class Vue {
//      static use: any;     
//      constructor(option?: ComponentOption);

//      $mount: any;
//  }


interface ComputedOptions<T> {
    get?(): T;
    set?(value: T): void;
    cache?: boolean;
}

/**
 * When the `Computed` type parameter on `ComponentOptions` is inferred,
 * it should have a property with the return type of every get-accessor.
 * Since there isn't a way to query for the return type of a function, we allow TypeScript
 * to infer from the shape of `Accessors<Computed>` and work backwards.
 */ type Accessors<T> = {
    [K in keyof T]: (() => T[K]) | ComputedOptions<T[K]>
}

interface VueConstructor {
    new (options?: ComponentOption): VueConstructor;

    use: any;
    $mount: any;
    filter(id: string, definition?: Function): Function;
    set<T>(object: object, key: string, value: T): T;
    set<T>(array: T[], key: number, value: T): T;
    config: VueConfiguration;
    $forceUpdate(): void;
    $refs: any;
    $emit(event: string, ...args: any[]): this;
    $set: typeof Vue.set;

    $router: any;
}

interface VueConfiguration {
    silent: boolean;
    optionMergeStrategies: any;
    devtools: boolean;
    productionTip: boolean;
    performance: boolean;
    errorHandler(err: Error, vm: VueConstructor, info: string): void;
    warnHandler(msg: string, vm: VueConstructor, trace: string): void;
    ignoredElements: (string | RegExp)[];
    keyCodes: { [key: string]: number | number[] };
}

type DefaultComputed = { [key: string]: any };
 interface ComponentOption {
    data?: { [key: string]: any } | Function;
    methods?: { [key: string]: Function };
    el?: string | HTMLElement | (() => HTMLElement);
    template?: string;
    replace?: boolean;
    init?(): void;
    created?(): void;
    beforeCompile?(): void;
    compiled?(): void;
    ready?(): void;
    attached?(): void;
    detached?(): void;
    beforeDestroy?(): void;
    destroyed?(): void;
    activate?: (done: () => void) => void;
    components?: { [key: string]: any };
    partials?: { [key: string]: string };
    parent?: VueConstructor;
    events?: { [key: string]: ((...args: any[]) => (boolean | void)) | string };
    mixins?: Object[];
    name?: string;
    [key: string]: any;
    beforeMount?(): void;
    mounted?(): void;
    beforeUpdate?(): void;
    updated?(): void;
    watch?: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any> | string>;

    //computed?: { [key: string]: Function };
    computed?: Accessors<DefaultComputed>;
    filters?: { [key: string]: Function };
    store?: any;
 }

type WatchHandler<T> = (val: T, oldVal: T) => void;

interface WatchOptions {
    deep?: boolean;
    immediate?: boolean;
}

interface WatchOptionsWithHandler<T> extends WatchOptions {
    handler: WatchHandler<T>;
}

declare var Vue: VueConstructor;

 declare module "vue" {
     export = Vue;
 }

/**-------------------------------
 * The following works, but in AMD modules, it will append a property member to the object.
 * 
 * import { Vue } from "vue"
 *
 *  const app = new Vue({
 *      el: "#app"
 *  });
 *
 * Result in:
 * define(["require", "exports", "vue"], function (require, exports, vue_1) {
 *   var app = new vue_1.Vue({
 *       el: "#app"
 *    });
 * };
 */
// export interface Vue {
//     readonly $el: HTMLElement;
// }

// export interface VueConstructor<V extends Vue = Vue> {
//     new (options?: ComponentOption);
// }

// export const Vue: VueConstructor;