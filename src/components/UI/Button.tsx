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
    labelStyle?:TextStyle
}

export const Button = (props: ViewProps & PropTypes) =>
    <TouchableOpacity style={[styles.container,{backgroundColor:props.color || Theme.colors.Accent2,width:props.width}, props.style]}
                      onPress={props.onClick}>
        {
            props.label ? <Text style={[styles.title,{color:props.labelColor || Theme.colors.Text.Light},props.labelStyle]}>{props.label}</Text> : props.children
        }
    </TouchableOpacity>;


const styles = StyleSheet.create<{
    title: TextStyle
    container: ViewStyle
}>({
    container: {
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
