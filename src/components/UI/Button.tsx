import React from "react";
import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle} from "react-native";
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
    const containerStyles = [styles.container, {
        backgroundColor: props.color || Theme.colors.Accent2,
        width: props.width
    }, (props.disabled ? {opacity: 0.5} : {}), props.style]
    const Wrapper = ({children}) => (props.disabled ? <View style={containerStyles}>{children}</View> :
        <TouchableOpacity style={containerStyles} onPress={props.onClick}>{children}</TouchableOpacity>)

    return <Wrapper>
        {
            props.label ? <Text
                style={[styles.title, {color: props.labelColor || Theme.colors.Text.Light}, props.labelStyle]}>{props.label}</Text> : props.children
        }
    </Wrapper>
}


const styles = StyleSheet.create<{
    title: TextStyle
    container: ViewStyle
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
})
