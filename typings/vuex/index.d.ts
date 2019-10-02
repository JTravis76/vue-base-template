/// <reference path="../vue/index.d.ts" />

type ActionHandler<S, R> = (injectee: ActionContext<S, R>, payload: any) => any;
type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>;
type Mutation<S> = (state: S, payload: any) => any;
type StorePlugin<S> = (store: Store<S>) => any;

interface Store<S> {
    new (options: StoreOptions<S>);

    readonly state: S;
    readonly getters: any;

    replaceState(state: S): void;

    dispatch: Dispatch;
    commit: Commit;

    subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any): () => void;
    subscribeAction<P extends ActionPayload>(fn: (action: P, state: S) => any): () => void;
    //watch<T>(getter: (state: S, getters: any) => T, cb: (value: T, oldValue: T) => void, options?: WatchOptions): () => void;

    registerModule<T>(path: string, module: Module<T, S>, options?: ModuleOptions): void;
    registerModule<T>(path: string[], module: Module<T, S>, options?: ModuleOptions): void;

    unregisterModule(path: string): void;
    unregisterModule(path: string[]): void;

    hotUpdate(options: {
        actions?: ActionTree<S, S>;
        mutations?: MutationTree<S>;
        getters?: GetterTree<S, S>;
        modules?: ModuleTree<S>;
    }): void;
}

interface Dispatch {
    (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
    <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

interface Commit {
    (type: string, payload?: any, options?: CommitOptions): void;
    <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}   

interface ActionContext<S, R> {
    dispatch: Dispatch;
    commit: Commit;
    state: S;
    getters: any;
    rootState: R;
    rootGetters: any;
}

interface Payload {
    type: string;
}

interface MutationPayload extends Payload {
    payload: any;
}   

interface ActionPayload extends Payload {
    payload: any;
}

interface DispatchOptions {
    root?: boolean;
}

interface CommitOptions {
    silent?: boolean;
    root?: boolean;
}

interface StoreOptions<S> {
    state?: S;
    getters?: GetterTree<S, S>;
    actions?: ActionTree<S, S>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<S>;
    plugins?: StorePlugin<S>[];
    strict?: boolean;
}   

interface ActionObject<S, R> {
    root?: boolean;
    handler: ActionHandler<S, R>;
}

interface Module<S, R> {
    namespaced?: boolean;
    state?: S | (() => S);
    getters?: GetterTree<S, R>;
    actions?: ActionTree<S, R>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<R>;
}

interface ModuleOptions {
    preserveState?: boolean;
}

interface GetterTree<S, R> {
    [key: string]: Getter<S, R>;
}

interface ActionTree<S, R> {
    [key: string]: Action<S, R>;
}

interface MutationTree<S> {
    [key: string]: Mutation<S>;
}

interface ModuleTree<R> {
    [key: string]: Module<any, R>;
}

interface VueConstructor {
    $store: Store<any>;
}

interface ComponentOptions {
    store?: Store<any>;
}

interface VuexStatic {
    Store: Store<any>;
}

declare var Vuex: VuexStatic;

declare module "vuex" {
    export = Vuex;
}