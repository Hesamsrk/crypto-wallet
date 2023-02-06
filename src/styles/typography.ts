import {TextStyle} from "react-native";
import {Theme} from "./theme";


const defaultTypography: TextStyle = {
    fontFamily: "Sansation-regular",
    color: Theme.colors.Text.Dark,
}

const create = (style: TextStyle, options?: { bold: boolean, italic: boolean }): TextStyle => {
    let res = {
        ...defaultTypography,
        ...style
    }

    if (options) {
        if (options.bold && options.italic) {
            res = {...res, fontFamily: "Sansation-bold-italic"}
        } else if (options.bold) {
            res = {...res, fontFamily: "Sansation-bold"}
        } else if (options.italic) {
            res = {...res, fontFamily: "Sansation-italic"}
        }
    }

    return res
}


const global = {
    PassCodeText:create({
        fontSize: 12,
        lineHeight:15,
        textAlign:"center",
        color:Theme.colors.Primary600
    })
}


export const Typography = {
    create,
    global,
}