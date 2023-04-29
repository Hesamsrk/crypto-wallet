import {StyleSheet, Text, View, ViewProps} from "react-native";
import {Typography} from "../../styles/typography";
import {Theme} from "../../styles/theme";
import {useState} from "react";
import {ButtonBase} from "./ButtonBase";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

interface PropTypes {
    label?: string
    onChange?: (value: number) => void
    minimum?: number
    maximum?: number
}

export const Counter = (props: ViewProps & PropTypes) => {
    const [value, setValue] = useState<number>(0)

    const changeValue = (change: number) => {
        const newValue = value + change
        if ((props.minimum !== undefined && (newValue < props.minimum)) || (props.maximum !== undefined && (newValue > props.maximum))) {
            return
        }
        props.onChange && props.onChange(newValue)
        setValue(newValue)
    }

    return (
        <View style={styles.container}>
            {props.label && <Text style={styles.label}>{props.label}:</Text>}
            <View style={styles.body}>
                <ButtonBase style={styles.change} onClick={() => changeValue(-1)}><FontAwesomeIcon size={20}
                                                                                                   color={Theme.colors.Gray500}
                                                                                                   icon={faMinus}/></ButtonBase>
                <View style={styles.value}><Text style={styles.valueText}>{String(value)}</Text></View>
                <ButtonBase style={styles.change} onClick={() => changeValue(+1)}><FontAwesomeIcon size={20}
                                                                                                   color={Theme.colors.Gray500}
                                                                                                   icon={faPlus}/></ButtonBase>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        padding: 5,
        borderRadius: 10
    },
    label: Typography.create({
        fontSize: 15,
        marginRight: 5,
        color: Theme.colors.Primary500
    }),
    body: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Theme.colors.Primary500,
        padding: 5,
        borderRadius: 20
    },
    change: {
        borderRadius: 10,
        backgroundColor: Theme.colors.Primary400
    },
    value: {
        marginHorizontal: 5
    },
    valueText: Typography.create({
        fontSize: 15,
        color: Theme.colors.Gray500
    })
})
