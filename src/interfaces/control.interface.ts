export interface Control {
    id: string;
    date: string;
    details: any[];
    value: string;
    moment: "FASTING"
    | "ONE_HOUR_AFTER_BREAKFAST"
    | "ONE_HOUR_BEFORE_LUNCH"
    | "ONE_HOUR_AFTER_LUNCH"
    | "ONE_HOUR_BEFORE_DINNER"
    | "ONE_HOUR_AFTER_DINNER";
}

export interface IData {
    id: string;
    date: string;
    details: any[];
    value: string;
    moment: string;
}

export interface ControlByDate {
    date: string;
    values: Control[];
}


export type GlucoseData = {
    id: string;
    value: string;
    date: string;
    moment: "FASTING"
    | "ONE_HOUR_AFTER_BREAKFAST"
    | "ONE_HOUR_BEFORE_LUNCH"
    | "ONE_HOUR_AFTER_LUNCH"
    | "ONE_HOUR_BEFORE_DINNER"
    | "ONE_HOUR_AFTER_DINNER"
};