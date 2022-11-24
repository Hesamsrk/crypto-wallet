import React from 'react';
import {UIComponent} from "../../types/global";
import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";

interface PropTypes{
    active:boolean
    label:string|number
    onPress?:()=>void
}

export const Dot = ({active,style,label,onPress}: UIComponent<PropTypes>) => {
    const styles = Styles({active})
    return <TouchableOpacity style={{...style, ...styles.container}} onPress={()=>onPress && onPress()}>
        <Text style={styles.label}>{label || ""}</Text>
    </TouchableOpacity>
};


const Styles = (args: { active: boolean }) => StyleSheet.create<{
    label: TextStyle
    container: ViewStyle
}>({
    container: {
        width: (args.active?50:30),
        height: (args.active?50:30),
        borderRadius: 50,
        backgroundColor:"white" ,
        justifyContent: "center",
        alignItems: "center",
        borderColor:(args.active?"gray":undefined),
        borderWidth:(args.active?5:undefined)
    },
    label: {
        fontSize: 16,
        textAlign: "center",
        color: "black"
    },
})
