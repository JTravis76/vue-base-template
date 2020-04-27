
export default {
    name: "main-sidebar",
    components: {},
    template: `<section id='sidebar'> <button type="button" class="btn btn-xs btn-link" @click="ToggleSidebar"><i class='fa fa-align-justify icon-large' id='toggle'></i></button> <ul id='dock'> <router-link tag="li" to="/dashboard" class="launcher"> <i class="fa fa-dashboard"></i> <a><span>Dashboard</span></a> </router-link> <template v-if="$UserInRole('Admin')"> <li class="launcher dropdown"> <i class='fa fa-circle-o'></i> <a href='#' data-toggle="dropdown" class="dropdown-toggle">Admin</a> <ul class='dropdown-menu'> <li class='dropdown-header'>Administrative</li> <li> <router-link to="/grouptypes">Group Types</router-link> </li> <li> <router-link to="/emailgroups">Email Groups</router-link> </li> <li class="divider"></li> </ul> </li> </template> <template v-if="$UserInRole('NCManager')"> <router-link tag="li" to="/ncmanager" class="launcher"> <i class="fa fa-users"></i> <a><span>NC Manager</span></a> </router-link> </template> <router-link tag="li" to="/about" class="launcher"> <i class="fa fa-question"></i> <a><span>About</span></a> </router-link> </ul> <div data-toggle='tooltip' id='beaker' title='Made by lab2023'></div> </section>`,
    data() {
        return {}
    },
    methods: {
        ToggleSidebar() {
            let lis = document.querySelectorAll("li.launcher") as NodeListOf<HTMLLIElement>;
            for (let l = 0; l < lis.length; l++) {
                let li = lis[l] as HTMLLIElement;

                let i = li.firstElementChild as HTMLElement;
                if (i != null)
                    i.style.display = i.style.display == "none" ? "" : "none";
            }
        }
    },
    updated() {
        BSN.initCallback();
    }
} as ComponentOption
