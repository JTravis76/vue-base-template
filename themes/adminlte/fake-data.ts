import { StoreOptions } from "vuex";
import { Config, Group, OnlineUser } from "../../models";

export default {
    namespaced: true,
    state: {
        user: { Id: 1, Fullname: "Smith, Joe", AdsCreateDate: "2010-02-01", Email: "joe.smith@domain.com", Badge: "998877", Phone: "555-123-4567", NtUsername: "jsmith" },
        roles: ["Admin", "NCManager"],
        info: { Title: "Software Developer", Bio: "I love to write programs!!" },
        settings: { page: 1, pagecount: 1, configs:[
            { configName: "ArrayOption", configValue: '["Value1","Value2"]', modifiedBy: "j.smith", modifiedDate: "2020-09-10", configStatus: null, description: "Sample array type", configType: "Array" },
            { configName: "FlagType", configValue: "n/a", modifiedBy: "j.smith", modifiedDate: "2020-09-10", configStatus: true, description: "Switchable feature flag, value field is ignored", configType: "Feature" },
            { configName: "ObjectType", configValue: '[{"Name":"key","Value":"pair"}]', modifiedBy: "j.smith", modifiedDate: "2020-09-10", configStatus: null, description: "Sample object type", configType: "Object" },
            { configName: "StringOption", configValue: "Some Changeable Value", modifiedBy: "j.smith", modifiedDate: "2020-09-10", configStatus: null, description: "Sample string type", configType: null },
            { configName: "SwitchableStringOption", configValue: "Some Changeable Value", modifiedBy: "j.smith", modifiedDate: "2020-09-10", configStatus: false, description: "Sample switchable string type", configType: null }
        ]},
        emailGroups: { page: 1, pagecount: 1, groups: [
            { id: 1, name: "Group1", groupMember: [
                { groupId: 1, userName: "j.smith", fullName: "Smith, Joe", email: "joe.smith@domain.com" }
            ]}
        ]},
        addressBook: { totalPages: 1, resultCount: 1, users: [{ fullname: "Travis, Jeremy", email: "jeremy.travis@domain.com", ntUsername: "j.travis"}] },
        onlineUsers: [
            { fullName: "Smith, Joe", userName: "j.smith", startTime: new Date().setMinutes(-1), endTime: new Date().getTime() },
            { fullName: "Travis, Jeremy", userName: "j.travis", startTime: 1599767584071, endTime: 1599767944071 }
        ]
    },

} as StoreOptions<any>

export interface IFakeDataState {
    /** User's Netcenter profile */
    readonly user: any;
    /** List of roles for the user */
    readonly roles: string[];
    /** Customable user infomation. NtUsername will be over-written */
    info: { Title?: string, Bio?: string, Username?: string };
    /** Data for the Configuration page */
    settings: { page: number, pagecount: number, configs: Config[] };
    /** Data for the Email Group page */
    emailGroups: { page: number, pagesize: number, groups: Group[] };
    /** Data for the Address Book component */
    addressBook: { users: any, totalPages: number, resultCount: number };
    /** Data for the Who's Online page */
    onlineUsers: OnlineUser[];
}