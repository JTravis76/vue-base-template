// helper for enabling IE 8 event bindings
function addEvent(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
}

// live binding helper using matchesSelector
function live(selector, event, callback, context) {
    addEvent(context || document, event, function (e) {
        let found: boolean, el = e.target || e.srcElement;
        while (el && el.matches && el !== context && !(found = el.matches(selector))) {            
            el = el.parentElement;
        };
        if (found) {
            callback.call(this, el, e);
        };
    });
}

/**
 * Get parent element
 * @param elem starting element
 * @param selector selector
 */
let parents = function (elem: HTMLElement, selector: undefined | string): HTMLElement {
    let p = dir(elem, "parentNode", selector);
    return p[p.length - 1];
}

var dir = function (elem: HTMLElement, dir: string, until: undefined | string): HTMLElement[] {
    var matched = [],
        truncate = until !== undefined;

    while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
            matched.push(elem);
            if (truncate && elem.matches(until)) {
                break;
            }
        }
    }
    return matched;
};

let isVisible = function (elem: HTMLElement) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

var hasClass = function (el: HTMLElement, classname: string): boolean {
    if (el.classList != undefined && el.classList.contains(classname))
        return true;

    return false;
}

// fade an element from the current state to full opacity in "duration" ms
function fadeOut(el, duration?) {
    var s = el.style, step = 25 / (duration || 300);
    s.opacity = s.opacity || 1;
    (function fade() { (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25); })();
}

// fade out an element from the current state to full transparency in "duration" ms
// display is the display style the element is assigned after the animation is done
function fadeIn(el, duration?, display?) {
    var s = el.style, step = 25 / (duration || 300);
    s.opacity = s.opacity || 0;
    s.display = display || "block";
    (function fade() { (s.opacity = parseFloat(s.opacity) + step) > 1 ? s.opacity = 1 : setTimeout(fade, 25); })();
}