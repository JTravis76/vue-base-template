import { find } from "@/lib/traverse";

export default {
    install(vue, name = "$boxWidget") {
        Object.defineProperty(vue.prototype, name, { value: BoxWidgets });
    }
}

/**Collection of Box Widget to start */
function BoxWidgets(): void {
    CollapseBox();
    RemoveBox();
}

/**Expands/Collapse box widget */
function CollapseBox(): void {
    let collapse = document.querySelectorAll("[data-widget='collapse']") as NodeListOf<HTMLButtonElement>;
    for (var i = 0; i < collapse.length; i++) {
        collapse[i].addEventListener("click", function (e) {
            e.preventDefault();
            let btn = e.target as HTMLButtonElement;
             if (btn.nodeName === "BUTTON") {
                let i = btn.lastChild as HTMLElement;
                i.classList.toggle("fa-minus");
                i.classList.toggle("fa-plus");
             }
             else {
                btn.classList.toggle("fa-minus");
                btn.classList.toggle("fa-plus");
             } 

            let box = find(e.target as HTMLElement, ".box");
            box.classList.toggle("collapsed-box");
        });
    }
}

/**Remove box widget */
function RemoveBox(): void {
    let remove = document.querySelectorAll("[data-widget='remove']") as NodeListOf<HTMLButtonElement>;
    for (var i = 0; i < remove.length; i++) {
        remove[i].addEventListener("click", function (e) {
            e.preventDefault();
            let box = find(e.target as HTMLElement, ".box");
            box.parentNode.removeChild(box);
        });
    }
}