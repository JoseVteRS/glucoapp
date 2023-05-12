import { Control, IData } from "@/interfaces/control.interface";


export function toControl(data: IData[]): Control[] {
    return data.map((item) => {
        return {
            id: item.id,
            date: new Date(item.date).toISOString(),
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