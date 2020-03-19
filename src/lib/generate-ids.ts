import { find, next } from "./traverse";

/** This will generate Ids for selected HTML element to assist with automated testing.
 * Supported elements: input[text,checkbox,radio], button, textarea, table
 * Author: Jeremy Travis - 2020
 */
export function GenerateIds(): void {
    document.querySelectorAll(".modal").forEach(el => {
        // get all buttons within modal
        let idx = 1;
        el.querySelectorAll("button[type=button]").forEach(btn => {
            let name = "Button";
            if (btn.id === "") {
                let txt = btn.textContent.toLocaleLowerCase().trim();
                if (txt !== "") {
                    name = el.id.toLocaleLowerCase() + "-" + txt;
                    btn.id = name;
                }
                else {
                    btn.id = name + idx.toString();
                }
            }
        });
        // get all textboxes within modal
        idx = 1;
        el.querySelectorAll("input[type=text]").forEach(el => {
            let name = "TextBox";
            let p = find(el, ".form-group");
            let n = next(p, "label");

            if (p.nodeName !== "HTML" && n !== undefined) {
                name = n.innerHTML.toLocaleLowerCase().replace(" ", "-")
            }

            if (el.id === "" || el.id.indexOf("TextBox") > -1) {
                if (name === "TextBox") {
                    el.id = name + idx.toString();
                    idx += 1;
                }
                else
                    el.id = name;
            }
        });
    });
    // Scan for <input type="text">
    var idx = 1;
    document.querySelectorAll("input[type=text]").forEach(el => {
        let name = "TextBox";
        let p = find(el, ".form-group");
        let n = next(p, "label");

        if (p.nodeName !== "HTML" && n !== undefined) {
            name = n.innerHTML.toLocaleLowerCase().replace(" ", "-")
        }

        if (el.id === "" || el.id.indexOf("TextBox") > -1) {
            if (name === "TextBox") {
                el.id = name + idx.toString();
                idx += 1;
            }
            else
                el.id = name;
        }
    });
    // Reset and scan for <input type="checkbox">
    idx = 1;
    document.querySelectorAll("input[type=checkbox]").forEach(el => {
        if (el.id === "" || el.id.indexOf("CheckBox") > -1) {
            el.id = "CheckBox" + idx.toString();
        }
        idx += 1;
    });
    // Reset and scan for <input type="radio">
    idx = 1;
    document.querySelectorAll("input[type=radio]").forEach(el =>{
        if (el.id === "" || el.id.indexOf("Radio") > -1) {
            el.id = "Radio" + idx.toString();
        }
        idx += 1;
    });
    // Reset and scan for <button type="button" >
    //idx = 1;
    //document.querySelectorAll("button[type=button]").forEach(el => {
    //    let name = "Button";
    //    let p = find(el, ".modal");
    //    //console.log(p);
    //    if (p.nodeName === "DIV" && p.id !== "") {
    //        console.log(p.id);
    //    }

    //    if (el.id === "" || el.id.indexOf("Button") > -1) {
    //        el.id = "Button" + idx.toString();
    //    }
    //    idx += 1;
    //});
    // Reset and scan for <textarea>
    idx = 1;
    document.querySelectorAll("textarea").forEach(el => {
        let name = "TextArea";
        let p = find(el, ".form-group");
        let n = next(p, "label");

        if (n != undefined) {
            name = n.innerHTML.toLocaleLowerCase().replace(" ", "-")
        }

        if (el.id === "" || el.id.indexOf("TextArea") > -1) {
            if (name === "TextArea") {
                el.id = name + idx.toString();
                idx += 1;
            }
            else
                el.id = name;
        }
    });
    // Reset and scan for <table>
    idx = 1;
    document.querySelectorAll("table").forEach(el => {
        if (el.id === "" || el.id.indexOf("Table") > -1) {
            el.id = "Table" + idx.toString();
        }
        idx += 1;
    });
}

export default {
    GenerateIds: GenerateIds
}