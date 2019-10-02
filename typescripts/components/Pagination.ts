export default {
    name: "pagination",
    template: `<ul class="pagination pagination-sm" v-bind:data-target-id="TargetId"> <li v-if="PageIndex != 1"><a href="#" v-on:click.prevent="GotoPage(PageIndex - 1)">«</a></li> <template v-if="start > 1"> <li><a href="#" v-on:click.prevent="GotoPage(1)">1</a></li> <li v-if="start > 3"><a href="#" v-on:click.prevent="GotoPage(2)">2</a></li> <li v-if="start > 2" class="disabled"><a href="#">...</a></li> </template> <li v-for="num in array" v-bind:class="{'active': num === PageIndex}"><a href="#" v-on:click.prevent="GotoPage(num)">{{ num }}</a></li> <template v-if="end < TotalPages"> <li v-if="end < (TotalPages - 1)" class="disabled"><a href="#">...</a></li> <li v-if="end < (TotalPages - 2)"><a href="#" v-on:click.prevent="GotoPage(TotalPages)">{{ TotalPages }}</a></li> </template> <li v-if="PageIndex != TotalPages"><a href="#" v-on:click.prevent="GotoPage(PageIndex + 1)">»</a></li></ul>`,
    data() {
        return {
            MaxNofPages: 5,
            start: 1,
            end: 1
        }
    },
    props: {
        PageIndex: {
            type: Number,
            default: 0
        },
        TotalPages: {
            type: Number,
            default: 1
        },
        TargetId: {
            type: String,
            default: ""
        }
    },
    computed: {
        array() {
            let arr = [];
            for (let i = this.start; i <= this.end; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    watch: {
        PageIndex(newVal, oldVal) {
            CalculatePages(this);
        },
        TotalPages(newVal, oldVal) {
            CalculatePages(this);
        }
    },
    methods: {
        GotoPage(page: number) {
            this.$emit('callback', page);
        }
    }
} as ComponentOption

/**
 * Calculate pages within the pagination
 * @param vue Vue instance
 */
function CalculatePages(vue: any) {
    vue.end = vue.TotalPages;

    if (vue.TotalPages > vue.MaxNofPages) {
        let middle: number = Math.ceil(vue.MaxNofPages / 2) - 1;
        let below: number = (vue.PageIndex - middle);
        let above: number = (vue.PageIndex + middle);

        if (below < 2) {
            above = vue.MaxNofPages;
            below = 1;
        }
        else if (above > (vue.TotalPages - 2)) {
            above = vue.TotalPages;
            below = (vue.TotalPages - vue.MaxNofPages + 1);
        }
        vue.start = below;
        vue.end = above;
    }
}