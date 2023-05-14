import { Control, ControlData, IData } from "@/interfaces/control.interface";

//TODO: Revisar IData[]
export function toControl(data: ControlData[]) {
    return data.map((item: ControlData) => {

        return {
            id: item.id,
            date: item.date,
            value: item.value,
            details: "",
            moment: item.moment as "FASTING"
                | "ONE_HOUR_AFTER_BREAKFAST"
                | "ONE_HOUR_BEFORE_LUNCH"
                | "ONE_HOUR_AFTER_LUNCH"
                | "ONE_HOUR_BEFORE_DINNER"
                | "ONE_HOUR_AFTER_DINNER",
            
        };
    });
}