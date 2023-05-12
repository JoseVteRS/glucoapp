import { Control, ControlByDate } from "@/interfaces/control.interface";



export function groupDataByDate(data: Control[]): ControlByDate[] {
    return data.reduce((result: ControlByDate[], currentValue: Control) => {
        const date = new Date(currentValue.date).toISOString().substr(0, 10);
        const index = result.findIndex((item) => item.date === date);
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