import React, {useState} from 'react';
import {Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import {globalUtils} from "../../../utils/global";
import {UIComponent} from "../../../types/global";

interface PropTypes {
    level: number
    backgroundURL: string
    onPatternMove: (pass:string)=>void
}

export const Grid = ({level, backgroundURL,style,children,onPatternMove}: UIComponent<PropTypes>) => {
    const levels = globalUtils.range(level)
    let [boxData, setBoxData] = useState<number[][]>(levels.map(() => levels.map(() => 0)))

    const increment = (i, j) => {
        onPatternMove(`${i}${j}`)
        setBoxData(prev => prev.map((row, ii) => row.map((item, jj) => (i == ii && j == jj ? item + 1 : item))))
    }

    const styles = Styles({level})
    return <View style={{...styles.container,...style}}>
        <Image source={{uri: backgroundURL}} style={styles.background}/>
        {levels.map(i => <View key={i} style={styles.row}>
            {
                levels.map(j => <TouchableOpacity key={j} style={{
                    ...styles.box,
                    backgroundColor: `rgba(255,183,0,${0.1 * boxData[i][j]})`
                }} onPress={() => increment(i,j)}><Text style={styles.label}>{boxData[i][j]}</Text></TouchableOpacity>)
            }
        </View>)
        }
        {children}
    </View>
};

const Styles = (arg: { level: number }) => StyleSheet.create<{
    container: ViewStyle
    row: ViewStyle
    box: ViewStyle
    active: ViewStyle
    background: ImageStyle
    label: TextStyle
}>({
    container: {
        flex: 1
    },
    row: {
        flex: arg.level,
        flexDirection: "row",
    },
    box: {
        flex: arg.level,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundColor: "yellow"
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    label: {
        color: "white",
        fontSize: 40
    }
})
