declare namespace BSN {
    export interface BootstrapNative {
        /**Initialize Data API */
        initCallback(): void;
        supports: any[];
        version: string;
    }
}

declare let BSN: BSN.BootstrapNative;

declare module 'bootstrap-native' {
    export = BSN;
}