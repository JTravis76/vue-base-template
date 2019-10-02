export default {
    install(vue, name = "$panelWidget") {
        Object.defineProperty(vue.prototype, name, { value: PanelWidgets });
    }
}

/**Collection of Box Widget to start */
function PanelWidgets() {
    CollapseBox();
    RemoveBox();
}

/**Expands/Collapse box widget */
function CollapseBox() {
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

            let panel = parents(e.target as HTMLElement, ".panel");
            panel.classList.toggle("collapsed-panel");
        });
    }
}

/**Remove box widget */
function RemoveBox() {
    let remove = document.querySelectorAll("[data-widget='remove']") as NodeListOf<HTMLButtonElement>;
    for (var i = 0; i < remove.length; i++) {
        remove[i].addEventListener("click", function (e) {
            e.preventDefault();
            let panel = parents(e.target as HTMLElement, ".panel");
            panel.parentNode.removeChild(panel);
        });
    }
}