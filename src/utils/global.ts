const range = (n: number) => Array.from(Array(n).keys())

const formatNumber = (number: number,precision:number):string => {
    return number.toLocaleString(undefined, { minimumFractionDigits: precision,maximumFractionDigits:precision })
}

export const Util = {
    range,
    formatNumber
}

