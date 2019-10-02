namespace Models {

    /**Configuration */
    export class Config {
        constructor() {
            this.ConfigName = "";
        }

        public ConfigName: string;
        public ConfigValue?: string;
        public ModifiedBy?: string;
        public ModifiedDate?: string | Date;
        public ConfigStatus?: boolean;
        public ConfigType?: string;
        public Description?: string;
    }

    /**Group */
    export class Group {
        constructor() {
            this.GroupId = 0;
            this.GroupName = "";
            this.GroupTypeId = 0;
            this.IsDeleted = false;

            this.GroupType = new GroupType();
            this.GroupMember = [];
        }

        public GroupId: number;
        public GroupName: string;
        public CreatedBy: string;
        public CreatedDate: string | Date;
        public UpdatedBy: string;
        public UpdatedDate: string | Date;
        public IsDeleted: boolean;
        public GroupTypeId: number;

        public GroupMember: GroupMember[];
        public GroupType: GroupType;
    }

    /**Group Type */
    export class GroupType {
        constructor() {
            this.GroupTypeId = 0;
            this.GroupTypeName = "";
            this.IsDeleted = false;
            this.Group = null;
        }

        public GroupTypeId: number;
        public GroupTypeName: string;
        public CreatedBy?: string;
        public CreatedDate?: string | Date;
        public UpdatedBy?: string;
        public UpdatedDate?: string | Date;
        public IsDeleted: boolean;

        public Group: Group;
    }

    /**Group Member */
    export class GroupMember {
        constructor() {
            this.GroupMemberId = 0;
            this.GroupId = 0;

            this.Group = null;
        }

        public GroupMemberId: number;
        public GroupId: number;
        public NtUserName?: string;
        public FullName?: string;
        public Email?: string;
        public CreatedBy?: string;
        public CreatedDate?: string | Date;
        public UpdateBy?: string;
        public UpdateDate?: string | Date;
        public IsDeleted: boolean;

        public Group?: Group;
    }

    /** Extends the Group Member class */
    export class GrpMember extends GroupMember {
        constructor() {
            super();

            /** determine if the group member is new or already existing */
            this.IsNew = false;
        }

        public IsNew: boolean;
    }
}