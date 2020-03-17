declare namespace Dropdown {
    export interface DropdownStatic {
        /**For a given initialization the method shows the dropdown-menu if hidden or hides it otherwise.*/
        toggle(): void;
    }

    export interface DropdownConstructor {
        new(element: HTMLElement, persist?: boolean): DropdownStatic
    }
}

declare let Dropdown: Dropdown.DropdownConstructor

declare module 'dropdown' {
    export = Dropdown;
}