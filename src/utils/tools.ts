const range = (n: number) => Array.from(Array(n).keys())

const formatNumber = (number: number, precision: number,display?:boolean): string => {
    const parts = number.toFixed(precision).split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    const res = numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "")
    return display===false?res.replace(/[0-9]/ig,"*"):res;
}

export const Tools = {
    range,
    formatNumber
}

