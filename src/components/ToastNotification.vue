<template>
    <transition :enter-active-class="transition.enter"
                :leave-active-class="transition.leave">
        <div role="alert"
             v-show="isActive"
             class="toast"
             v-bind:class="['toast-' + type, 'is-' + position]"
             @click="whenClicked">
            <div class="toast-icon"></div>
            <p class="toast-text">{{message}}</p>
        </div>
    </transition>
</template>

<script lang="ts">
    //== based on https://github.com/ankurk91/vue-toast-notification ==//
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { removeElement, HTMLElement } from "@/lib/toast-notification-helper";
    import EventBus from "@/lib/event-bus";

    @Component({
        name: "toast-notification"
    })
    export default class ToastNotification extends Vue {
        public isActive: boolean = false;
        public parentTop: Element = null;
        public parentBottom: Element = null;
        public timer: any = null;

        @Prop({ type: String, required: true }) readonly message: string;
        @Prop({ type: String, default: "success" }) readonly type: string;
        @Prop({ type: String, default: "bottom-right" }) readonly position: string;
        @Prop({ type: Number, default: 3000 }) readonly duration: number;
        @Prop({ type: Boolean, default: true }) readonly dismissible: boolean;
        @Prop({ type: Function, default: () => { } }) readonly onClose: Function;
        @Prop({ type: Function, default: () => { } }) readonly onClick: Function;
        @Prop({ default: false }) readonly queue: boolean;
        @Prop({ type: [Object, Function, HTMLElement], default: null }) readonly container: HTMLElement;

        get correctParent() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return this.parentTop;

                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return this.parentBottom;
            }
        }
        get transition() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOut'
                    };
                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOut'
                    }
            }
        }

        setupContainer() {
            this.parentTop = document.querySelector('.notices.is-top');
            this.parentBottom = document.querySelector('.notices.is-bottom');

            // No need to create them, they already exists
            if (this.parentTop && this.parentBottom) return;

            if (!this.parentTop) {
                this.parentTop = document.createElement('div');
                this.parentTop.className = 'notices is-top';
            }

            if (!this.parentBottom) {
                this.parentBottom = document.createElement('div');
                this.parentBottom.className = 'notices is-bottom';
            }

            let container = this.container || document.body;
            container.appendChild(this.parentTop);
            container.appendChild(this.parentBottom);
            let containerParentClass = 'is-custom-parent';

            if (this.container) {
                this.parentTop.classList.add(containerParentClass);
                this.parentBottom.classList.add(containerParentClass);
            }
        }
        shouldQueue() {
            if (!this.queue) return false;
            return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
        }
        close() {
            let _arguments = arguments,
                vm = this;

            clearTimeout(this.timer);
            this.isActive = false; // Timeout for the animation complete before destroying

            setTimeout(() => {
                vm.onClose.apply(null, _arguments);
                vm.$destroy();
                removeElement(vm.$el);
            }, 150);
        }
        showNotice() {
            let vm = this;

            if (this.shouldQueue()) {
                // Call recursively if should queue
                setTimeout(() => {
                    return vm.showNotice();
                }, 250);
                return;
            }

            this.correctParent.insertAdjacentElement('afterbegin', this.$el);
            this.isActive = true;
            this.timer = setTimeout(() => {
                return vm.close();
            }, this.duration);
        }
        whenClicked() {
            if (!this.dismissible) return;
            this.onClick.apply(null, arguments);
            this.close();
        }
        beforeMount() {
            this.setupContainer();
        }
        mounted() {
            this.showNotice();
            EventBus.$on('toast.clear', this.close);
        }
    }    
</script>

<style lang="scss"></style>