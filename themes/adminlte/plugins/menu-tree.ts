import { live, fadeIn, fadeOut, parents, isVisible, hasClass } from "@/lib/jquery-native"
import { VueConstructor } from "vue";

export default {
    install(vue: VueConstructor, name = "$menuTree") {
        Object.defineProperty(vue.prototype, name, { value: tree });
    }
}

/**Init Tree */
function tree() {
    let options = {
        animationSpeed: 500,
        submenuSelector: "treeview-menu",
        menuCssClass: "menu-open"
    };

    live("ul.sidebar-menu li a", "click", (el: HTMLElement, e: PointerEvent) => {
        let _self = el as HTMLElement;
        let checkElement = _self.nextElementSibling;

        if (checkElement != null) {
            //Check if the next element is a menu and is visible
            if (checkElement.classList.contains(options.submenuSelector) && isVisible(checkElement as HTMLElement) && !hasClass(document.getElementsByTagName("body")[0], "sidebar-collapse")) {
                fadeOut(checkElement, options.animationSpeed);
                let parent_li = parents(checkElement as HTMLElement, "li");
                parent_li.classList.toggle(options.menuCssClass);
            }
            //If the menu is not visible
            else if (checkElement.classList.contains(options.submenuSelector) && !isVisible(checkElement as HTMLElement)) {
                //Get the parent menu
                let parent = parents(_self, "ul");
                //get all sub-menus
                let ul = parent.querySelectorAll("ul");

                for (var u = 0; u < ul.length; u++) {
                    let el = ul[u] as HTMLElement;
                    if (isVisible(el)) {
                        //Close all open menus within the parent 
                        fadeOut(el, options.animationSpeed);
                        //Remove css class
                        el.parentElement.classList.toggle(options.menuCssClass);
                    }
                }

                //Open the target menu and add the menu-open class
                fadeIn(checkElement, options.animationSpeed);
                let parent_li = parents(_self, "li");
                parent_li.className += " " + options.menuCssClass;
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.classList.contains(options.submenuSelector)) {
                e.preventDefault();
            }
        }
    }, document);
}
