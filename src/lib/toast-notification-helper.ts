//== based on https://github.com/ankurk91/vue-toast-notification ==//

const removeElement = (el: Element) => {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode.removeChild(el)
    }
};

const hasWindow = () => {
    return typeof window !== 'undefined';
};

const HTMLElement = hasWindow() ? window.HTMLElement : Object;

export { removeElement, hasWindow, HTMLElement }