type ToastType = "success" | "error" | "default" | "info" | "warning";
type ToastPosition = "top" | "bottom" | "top-right" | "bottom-right" | "top-left" | "bottom-left";

interface ToastConstructor {
    open(message: string): void;
    open(options: ToastOption): void;
    success(message: string, options?: ToastOptions): void;
    error(message: string, options?: ToastOptions): void;
    info(message: string, options?: ToastOptions): void;
    warning(message: string, options?: ToastOptions): void;
    default(message: string, options?: ToastOptions): void;
    clear(): void;
}
interface ToastOption extends ToastOptions {
    /**Text to display */
    message: string,
}
interface ToastOptions {
    /**Toast style. Default: success */
    type?: ToastType,
    /**Screen position to display. Default: bottom-right */
    position?: ToastPosition,
    /**Visibility duration in milliseconds. Default: 3000 */
    duration?: number,
    /**Allow user close by clicking. Default: true */
    dismissible?: boolean,
    /**Do something when user clicks */
    onClick?: Function,
    /**Do something after toast gets dismissed */
    onClose?: Function,
    /**Wait for existing to close before showing new. default: false */
    queue?: boolean
}