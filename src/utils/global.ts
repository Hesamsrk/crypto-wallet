const range = (n: number) => Array.from(Array(n).keys())

const formatNumber = (number: number, precision: number): string => {
    const parts = number.toFixed(precision).split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

export const Util = {
    range,
    formatNumber
}

