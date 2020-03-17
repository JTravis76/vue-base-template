declare namespace Tooltip {
    export type Placement = "top" | "bottom" | "left" | "right";

    export interface TooltipOption {
        animation?: string;
        placement?: Placement;
        delay?: number;
        container?: any;
    }

    export interface TooltipStatic {
        /**The method shows an initialized tooltip. When the method is executed, it will always create a new tooltip and append it into your desired container. */
        show(): void;
        /**The method hides an initialized tooltip and remove it from it's container and also from the memory, as if you would automatically destroy it. */
        hide(): void;
        /**The method shows the tooltip if hidden and hides it otherwise, using the above two methods. */
        toggle(): void;
    }

    export interface TooltipConstructor {
        new(element: HTMLElement, options?: TooltipOption): TooltipStatic
    }
}

declare let Tooltip: Tooltip.TooltipConstructor;

declare module 'tooltip' {
    export = Tooltip;
}