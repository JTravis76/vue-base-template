import { StoreOptions } from "vuex";

export default {
    namespaced: true,
    state: {
        user: {},
        roles: new Array<string>(),
        info: { Title: null, Bio: null }
    },
    mutations: {
        User(state: Mutations, payload: Mutations["user"]) {
            state.user = payload;
        },
        Role(state: Mutations, payload: string[]) {
            state.roles = payload;
        },
        Info(state: Mutations, payload: Mutations["info"]) {
            state.info.Bio = payload.Bio;
            state.info.Title = payload.Title;
        }
    }
} as StoreOptions<any>

export interface IProfileState {
    /** User's Netcenter profile */
    readonly user: any;
    /** List of roles for the user */
    readonly roles: string[];
    /** Customable user infomation. NtUsername will be over-written */
    info: { Title?: string, Bio?: string, Username?: string }
}

interface Mutations {
    user: IProfileState["user"];
    roles: IProfileState["roles"];
    info: IProfileState["info"]
}