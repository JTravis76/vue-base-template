<template>
    <div id="SignaturePanel" class="modal" role="dialog">
        <div class="modal-dialog modal-lg"> 
            <div class="modal-content"> 
                <div class="modal-header"> 
                    <button type="button" class="close" data-dismiss="modal">&times;</button> 
                    <h4 class="modal-title">Signature Panel</h4> 
                </div> 
                <div class="modal-body"> 
                    <div style="min-height:200px;"> 
                        <canvas id="signature-pad" width="870" height="200" style="border:0.5px dotted gray;"></canvas> 
                        <div class="text-center">Sign Above</div> 
                    </div> 
                </div> 
                <div class="modal-footer"> 
                    <button type="button" class="btn btn-danger" v-on:click="Clear"><i class="fa fa-refresh"></i> Clear</button> 
                    <button type="button" class="btn btn-success" v-on:click="Save"><i class="fa fa-save"></i> Save</button> 
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> 
                </div> 
            </div> 
        </div> 
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import SignaturePad from "@/lib/signature-pad";

    @Component({
        name: "signature-pad"
    })
    export default class SignaturePad extends Vue {
        public signaturePad: SignaturePad = null;

        Clear() {
            signaturePad.clear();
            this.$emit("signature", null);
        }
        Save() {
            if (!signaturePad.isEmpty()) {
                let duplicate = document.getElementById("signature-pad") as HTMLCanvasElement;
                this.$emit("signature", cropSignatureCanvas(duplicate));
            }
        }
        mounted() {
            let canvas = document.getElementById("signature-pad") as HTMLCanvasElement;
            signaturePad = new SignaturePad(canvas);
        }
    }

    /**
    * Crop signature canvas to only contain the signature and no whitespace.
    * @params canvas
    * @since 1.0.0
    */
    function cropSignatureCanvas(canvas: HTMLCanvasElement) {
        // First duplicate the canvas to not alter the original
        let croppedCanvas = document.createElement('canvas'),
            croppedCtx = croppedCanvas.getContext('2d');

        croppedCanvas.width = canvas.width;
        croppedCanvas.height = canvas.height;
        croppedCtx.drawImage(canvas, 0, 0);

        // Next do the actual cropping
        let w = croppedCanvas.width,
            h = croppedCanvas.height,
            pix = { x: [], y: [] },
            imageData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height),
            x, y, index;

        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                index = (y * w + x) * 4;
                if (imageData.data[index + 3] > 0) {
                    pix.x.push(x);
                    pix.y.push(y);

                }
            }
        }
        pix.x.sort(function (a, b) { return a - b });
        pix.y.sort(function (a, b) { return a - b });
        let n = pix.x.length - 1;

        w = pix.x[n] - pix.x[0];
        h = pix.y[n] - pix.y[0];
        let cut = croppedCtx.getImageData(pix.x[0], pix.y[0], w, h);

        croppedCanvas.width = w;
        croppedCanvas.height = h;
        croppedCtx.putImageData(cut, 0, 0);

        return croppedCanvas.toDataURL();
    };
</script>

<style lang="scss"></style>