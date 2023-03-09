import {StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle} from "react-native";
import {Typography} from "../../styles/typography";
import {Theme} from "../../styles/theme";
import {ButtonBase} from "./ButtonBase";

interface PropTypes {
    selected: boolean
    color?: string
    label?: string
    labelColor?: string
    onSelect?:()=>void
}


export const RadioButton = (props: ViewProps & PropTypes) => {
    return (
        <ButtonBase style={[styles.container, props.style]} onClick={()=>props.onSelect()}>
            <View style={[styles.outerCircle, {borderColor: props.color || Theme.colors.Text.Light}]}>
                {
                    props.selected ?
                        <View style={[styles.innerCircle, {backgroundColor: props.color || Theme.colors.Text.Light}]}/>
                        : null
                }
            </View>
            {props.label && <Text style={[styles.label, {color: props.labelColor || Theme.colors.Text.Light}]}>{props.label}</Text>}
        </ButtonBase>
    );
}

const styles = StyleSheet.create<{
    outerCircle: ViewStyle
    innerCircle: ViewStyle
    container: ViewStyle
    label: TextStyle
}>({
    container: {},
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
    },
    label: Typography.create({
        fontSize: 8,
        marginVertical:5,
        width:"100%",
        textAlign:"center"
    })
})
