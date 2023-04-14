import React from "react";
import {TouchableOpacity, ViewProps} from "react-native";

interface PropTypes {
    onClick?: () => void,
}

export const ButtonBase = (props: ViewProps & PropTypes) =>
    <TouchableOpacity style={props.style} onPress={props.onClick}>{props.children}</TouchableOpacity>;


