declare namespace BSNative {
    interface DropDownStatic {
        /**For a given initialization the method shows the dropdown-menu if hidden or hides it otherwise.*/
        toggle(): void;
    }

    interface DropdownConstructor {
        new(element: HTMLElement, persist?: boolean): DropDownStatic
    }

    interface TabStatic {
        /**The method to be used to switch to a certain tab of your choice via JavaScript. If that tab is already visible or the method is used while animation is running, the method will produce no effect.*/
        show(): void;
    }

    interface TabConstructor {
        new(element: HTMLElement, options?: any): TabStatic;
    }

    interface ModalOptions {
        content?: string;
        backdrop?: boolean | string;
        keyboard?: boolean;
    }

    interface ModalStatic {
        /**The method that shows an initialized modal. When called, it will also hide any other visible modal before showing the one requested, making sure to keep the backdrop in place. */
        show(): void;
        /**This hides an initialized modal. Additionally it will also close (if enabled) the backdrop. */
        hide(): void;
        /**When called it shows the modal if hidden and hides it otherwise, using the above two methods. */
        toggle(): void;
        /**The method to enable you to set/override the content of <div class="modal-content"> element of your modal at any time, but you might want to avoid using this method while the modal is animating.  */
        setContent(): void;
        /**This allows you to update the modal layout (handling overflowing/non-overflowing body and/or modal) after you have changed it's content or other layout changes occured. This would naturally follow the previous .setContent() method. */
        update(): void;
    }

    interface ModalConstructor {
        new(element: HTMLElement, option?: ModalOptions): ModalStatic;
    }

    interface CollapseOption {
        parent?: HTMLElement;
    }

    interface CollapseStatic {
        /**The method will expand a collapsible element. In addition, if the collapsible element is part of an accordion (it's options include a reference to a parent), it will also close any other visible collapsible element. */
        show(): void;
        /**The method hides a collapsible element. */
        hide(): void;
        /**The method will show / or hide a collapsible element using the above methods and their full functionalities. */
        toggle(): void;
    }

    interface CollapseConstructor {
        new(element: HTMLElement, option?: CollapseOption): CollapseStatic;
    }


    type Placement = "top" | "bottom" | "left" | "right";

    interface TooltipOption {
        animation?: string;
        placement?: Placement;
        delay?: number;
        container?: any;
    }

    interface TooltipStatic {
        /**The method shows an initialized tooltip. When the method is executed, it will always create a new tooltip and append it into your desired container. */
        show(): void;
        /**The method hides an initialized tooltip and remove it from it's container and also from the memory, as if you would automatically destroy it. */
        hide(): void;
        /**The method shows the tooltip if hidden and hides it otherwise, using the above two methods. */
        toggle(): void;
    }

    interface TooltipConstructor {
        new(element: HTMLElement, options?: TooltipOption): TooltipStatic
    }



    interface BootstrapNativeStatic {
        Dropdown: DropdownConstructor;
        Tab: TabConstructor;
        Modal: ModalConstructor;
        Collapse: CollapseConstructor;
        Tooltip: TooltipConstructor;

        /**Initialize Data API */
        initCallback(): void;
    }
}

declare let BSN: BSNative.BootstrapNativeStatic;

declare module 'bootstrap-native' {
    export = BSN;
}