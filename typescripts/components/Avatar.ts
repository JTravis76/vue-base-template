
export default {
    name: "avatar",
    components: {},
    template: `<img v-bind:src="src" v-bind:style="{'border-radius': borderRadius, 'width': width}" v-bind:alt="name">`,
    data() {
        return {
            borderRadius: this.round ? "50%" : "0%",
            width: this.size == 100 ? "100%" : this.size + "px",
            src: ""
        }
    },
    props: {
        name: {
            type: String,
            default: "?"
        },
        size: {
            type: Number,
            required: false,
            default: 100
        },
        round: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.src = LetterAvatar(this.name, this.size);
    },
    watch: {
        name(newVal) {
            this.src = LetterAvatar(newVal, this.size);
        }
    }
} as ComponentOption

/*
* LetterAvatar
* 
* Artur Heinze
* Create Letter avatar based on Initials
* based on https://gist.github.com/leecrossley/6027780
*/
function LetterAvatar(name: string = " ", size: number) {

    name = name || '';
    size = size || 60;

    var colours = [
        "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
        "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ],



        nameSplit = String(name).toUpperCase().split(' '),
        initials, charIndex, colourIndex, canvas, context, dataURI;

    if (name.indexOf(",") > -1) {
        name = name.replace(" ", "");
        nameSplit = String(name).toUpperCase().split(',').reverse();
    }

    if (nameSplit.length == 1) {
        initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
    } else {
        initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }

    if (window.devicePixelRatio) {
        size = (size * window.devicePixelRatio);
    }

    charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
    colourIndex = charIndex % 20;
    canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    context = canvas.getContext("2d");

    context.fillStyle = colours[colourIndex - 1];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = Math.round(canvas.width / 2) + "px Arial";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(initials, size / 2, size / 1.5);

    dataURI = canvas.toDataURL();
    canvas = null;

    return dataURI;
}