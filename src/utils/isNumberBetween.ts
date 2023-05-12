type Params = {
    num: number;
    lower: number;
    upper: number;
}

export function isNumberBetween({ num, lower, upper }: Params): boolean {
    return num >= lower && num <= upper;
}