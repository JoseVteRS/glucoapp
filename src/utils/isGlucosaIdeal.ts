import { Control, GlucoseData } from "@/interfaces/control.interface";
import { isNumberBetween } from "./isNumberBetween";

export const isGlucoseIdeal = (glucoseData: GlucoseData): boolean => {
    switch (glucoseData.moment) {
        case "FASTING":
            return isNumberBetween({ num: Number(glucoseData.value), lower: 70.9, upper: 93 })
        // return Number(glucoseData.value) < 93;
        case "ONE_HOUR_AFTER_BREAKFAST":
        case "ONE_HOUR_AFTER_LUNCH":
        case "ONE_HOUR_AFTER_DINNER":
            return isNumberBetween({ num: Number(glucoseData.value), lower: 109, upper: 130 });
        default:
            return false;
    }
};


export function formatData(data: Control[]): GlucoseData[] {
    const glucoseData: GlucoseData[] = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const glucoseLevel = item.value;

        glucoseData.push({
            id: item.id,
            value: glucoseLevel,
            date: new Date(item.date).toString(),
            moment: item.moment as "FASTING"
                | "ONE_HOUR_AFTER_BREAKFAST"
                | "ONE_HOUR_BEFORE_LUNCH"
                | "ONE_HOUR_AFTER_LUNCH"
                | "ONE_HOUR_BEFORE_DINNER"
                | "ONE_HOUR_AFTER_DINNER"
        });
    }

    return glucoseData;
}

