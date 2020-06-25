import { VueConstructor } from "vue";

export default {
    install(vue: VueConstructor, name = "$dialog") {

        function Show(dlg: HTMLDialogElement, opt: DialogOptions) {
            if (dlg === null || dlg === undefined) throw new Error("Dialog is not defined.");

            if (!dlg["showModal"]) {
                console.warn("[WARN] your browser doesn't support native dialog api. Using fallback api.");

                // below is design based on Chrome's dialog api
                dlg.remove = () => {
                    let body = document.getElementsByTagName("body")[0];
                    body.removeChild(dlg);
                }

                dlg.show = () => {
                    dlg.setAttribute("open", "");
                    dlg.style.width = "500px";
                    dlg.style.display = "block";
                    dlg.style.position = "absolute";
                    dlg.style.margin = "auto";
                    dlg.style.background = "white";
                    dlg.style.color = "black";
                    dlg.style.border = "solid";
                    dlg.style.borderWidth = "2px";
                    dlg.style.borderColor = "black";
                    dlg.style.padding = "1em";
                    //center both H & V
                    dlg.style.top = "50%";
                    dlg.style.left = "50%";
                    dlg.style.transform = "translate(-50%, -50%)";
                }

                dlg.showModal = () => {
                    dlg.show();

                    let body = document.getElementsByTagName("body")[0];
                    let div = document.createElement("div");
                    div.classList.add("dialog-backdrop");
                    div.style.position = "fixed";
                    div.style.top = "0px";
                    div.style.left = "0px";
                    div.style.right = "0px";
                    div.style.bottom = "0px";
                    div.style.background = "rgba(0,0,0,0.2)";
                    div.style.zIndex = "50";
                    body.appendChild(div);
                }

                dlg.close = (v: string) => {
                    dlg.removeAttribute("open");
                    dlg.style.display = "none";
                    // IE 11 support to remove backdrop element
                    let body = document.getElementsByTagName("body")[0];
                    let div = document.querySelector(".dialog-backdrop");
                    body.removeChild(div);
                    //set the return value
                    dlg.returnValue = v.toString();
                }

                dlg.open = dlg.hasAttribute("open");
            }

            if (opt.backdrop)
                dlg.showModal();
            else
                dlg.show();
        }

        const dialog = (options: string | DialogOptions) => {
            let defaultOpt = {
                message: "",
                backdrop: true,
                title: "Message",
                type: "ok"
            } as DialogOptions;

            if (typeof options === "string") {
                defaultOpt.message = options;
            }
            else {
                defaultOpt = Object.assign(defaultOpt, options);
            }

            return new Promise((resolve, reject) => {

                return new (vue.extend({
                    template: `
<dialog style="min-width:400px;z-index:2000;">
    <div style="font-weight: bold;font-size:large;border-bottom:1px solid lightgray;margin-bottom:8px;">{{title}}</div>
    <div class="alert" v-html="message"></div>
    <div class="pull-right">
        <template v-if="type === 'ok'">
            <button type="button" class="btn btn-default" @click="Response(true)" data-testid="btn-dialog-ok"><span class="fa fa-ok"></span>Ok</button>
        </template>
        <template v-if="type === 'yesno'">
            <button type="button" class="btn btn-success" @click="Response(true)" data-testid="btn-dialog-yes"><span class="fa fa-thumbs-up"></span>Yes</button>
            <button type="button" class="btn btn-danger" @click="Response(false)" data-testid="btn-dialog-no"><span class="fa fa-thumbs-down"></span>No</button>
        </template>
    </div>
</dialog>`,
                    data() {
                        return {
                            dlg: null,
                            message: defaultOpt.message,
                            title: defaultOpt.title,
                            type: defaultOpt.type
                        }
                    },
                    methods: {
                        Response(result: boolean) {
                            let dlg = this.dlg as HTMLDialogElement;
                            dlg.close(""); //TODO: Might be able to use this pass back a result ??
                            dlg.remove();

                            if (result) resolve(dlg.returnValue);
                            else reject();
                        }
                    },
                    beforeMount() {
                        this.dlg = document.querySelector("dialog") as HTMLDialogElement;

                        // No need to create them, they already exists
                        if (this.dlg) {
                            Show(this.dlg, defaultOpt);

                            return;
                        }

                        let container = document.body;
                        container.appendChild(this.$el);
                    },
                    mounted() {
                        this.$nextTick(() => {
                            // now get the current version once the DOM is patched
                            this.dlg = document.querySelector("dialog") as HTMLDialogElement;
                            Show(this.dlg, defaultOpt);
                        });
                    }
                }))({
                    el: document.createElement("dialog")
                })
            });
        }

        Object.defineProperty(vue.prototype, name, { value: dialog });
    }
}

type ControlType = "ok" | "yesno";

export interface DialogOptions {
    title: string;
    message: string,
    backdrop?: boolean
    type?: ControlType;
}