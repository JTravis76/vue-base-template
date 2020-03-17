declare namespace Modal {
    export interface ModalOptions {
        content?: string;
        backdrop?: boolean | string;
        keyboard?: boolean;
    }

    export interface ModalStatic {
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

    export interface ModalConstructor {
        new(element: HTMLElement, option?: ModalOptions): ModalStatic;
    }
}

declare let Modal: Modal.ModalConstructor;

declare module 'modal' {
    export = Modal;
}