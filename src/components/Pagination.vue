<template>
    <ul class="pagination pagination-sm" :data-target-id="targetId">
        <li v-if="pageIndex != 1">
            <a href="#" @click.prevent="GotoPage(pageIndex - 1)">«</a>
        </li>
        <template v-if="start > 1">
            <li>
                <a href="#" @click.prevent="GotoPage(1)">1</a>
            </li>
            <li v-if="start > 3">
                <a href="#" @click.prevent="GotoPage(2)">2</a>
            </li>
            <li v-if="start > 2" class="disabled">
                <a href="#">...</a>
            </li>
        </template>
        <li v-for="num in array" :key="num" :class="{'active': num === pageIndex}">
            <a href="#" @click.prevent="GotoPage(num)">{{ num }}</a>
        </li>
        <template v-if="end < totalPages">
            <li v-if="end < (totalPages - 1)" class="disabled">
                <a href="#">...</a>
            </li>
            <li v-if="end < (totalPages - 2)">
                <a href="#" @click.prevent="GotoPage(totalPages)">{{ totalPages }}</a>
            </li>
        </template>
        <li v-if="pageIndex != totalPages">
            <a href="#" @click.prevent="GotoPage(pageIndex + 1)">»</a>
        </li>
    </ul>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({
        name: "pagination",
        watch: {
            pageIndex(n: number, o: number) {
                CalculatePages(this);
            },
            totalPages(n: number, o: number) {
                CalculatePages(this);
            }
        }
    })
    export default class Pagination extends Vue { 
        public MaxNofPages: number = 5;
        public start: number = 1;
        public end: number = 1;

        @Prop({ default: 1 }) readonly pageIndex: number;
        @Prop({ default: 1 }) readonly totalPages: number;
        @Prop({ default: "pagination1" }) readonly targetId: string;

        get array() {
            let arr = [];
            for (let i = this.start; i <= this.end; i++) {
                arr.push(i);
            }
            return arr;
        }

        GotoPage(page: number) {
            this.$emit('selected', page);
        }
    }

    /**
     * Calculate pages within the pagination
     * @param vm Vue instance
     */
    function CalculatePages(vm: Pagination) {
        vm.end = vm.totalPages;

        if (vm.totalPages > vm.MaxNofPages) {
            let middle: number = Math.ceil(vm.MaxNofPages / 2) - 1;
            let below: number = (vm.pageIndex - middle);
            let above: number = (vm.pageIndex + middle);

            if (below < 2) {
                above = vm.MaxNofPages;
                below = 1;
            }
            else if (above > (vm.totalPages - 2)) {
                above = vm.totalPages;
                below = (vm.totalPages - vm.MaxNofPages + 1);
            }
            vm.start = below;
            vm.end = above;
        }
    }
</script>