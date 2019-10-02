declare namespace Netcenter {

    export interface IAppDto {
        id: number;
        name: string;
        ownerUserId?: number;
        createdBy?: string;
        createdTime?: string;
        updatedBy?: string;
        updatedTime?: string;
        deletedBy?: string;
        deletedTime?: string;
        deleteMark: number;
        uri?: string;
        appRoles: IAppRoleDto[];
    }

    export interface IAppRoleDto {
        id: number;
        appId: number;
        name?: string;
        createdBy?: string;
        createdTime?: string;
        updatedBy?: string;
        updatedTime?: string;
        deletedBy?: string;
        deletedTime?: string;
        deleteMark?: string;
        description?: string;
        appRoleUserCount?: number;
        appRoleUsers?: IAppRoleUserDto[];
    }

    export interface IAppRoleUserDto {
        id: number;
        appRoleId: number;
        username?: string;
        email?: string;
        createdBy?: string;
        createdTime?: string;
        updatedBy?: string;
        updatedTime?: string;
        deletedBy?: string;
        deletedTime?: string;
        deleteMark?: number;
        user: IUserDto;
    }


    export interface IUserDto {
        id: number;
        ntUsername?: string;
        fullname?: string;
        email?: string;
        ntDescription?: string;
        adsCreateDate?: string;
        passwordLastSet?: string;
        noLongerExists?: number;
        disabled?: number;
        deleteMark?: number;
        manuallyAdded?: number;
        badge ?: string;
        phone?: string;
        userApps?: IAppDto;
    }

    export interface UserEmailRoleDto {
        id: number;
        email?: string;
        username?: string;
    }
}