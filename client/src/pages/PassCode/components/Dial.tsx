import {StyleSheet, View, ViewStyle} from "react-native"
import {Theme} from "../../../styles/theme";

interface PropTypes {
    length: number
}

export const Dial = ({length}: PropTypes) => {
    let dots: JSX.Element[] = []
    for (let i = 0; i < 8; i++) {
        let active = i<length
        dots.push(<View style={[styles.Dot, (active ? styles.Active : {})]} key={i}/>)
    }
    return <View style={styles.Container}>
        {dots}
    </View>
}


const styles = StyleSheet.create<{
    Container: ViewStyle
    Dot: ViewStyle
    Active: ViewStyle
}>({
    Active: {
        backgroundColor: Theme.colors.Primary600
    },
    Container: {
        backgroundColor: Theme.colors.Gray600,
        width:200,
        height:50,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20,
        borderRadius:30
    },
    Dot: {
        backgroundColor:Theme.colors.Gray500,
        height:12,
        width:12,
        borderRadius:50
    }
})