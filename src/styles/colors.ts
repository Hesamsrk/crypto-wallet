const theme = {
    primary: "#ffb700",
    background: "#090913"
}

interface RGB {
    r: number,
    g: number,
    b: number
}

const hexToRGB = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : undefined;
}

const rgbToRGB = (rgb: string): RGB => {
    let result = /^rgb\(?([0-9,.]+),([0-9,.]+),([0-9,.]+)\)$/i.exec(rgb)
    return result ? {
        r: parseInt(result[1]),
        g: parseInt(result[2]),
        b: parseInt(result[3])
    } : undefined;
}

const alpha = (color: string, alpha: number, type: "rgb" | "hex") => {
    let {r, g, b} = type === "hex" ? hexToRGB(color) : rgbToRGB(color)
    return `rgba(${r},${g},${b},${alpha})`
}


export const Colors = {
    theme,
    alpha
}