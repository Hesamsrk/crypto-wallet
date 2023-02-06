import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle} from "react-native";
import {Theme} from "../../../styles/theme";
import {Typography} from "../../../styles/typography";


interface PropTypes {
    onClick: () => void
    content: number | string | JSX.Element
    onLongClick?:()=>void
}

export const NumButton = (props: ViewProps & PropTypes) => {
    return <View style={[styles.buttonContainer, props.style]}><TouchableOpacity onLongPress={props.onLongClick} style={styles.innerButtonContainer}
                                                                                 onPress={props.onClick}>
        {typeof props.content === "object" ? <>{props.content}</> :
            <Text style={styles.buttonText}>{props.content}</Text>}
    </TouchableOpacity></View>
}


const styles = StyleSheet.create<{
    buttonText: TextStyle
    buttonContainer: ViewStyle
    innerButtonContainer: ViewStyle
}>({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        padding: 10
    },
    innerButtonContainer: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Theme.colors.Gray600,
        borderRadius: 300
    },
    buttonText: Typography.create({
        fontSize: 45,
        color: Theme.colors.Gray500,
    })
})