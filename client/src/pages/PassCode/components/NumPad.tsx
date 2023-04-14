import {StyleSheet, View, ViewStyle} from "react-native";
import {NumButton} from "./NumButton";
import {Theme} from "../../../styles/theme";
import {faFingerprint,faDeleteLeft} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


interface PropTypes {
    onClick: (ClickType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "biometric" | "clear" | "clearAll") => void
}

export const Numpad = ({onClick}: PropTypes) => {

    return <View style={styles.container}>
        <View style={styles.containerInner}>
            {/*Row-1*/}
            <View style={styles.row}>
                <NumButton content={1} onClick={() => onClick(1)}/>
                <NumButton content={2} onClick={() => onClick(2)}/>
                <NumButton content={3} onClick={() => onClick(3)}/>
            </View>
            {/*Row-2*/}
            <View style={styles.row}>
                <NumButton content={4} onClick={() => onClick(4)}/>
                <NumButton content={5} onClick={() => onClick(5)}/>
                <NumButton content={6} onClick={() => onClick(6)}/>
            </View>
            {/*Row-3*/}
            <View style={styles.row}>
                <NumButton content={7} onClick={() => onClick(7)}/>
                <NumButton content={8} onClick={() => onClick(8)}/>
                <NumButton content={9} onClick={() => onClick(9)}/>
            </View>
            {/*Row-4*/}
            <View style={styles.row}>
                <NumButton content={<FontAwesomeIcon size={35} color={Theme.colors.Gray500} icon={faFingerprint}/>}
                           onClick={() => onClick("biometric")}/>
                <NumButton content={0} onClick={() => onClick(0)}/>
                <NumButton content={<FontAwesomeIcon size={35} color={Theme.colors.Gray500} icon={faDeleteLeft}/>}
                           onClick={() => onClick("clear")} onLongClick={()=>onClick("clearAll")}/>
            </View>
        </View>
    </View>
}


const styles = StyleSheet.create<{
    container: ViewStyle,
    containerInner: ViewStyle,
    row: ViewStyle,
}>({
    container: {
        backgroundColor: Theme.colors.Gray500,
        width: "100%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        paddingVertical: 20
    },
    containerInner: {
        height: "100%",
        width: undefined,
        aspectRatio: 3 / 4
    },
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
    }
})