import React from "react";
import {Theme} from "../../styles/theme";
import {Text, TextInput, TextInputProps} from "@react-native-material/core";
import { StyleSheet} from "react-native";
import {Typography} from "../../styles/typography";
import {ButtonBase} from "./ButtonBase";


interface PropTypes {
    endButton?: {
        label: string
        onClick: () => void
    }
}


export const Input = (props: TextInputProps & PropTypes) => {
    return <TextInput variant={"filled"} color={Theme.colors.Gray600}
                      leadingContainerStyle={styles.end} trailingContainerStyle={styles.end}
                      cursorColor={Theme.colors.Gray600}
                      trailing={props.endButton?<ButtonBase onClick={props.endButton.onClick}><Text style={styles.endButton}>{props.endButton.label}</Text></ButtonBase>:undefined}
                      inputStyle={styles.input} selectionColor={Theme.colors.Black}
                      inputContainerStyle={styles.inputContainer} {...props}/>
};
export const styles = StyleSheet.create({
    input: Typography.create({
            fontSize: 16,
            color: Theme.colors.Gray600,
        }
    ),
    inputContainer: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    end: {
        width: 50,
    },
    endButton: Typography.create({
            fontFamily: "Sansation-bold",
            color: Theme.colors.Primary400
        }
    )
});

