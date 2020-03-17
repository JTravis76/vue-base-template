declare namespace Tab {
    export interface TabStatic {
        /**The method to be used to switch to a certain tab of your choice via JavaScript. If that tab is already visible or the method is used while animation is running, the method will produce no effect.*/
        show(): void;
    }

    export interface TabConstructor {
        new(element: HTMLElement, options?: any): TabStatic;
    }
}

declare let Tab: Tab.TabConstructor;

declare module 'tab' {
    export = Tab;
}