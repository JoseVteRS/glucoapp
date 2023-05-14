import { Control, ControlByDate } from "@/interfaces/control.interface";



export function groupDataByDate(data: any) {

    if(!data) return [];

    return data.reduce((result: any, currentValue: Control) => {



        const date = new Date(currentValue.date).toISOString().slice(0, 10);
        const index = result.findIndex((item: any) => item.date === date);
        if (index >= 0) {
            result[index].values.push(currentValue);
        } else {
            result.push({
                date: date,
                values: [currentValue]
            });
        }
        return result;
    }, []);
}