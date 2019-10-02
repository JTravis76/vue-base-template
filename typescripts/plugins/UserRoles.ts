import store from "../store/index"

export default {
    install(vue, name = "$UserInRole") {
        //Search list of roles
        const UserInRole = function (role: string[] | string): boolean {

            if (Array.isArray(role)) {
                for (let i = 0; i < role.length; i++) {
                    for (let r = 0; r < store.state.profile.roles.length; r++) {
                        if (store.state.profile.roles[r] == role[i])
                            return true;
                    }
                }
            }
            else {
                for (let r = 0; r < store.state.profile.roles.length; r++) {
                    if (store.state.profile.roles[r] == role)
                        return true;
                }
            }

            return false;
        };
      
        Object.defineProperty(vue.prototype, name, { value: UserInRole });
    }
}