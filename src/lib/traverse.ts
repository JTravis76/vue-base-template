
/**
 * Finds element base on selector
 * @param elem starting element
 * @param selector selector
 */
export function find(elem: Element, selector: undefined | string): Element {
    let p = dir(elem, "parentNode", selector);
    return p[p.length - 1];
}

/**
 * Finds next element base on selector
 * @param elem starting element
 * @param selector selector
 */
export function next(element: Element, selector: undefined | string): Element {
    let p = dir(element, "childNodes", selector);
    return p[p.length - 1];
}

function dir(el: Element, dir: string, until: undefined | string): Element[] {
    var matched = [],
        truncate = until !== undefined;

    // traverse up
    while ((el = el[dir]) && el.nodeType !== 9) {        
        if (el.nodeType === 1) {
            matched.push(el);
            if (truncate && el.matches(until)) {
                break;
            }
        }
        else {
            //traverse down through childrens            
            let list = el as unknown as NodeListOf<Element>;

            for (let i = 0; i < list.length; i++) {
                if (list[i].nodeType === 1) {
                    matched.push(list[i]);
                    if (truncate && list[i].matches(until))
                        break;
                }
            }
        }
    }
    return matched;
};