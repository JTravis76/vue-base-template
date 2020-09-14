/**Configuration */
export class Config {
    constructor() {
        this.configName = "";
        this.configStatus = null;
        this.configValue = null;
        this.description = null;
        this.modifiedBy = null;
        this.modifiedDate = null;
        this.configType = null;
    }
    configName: string;
    configValue?: string;
    modifiedBy?: string;
    modifiedDate?: string | Date;
    configStatus?: string;
    description?: string;
    configType?: string;
}
/**Email Group */
export class Group {
    constructor() {
        this.id = 0;
        this.name = "";
        this.createdBy = null;
        this.createdDate = null;
        this.modifiedBy = null;
        this.modifiedDate = null;
        this.isDeleted = false;
        this.groupMember = [];
    }
    id: number;
    name: string;
    createdBy?: string;
    createdDate?: string | Date;
    modifiedBy?: string;
    modifiedDate?: string | Date;
    isDeleted: boolean;

    groupMember: any[];
}
/**Group Member */
export class GroupMember {
    constructor() {
        this.groupId = 0;
        this.userName = "";
        this.fullName = null;
        this.email = null;
        this.group = {} as Group;
    }
    groupId: number;
    userName: string;
    fullName?: string;
    email?: string;

    group?: Group;
}
/**Extend the GroupMember */
export class GrpMember extends GroupMember {
    constructor() {
        super();

        this.isNew = false;
    }
    isNew: boolean;
}
/**Online User */
export class OnlineUser {
    constructor() {
        this.fullName = null;
        this.userName = null;
        this.startTime = null;
        this.endTime = null;
    }
    fullName?: string;
    userName?: string;
    startTime?: number;
    endTime?: number;
}