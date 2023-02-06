import React from "react";
import {StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {UIComponent} from "../../types/global";
import {Theme} from "../../styles/theme";

interface PropTypes {
    bgColor?: string
    width?: number | string
    onClick?: () => void
}

export const UIButton = ({onClick, bgColor, children, width, style}: UIComponent<PropTypes>) => {
    const styles = Styles({bg: bgColor || Theme.colors.Accent2, width})
    return <TouchableOpacity style={{...style, ...styles.container}} onPress={onClick}>
        <Text style={styles.title}>{children || ""}</Text>
    </TouchableOpacity>
};


const Styles = (args: { bg?: string, width?: number | string }) => StyleSheet.create<{
    title: TextStyle
    container: ViewStyle
}>({
    container: {
        backgroundColor: args.bg,
        width: args.width,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 8,
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        color: "black"
    },
})
