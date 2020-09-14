/** Template-CLI
 * Applies selected theme to vue-base-template.
 * deno run --unstable --allow-write --allow-read --allow-run template-cli.ts
 */
import Ask from "https://deno.land/x/ask@1.0.5/mod.ts";
import * as fs from "https://deno.land/std@0.68.0/fs/mod.ts";

if (Deno.version.deno !== "1.3.3") console.log(`[WARN] Your DENO version ${Deno.version.deno} may not be supported. Supported version is: 1.3.3.`);

console.log("\n==== Template-CLI ver. 0.2.0 ====");
console.log("\nAvailable Templates:");
console.log("\n1. AdminLTE");
console.log("2. Hierapolis");
console.log("\n");

let args = "";
let p = null;
let status = null;

new Ask({prefix: ">"}).input({
    name: "template",
    message: "select a template:"
}).then(async res => {
    switch(parseInt( res.template)) 
    {
        case 1:
            console.log("\nScaffolding AdminLTE...");

            await fs.copy("./themes/adminlte/router.ts", "./src/router/index.ts", { overwrite: true });
            await fs.copy("./themes/adminlte/scss", "./src/scss", { overwrite: true });
            await fs.copy("./themes/adminlte/store.ts", "./src/store/index.ts", { overwrite: true });
            await fs.copy("./themes/adminlte/fake-data.ts", "./src/store/modules/fake-data.ts", { overwrite: true });

            await Deno.remove("./src/views", { recursive: true });
            await Deno.mkdir("./src/views");
            await fs.copy("./themes/adminlte/views", "./src/views", { overwrite: true });

            await fs.copy("./themes/adminlte/App.vue", "./src/App.vue", { overwrite: true });
            await fs.copy("./themes/adminlte/main.ts", "./src/main.ts", { overwrite: true });
            await fs.copy("./themes/adminlte/models.ts", "./src/models.ts", { overwrite: true });
            
            await fs.copy("./themes/adminlte/rollup.config.js", "./rollup.config.js", { overwrite: true });
            await fs.copy("./themes/adminlte/rollup.config.live.js", "./rollup.config.live.js", { overwrite: true });

            await fs.copy("./themes/adminlte/img", "./dist/img", { overwrite: true });
            await fs.copy("./themes/adminlte/bootstrap-native.js", "./dist/js/bootstrap-native.js", { overwrite: true });
            await fs.copy("./themes/adminlte/index.html", "./dist/index.html", { overwrite: true });

            console.log("Adding packages...");
            args = "cmd /c npm i awesome-bootstrap-checkbox@0.3.7 axios@0.19.2 bootstrap-sass@3.4.1 bootstrap.native@2.0.27 font-awesome@4.7.0";
            p = Deno.run({ cmd: args.split(" "), stdout: "piped", stderr: "piped" });
            status = await p.status();
            p.stdout?.close();
            p.stderr?.close();
            p.close();
            
            await Deno.mkdir("./dist/fonts");
            await fs.copy("./node_modules/font-awesome/fonts", "./dist/fonts", { overwrite: true });
            await fs.copy("./node_modules/bootstrap-sass/assets/fonts", "./dist/fonts", { overwrite: true });

            break;
        case 2:
            console.log("\nScaffolding Hierapolis...");

            await Deno.remove("./src/views/layout", { recursive: true });
            await Deno.mkdir("./src/views/layout");
            await fs.copy("./themes/hierapolis/layout", "./src/views/layout", { overwrite: true });

            await fs.copy("./themes/hierapolis/scss", "./src/scss", { overwrite: true });
            await fs.copy("./themes/hierapolis/App.vue", "./src/App.vue", { overwrite: true });
            await fs.copy("./themes/hierapolis/main.ts", "./src/main.ts", { overwrite: true });

            console.log("Adding packages...");
            args = "cmd /c npm i bootstrap-sass@3.4.1 bootstrap.native@2.0.27 font-awesome@4.7.0";
            p = Deno.run({ cmd: args.split(" "), stdout: "piped", stderr: "piped" });
            status = await p.status();
            p.stdout?.close();
            p.stderr?.close();
            p.close();

            await fs.copy("./themes/hierapolis/img", "./dist/img", { overwrite: true });
            await fs.copy("./themes/hierapolis/bootstrap-native.js", "./dist/js/bootstrap-native.js", { overwrite: true });
            await fs.copy("./themes/hierapolis/index.html", "./dist/index.html", { overwrite: true });

            await Deno.mkdir("./dist/fonts");
            await fs.copy("./node_modules/font-awesome/fonts", "./dist/fonts", { overwrite: true });
            await fs.copy("./node_modules/bootstrap-sass/assets/fonts", "./dist/fonts", { overwrite: true });

            break;
        default:
            throw "Invaild Selection!!";
    }
    console.log("template ready.");
    console.log("\nRun following commands:\n    npm run build\n    npm run serve\n\n");
});