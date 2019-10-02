/// <reference path="../vue/index.d.ts" />

type Dictionary<T> = { [key: string]: T };
type RouterMode = "hash" | "history" | "abstract";
type RawLocation = string | Location;
type RedirectOption = RawLocation | ((to: Route) => RawLocation);
type NavigationGuard = (
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: VueConstructor) => any) | void) => void
) => any;
type RoutePropsFunction = (route: Route) => Object;

interface RouterOption {
    hashbang?: boolean;
    history?: boolean;
    abstract?: boolean;
    root?: string;
    linkActiveClass?: string;
    linkExactActiveClass?: string;
    saveScrollPosition?: boolean;
    transitionOnLoad?: boolean;
    suppressTransitionError?: boolean;
    mode?: RouterMode;
    routes?: RouteConfig[];
}

interface RouteConfig {
    path: string;
    name?: string;
    component?: ComponentOption;
    components?: Dictionary<ComponentOption>;
    redirect?: RedirectOption;
    alias?: string | string[];
    children?: RouteConfig[];
    meta?: any;
    //beforeEnter?: NavigationGuard;
    props?: boolean | Object | RoutePropsFunction;
    caseSensitive?: boolean;
    //pathToRegexpOptions?: PathToRegexpOptions;
}

interface Router {
    new <RootVueApp>(options?: RouterOption): Router;

    beforeEach(guard: NavigationGuard): Function;
    beforeResolve(guard: NavigationGuard): Function;
    afterEach(hook: (to: Route, from: Route) => any): Function;
    //push(location: RawLocation, onComplete?: Function, onAbort?: Function): void;
    push(location: any): void; //the above is from Evan You, but not able to get it to work
    replace(location: RawLocation, onComplete?: Function, onAbort?: Function): void;
    go(n: number): void;
    back(): void;
    forward(): void;
    //getMatchedComponents(to?: RawLocation | Route): Component[];
    onReady(cb: Function, errorCb?: Function): void;
    onError(cb: Function): void;
    addRoutes(routes: RouteConfig[]): void;
    resolve(to: RawLocation, current?: Route, append?: boolean): {
        location: Location;
        route: Route;
        href: string;
        // backwards compat
        normalizedTo: Location;
        resolved: Route;
    }
}

interface Location {
    name?: string;
    path?: string;
    //hash?: string;
    query?: Dictionary<string | string[]>;
    params?: Dictionary<string>;
    append?: boolean;
    //replace?: boolean;
}

//extends the Vue Componentoptions
interface ComponentOption {
    route?: any;
    router?: Router;
}

interface Route {
    path: string;
    name?: string;
    hash: string;
    query: Dictionary<string | string[]>;
    params: Dictionary<string>;
    fullPath: string;
    //matched: RouteRecord[];
    redirectedFrom?: string;
    meta?: any;
  }

declare var VueRouter: Router;

declare module "vue-router" {
    export = VueRouter;
}