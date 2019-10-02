export default {
    namespaced: true,
    state: {
        user: {},
        roles: new Array<string>(),
        info: {Title: null, Bio: null}
    },
    mutations: {
        User(state: Mutations, payload: Netcenter.IUserDto) {
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

interface Mutations {
    user: Netcenter.IUserDto;
    roles: string[];
    info: { Title?: string, Bio?: string }
}