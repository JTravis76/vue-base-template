declare namespace Collapse {
    export interface CollapseOption {
        parent?: HTMLElement;
    }

    export interface CollapseStatic {
        /**The method will expand a collapsible element. In addition, if the collapsible element is part of an accordion (it's options include a reference to a parent), it will also close any other visible collapsible element. */
        show(): void;
        /**The method hides a collapsible element. */
        hide(): void;
        /**The method will show / or hide a collapsible element using the above methods and their full functionalities. */
        toggle(): void;
    }

    export interface CollapseConstructor {
        new(element: HTMLElement, option?: CollapseOption): CollapseStatic;
    }
}

declare let Collapse: Collapse.CollapseConstructor;

declare module 'collapse' {
    export = Collapse;
}