import React from "react";
import {TouchableOpacity, ViewProps} from "react-native";

interface PropTypes {
    onClick?: () => void,
    disabled?: boolean
}

export const ButtonBase = (props: ViewProps & PropTypes) =>
    <TouchableOpacity style={props.style} onPress={props.disabled===true?()=>{}:props.onClick} disabled={props.disabled}>{props.children}</TouchableOpacity>;


