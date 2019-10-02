import * as marked from "marked"

export default {
    name: "markdown-editor",
    template: `<div class="md-editor"> <div class="md-header btn-toolbar"> <div class="btn-group"> <button tabindex="-1" title="Bold" class="btn-default btn-sm btn" type="button" v-on:click="Bold" v-bind:disabled="isPreview" data-hotkey="Ctrl+B"> <span class="glyphicon glyphicon-bold"></span> </button> <button tabindex="-1" title="Italic" class="btn-default btn-sm btn" v-on:click="Italic" type="button" v-bind:disabled="isPreview" data-hotkey="Ctrl+I"> <span class="glyphicon glyphicon-italic"></span> </button> <button tabindex="-1" title="Heading" class="btn-default btn-sm btn" type="button" v-on:click="Heading" v-bind:disabled="isPreview" data-hotkey="Ctrl+H"> <span class="glyphicon glyphicon-header"></span> </button> </div> <div class="btn-group"> <button tabindex="-1" title="URL/Link" class="btn-default btn-sm btn" type="button" v-on:click="Link" v-bind:disabled="isPreview" data-hotkey="Ctrl+L"> <span class="glyphicon glyphicon-link"></span> </button> <button tabindex="-1" title="Image" class="btn-default btn-sm btn" type="button" v-on:click="Image" v-bind:disabled="isPreview" data-hotkey="Ctrl+G"> <span class="glyphicon glyphicon-picture"></span> </button> </div> <div class="btn-group"> <button tabindex="-1" title="Unordered List" class="btn-default btn-sm btn" type="button" v-on:click="UnorderedList" v-bind:disabled="isPreview" data-hotkey="Ctrl+U"> <span class="glyphicon glyphicon-list"></span> </button> <button tabindex="-1" title="Ordered List" class="btn-default btn-sm btn" type="button" v-on:click="OrderedList" v-bind:disabled="isPreview" data-hotkey="Ctrl+O"> <span class="glyphicon glyphicon-th-list"></span> </button> <button tabindex="-1" title="Code" class="btn-default btn-sm btn" type="button" v-on:click="Code" v-bind:disabled="isPreview" data-hotkey="Ctrl+K"> <span class="glyphicon glyphicon-console"></span> </button> <button tabindex="-1" title="Quote" class="btn-default btn-sm btn" type="button" v-on:click="Quote" v-bind:disabled="isPreview" data-hotkey="Ctrl+Q"> <span class="glyphicon glyphicon-comment"></span> </button> </div> <div class="btn-group"> <button tabindex="-1" title="Preview" class="btn-sm btn btn-primary" type="button" v-on:click="Preview" data-hotkey="Ctrl+P"> <span class="glyphicon glyphicon-search"></span> Preview </button> </div> <!--<div class="md-controls"> <a class="md-control md-control-fullscreen" href="#"><span class="glyphicon glyphicon-fullscreen"></span></a> </div>--> </div> <textarea class="md-input" rows="20" v-show="!isPreview" v-model="content"></textarea> <div id="markdown-preview" v-show="isPreview"></div> <!--<div class="md-fullscreen-controls"> <a title="Exit fullscreen" class="exit-fullscreen" href="#"><span class="glyphicon glyphicon-fullscreen"></span></a> </div>--></div>`,
    data() {
        return {
            isPreview: false,
            content: this.unmarked
        }
    },
    props: {
        unmarked: {
            default: ""
        }
    },
    methods: {
        Bold() {
            // Give/remove ** surround the selection
            let chunk, cursor, selected = getSelection(),
                content = getContent();

            if (selected.length === 0) {
                // Give extra word
                chunk = 'strong text';
            } else {
                chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start - 2, 2) === '**' &&
                content.substr(selected.end, 2) === '**') {
                setSelection(selected.start - 2, selected.end + 2);
                replaceSelection(chunk);
                cursor = selected.start - 2;
            } else {
                replaceSelection('**' + chunk + '**');
                cursor = selected.start + 2;
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        Italic() {
            // Give/remove * surround the selection
            var chunk, cursor, selected = getSelection(),
                content = getContent();

            if (selected.length === 0) {
                // Give extra word
                chunk = 'emphasized text';
            } else {
                chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start - 1, 1) === '_' &&
                content.substr(selected.end, 1) === '_') {
                setSelection(selected.start - 1, selected.end + 1);
                replaceSelection(chunk);
                cursor = selected.start - 1;
            } else {
                replaceSelection('_' + chunk + '_');
                cursor = selected.start + 1;
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        Heading() {
            // Append/remove ### surround the selection
            var chunk, cursor, selected = getSelection(),
                content = getContent(),
                pointer, prevChar;

            if (selected.length === 0) {
                // Give extra word
                chunk = 'heading text';
            } else {
                chunk = selected.text + '\n';
            }

            // transform selection and set the cursor into chunked text
            if ((pointer = 4, content.substr(selected.start - pointer, pointer) === '### ') ||
                (pointer = 3, content.substr(selected.start - pointer, pointer) === '###')) {
                setSelection(selected.start - pointer, selected.end);
                replaceSelection(chunk);
                cursor = selected.start - pointer;
            } else if (selected.start > 0 && (prevChar = content.substr(selected.start - 1, 1), !!prevChar && prevChar != '\n')) {
                replaceSelection('\n\n### ' + chunk);
                cursor = selected.start + 6;
            } else {
                // Empty string before element
                replaceSelection('### ' + chunk);
                cursor = selected.start + 4;
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        Link() {
            // Give [] surround the selection and prepend the link
            var chunk, cursor, selected = getSelection(),
                content = getContent(),
                link;

            if (selected.length === 0) {
                // Give extra word
                chunk = 'enter link description here';
            } else {
                chunk = selected.text;
            }

            link = prompt('Insert Hyperlink', 'http://');

            var urlRegex = new RegExp('^((http|https)://|(mailto:)|(//))[a-z0-9]', 'i');
            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
                let div = document.createElement("div");
                div.innerHTML = link;

                var sanitizedLink = div.innerText; //$('<div>' + link + '</div>').text();

                // transform selection and set the cursor into chunked text
                replaceSelection('[' + chunk + '](' + sanitizedLink + ')');
                cursor = selected.start + 1;

                // Set the cursor
                setSelection(cursor, cursor + chunk.length);
            }
        },
        Image() {
            // Give ![] surround the selection and prepend the image link
            var chunk, cursor, selected = getSelection(),
                content = getContent(),
                link;

            if (selected.length === 0) {
                // Give extra word
                chunk = 'enter image description here';
            } else {
                chunk = selected.text;
            }

            link = prompt('Insert Image Hyperlink', 'http://');

            var urlRegex = new RegExp('^((http|https)://|(//))[a-z0-9]', 'i');
            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
                let div = document.createElement("div");
                div.innerHTML = link;

                var sanitizedLink = div.innerText; //$('<div>' + link + '</div>').text();

                // transform selection and set the cursor into chunked text
                replaceSelection('![' + chunk + '](' + sanitizedLink + ' "' + 'enter image title here' + '")');
                cursor = selected.start + 2;

                // Set the next tab
                //setNextTab('enter image title here');

                // Set the cursor
                setSelection(cursor, cursor + chunk.length);
            }
        },
        UnorderedList() {
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = getSelection();
                //content = getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
                // Give extra word
                chunk = 'list text here';

                replaceSelection('- ' + chunk);
                // Set the cursor
                cursor = selected.start + 2;
            } else {
                if (selected.text.indexOf('\n') < 0) {
                    chunk = selected.text;

                    replaceSelection('- ' + chunk);

                    // Set the cursor
                    cursor = selected.start + 2;
                } else {
                    var list = [];

                    list = selected.text.split('\n');
                    chunk = list[0];

                    list.forEach(function (k, v) {
                        list[k] = '- ' + v;
                    });

                    replaceSelection('\n\n' + list.join('\n'));

                    // Set the cursor
                    cursor = selected.start + 4;
                }
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        OrderedList() {
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = getSelection(),
                content = getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
                // Give extra word
                chunk = 'list text here';
                replaceSelection('1. ' + chunk);
                // Set the cursor
                cursor = selected.start + 3;
            } else {
                if (selected.text.indexOf('\n') < 0) {
                    chunk = selected.text;

                    replaceSelection('1. ' + chunk);

                    // Set the cursor
                    cursor = selected.start + 3;
                } else {
                    var i = 1;
                    var list = [];

                    list = selected.text.split('\n');
                    chunk = list[0];

                    list.forEach(function (k, v) {
                        list[k] = i + '. ' + v;
                        i++;
                    });

                    replaceSelection('\n\n' + list.join('\n'));

                    // Set the cursor
                    cursor = selected.start + 5;
                }
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        Code() {
            // Give/remove ** surround the selection
            var chunk, cursor, selected = getSelection(),
                content = getContent();

            if (selected.length === 0) {
                // Give extra word
                chunk = 'code text here';
            } else {
                chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start - 4, 4) === '```\n' &&
                content.substr(selected.end, 4) === '\n```') {
                setSelection(selected.start - 4, selected.end + 4);
                replaceSelection(chunk);
                cursor = selected.start - 4;
            } else if (content.substr(selected.start - 1, 1) === '`' &&
                content.substr(selected.end, 1) === '`') {
                setSelection(selected.start - 1, selected.end + 1);
                replaceSelection(chunk);
                cursor = selected.start - 1;
            } else if (content.indexOf('\n') > -1) {
                replaceSelection('```\n' + chunk + '\n```');
                cursor = selected.start + 4;
            } else {
                replaceSelection('`' + chunk + '`');
                cursor = selected.start + 1;
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        Quote() {
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = getSelection();
                //content = getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
                // Give extra word
                chunk = 'quote here';

                replaceSelection('> ' + chunk);

                // Set the cursor
                cursor = selected.start + 2;
            } else {
                if (selected.text.indexOf('\n') < 0) {
                    chunk = selected.text;

                    replaceSelection('> ' + chunk);

                    // Set the cursor
                    cursor = selected.start + 2;
                } else {
                    var list = [];

                    list = selected.text.split('\n');
                    chunk = list[0];

                    list.forEach(function (k, v) {
                        list[k] = '> ' + v;
                    });

                    replaceSelection('\n\n' + list.join('\n'));

                    // Set the cursor
                    cursor = selected.start + 4;
                }
            }

            // Set the cursor
            setSelection(cursor, cursor + chunk.length);
        },
        Preview() {
            this.isPreview = this.isPreview == false;

            if (this.isPreview) {
                let textarea = document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement;
                let div = document.getElementById("markdown-preview") as HTMLDivElement;
                div.style.width = textarea.clientWidth + "px";
                div.style.minHeight = textarea.clientHeight + "px";
                div.style.height = "auto";
                div.innerHTML = marked(textarea.value);
            }
        },
        Fullscreen() {

        }
    }
} as ComponentOption

function getSelection() {
    let e = document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement;

    return (

        ('selectionStart' in e && function () {
            var l = e.selectionEnd - e.selectionStart;
            return {
                start: e.selectionStart,
                end: e.selectionEnd,
                length: l,
                text: e.value.substr(e.selectionStart, l)
            };
        }) ||

        /* browser not supported */
        function () {
            return null;
        }

    )();
}

function getContent(): string {
    return document.getElementsByTagName("textarea")[0].value;
}

function setSelection(start, end) {
    let e = document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement;

    return (

        ('selectionStart' in e && function () {
            e.selectionStart = start;
            e.selectionEnd = end;
            return;
        }) ||

        /* browser not supported */
        function () {
            return null;
        }

    )();
}

function replaceSelection(text) {
    let e = document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement;

    return (

        ('selectionStart' in e && function () {
            e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
            // Set cursor to the last replacement end
            e.selectionStart = e.value.length;
            return this;
        }) ||

        /* browser not supported */
        function () {
            e.value += text;
            return e;
        }

    )();
}
