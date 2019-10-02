export const ProgressBar: ComponentOption = {
    name: "progress-bar",
    template: `<div> <button type="button" v-on:click="StartProgress" class="btn" v-bind:class="[now == max ? 'btn-success' : 'btn-primary']"><span class="fa fa-building"></span> Start Progress</button><br /><br /> <div class="progress"> <div class="progress-bar bg-info progress-bar-striped" role="progressbar" v-bind:aria-valuenow="now" v-bind:aria-valuemin="min" v-bind:aria-valuemax="max" v-bind:style="{ width: percentage + '%' }"></div> </div> </div>`,
    data: function() {
        return {
            now: 0,
            min: 0,
            max: 255,
            percentage: 0
        }
    },
    methods: {
        StartProgress() {
            let _self = this;
            let timerId = window.setInterval(function () {
                if (_self.now < _self.max) {
                    _self.percentage = ((_self.now + 1) / _self.max) * 100;

                    //Do some work or ajax call

                    _self.now += 1;
                } else {
                    window.clearInterval(timerId);
                }

            }, 100);
        }
    }
}