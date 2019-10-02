declare namespace App {
    export interface IPicker {
        id: string;
        selection: IPickerSelection;
    }

    export interface IPickerSelection {
        text: string;
        value: number | string;
        disabled?: boolean;
        title?: string;
        selected?: boolean;
    }

    export interface IMediaDocument {
        definition?: string;
        href?: string;
        links?: string;
        name?: string;
        properties?: IMediaProperty;
        type?: string;
    }

    export interface IMediaProperty {
        a_content_type?: string;
        acl_domain?: string;
        acl_name?: string;
        batch_no?: string;
        deleter?: string;
        fileid?: number;
        group_name?: string;
        group_permit?: number;
        is_deleted?: number;
        is_item_datafile?: boolean;
        language_code?: string;
        letternumber?: string;
        log_entry?: string;
        object_name?: string;
        owner_name?: string;
        owner_permit?: string;
        r_content_size?: string;
        r_creation_date?: string;
        r_modify_date?: string;
        r_object_id?: string;
        r_object_type?: string;
        requestnumber?: string;
        resolution_label?: string;
        subject?: string;
        title?: string;
        uploader?: string;
        world_permit?: number;
    }

    export interface IApiResult {
        success: boolean;
        message: string | { ErrorMessage: string, Exception: string }[];
    }
}