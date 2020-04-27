import Avatar from "../components/Avatar"

export default {
    name: "nav-profile",
    components: {
        Avatar
    },
    template: `<li class='dropdown user'> <a class='dropdown-toggle' data-toggle='dropdown' href='#'> <i class='fa fa-user'></i> <strong>{{Fullname}}</strong> <avatar round :size="20" :name="Fullname" class="img-rounded"></avatar> <b class='caret'></b> </a> <ul class='dropdown-menu'> <li> <router-link to="/profile">Profile</router-link> </li> <!--<li class='divider'></li> <li> <a href="/">Sign out</a> </li>--> </ul></li>`,
    computed: {
        Fullname() {
            if (this.$store.state.profile.user.Fullname != undefined) {
                return this.$store.state.profile.user.Fullname;
            }
            return "";
        }
    }
} as ComponentOption
