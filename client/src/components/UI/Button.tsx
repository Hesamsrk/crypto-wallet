import React, {PropsWithChildren} from "react";
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle} from "react-native";
import {Theme} from "../../styles/theme";
import {Typography} from "../../styles/typography";

interface PropTypes {
    color?: string
    labelColor?: string
    width?: number | string
    onClick?: () => void
    label?: string
    labelStyle?: TextStyle
    children?: JSX.Element
    disabled?: boolean
}

export const Button = (props: ViewProps & PropTypes) => {
    const containerStyles = [styles.container,[props.disabled ? styles.disabled : {}], {
        backgroundColor: props.color || Theme.colors.Accent2,
        width: props.width
    }, props.style]

    return <TouchableOpacity onPress={props.disabled===true?()=>{}:props.onClick} style={containerStyles}>
        {
            props.label ? <Text
                style={[styles.title, {color: props.labelColor || Theme.colors.Text.Light}, props.labelStyle]}>{props.label}</Text> : props.children
        }
    </TouchableOpacity>
}


const styles = StyleSheet.create<{
    title: TextStyle
    container: ViewStyle
    disabled: ViewStyle
}>({
    container:
        {
            paddingVertical: 18,
            paddingHorizontal: 16,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        },
    title: Typography.create({
        fontSize: 20,
        textAlign: "center",
    }),
    disabled: {
        opacity: 0.5
    }
})
