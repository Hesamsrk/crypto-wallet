import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import {Tools} from "../../../utils/tools";
import {Theme} from "../../../styles/theme";

interface PropTypes {
    imageUri: string
    onPatternChange: (pattern:string) => void
    dimension: number
}

export const Grid = ({imageUri, onPatternChange, dimension}: PropTypes) => {
    const [pattern, setPattern] = useState<string>("")
    let [boxData, setBoxData] = useState<number[][] | undefined>([])


    useEffect(() => {
        setBoxData(Tools.range(dimension).map(() => Tools.range(dimension).map(() => 0)))
        setPattern("")
    }, [dimension])

    useEffect(()=>{
        onPatternChange(pattern)
    },[pattern])

    const updatePattern = (i, j) => {
        setPattern(prev => prev + `${i}${j}`)
        setBoxData(prev => prev.map((row, ii) => row.map((item, jj) => (i == ii && j == jj ? item + 1 : item))))
    }



    const styles = Styles({dimension})


    return <>
        <View style={styles.container}>
            <Image source={{uri: imageUri}} style={styles.background}/>
            {
                boxData.length === dimension ? Tools.range(dimension).map(i => <View key={i} style={styles.row}>
                    {
                        Tools.range(dimension).map(j => <TouchableOpacity key={j} style={{
                            ...styles.box,
                            backgroundColor: Theme.alpha(Theme.colors.Accent1, 0.1 * boxData[i][j], "hex")
                        }} onPress={() => updatePattern(i, j)}><Text
                            style={styles.label}>{boxData[i][j]}</Text></TouchableOpacity>)
                    }
                </View>) : <></>
            }
        </View>
    </>

};

const Styles = (arg: { dimension: number }) => StyleSheet.create<{
    container: ViewStyle
    row: ViewStyle
    box: ViewStyle
    active: ViewStyle
    background: ImageStyle
    label: TextStyle
    buttons: ViewStyle
}>({
    container: {
        flex: 1,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "black",
    },
    row: {
        flex: arg.dimension,
        flexDirection: "row",
    },
    box: {
        flex: arg.dimension,
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
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
})
