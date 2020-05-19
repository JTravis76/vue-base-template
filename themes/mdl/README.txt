        mounted(){
            let buttons = document.querySelectorAll("[data-toggle=modal]") as NodeListOf<HTMLButtonElement>;
            buttons.forEach((b) => {
                let target = b.getAttribute("data-target");
                b.addEventListener("click", (e) => {
                    let dialog = document.querySelector(target) as HTMLDialogElement;
                    dialog.querySelectorAll("[data-dismiss=modal]").forEach((d) => {
                        d.addEventListener("click", (e) => {
                            dialog.close();
                        });
                    });
                    
                    dialog.showModal();
                });
            });
        }