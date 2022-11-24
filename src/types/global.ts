import {ViewStyle} from "react-native";
import React from "react";

export type UIComponent<T> = React.PropsWithChildren<T & {style?:ViewStyle}>