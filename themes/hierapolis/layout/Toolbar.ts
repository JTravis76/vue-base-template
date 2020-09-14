import { ComponentOptions } from "vue";

export default {
    name: "tool-bar",
    components: {},
    template: `<div> <div class='btn-group'> <a class='btn btn-default' data-toggle='toolbar-tooltip' href='#' title='Building'> <i class='fa fa-building-o'></i> </a> <a class='btn btn-default' data-toggle='toolbar-tooltip' href='#' title='Laptop'> <i class='fa fa-laptop'></i> </a> <a class='btn btn-default' data-toggle='toolbar-tooltip' href='#' title='Calendar'> <i class='fa fa-calendar'></i> <span class='badge'>3</span> </a> <a class='btn btn-default' data-toggle='toolbar-tooltip' href='#' title='Lemon'> <i class='fa fa-lemon-o'></i> </a> </div> <div class='label label-danger'> Danger</div><div class='label label-info'> Info</div></div>`,
    data() {
        return {}
    }
} as ComponentOptions<any>
