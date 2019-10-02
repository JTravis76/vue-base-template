declare namespace Models {
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
}