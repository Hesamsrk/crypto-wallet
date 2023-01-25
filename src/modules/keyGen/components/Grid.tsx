import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import {globalUtils} from "../../../utils/global";
import {generatePrivateKey, readFileBase64, savePrivateKey} from "../../../utils/keyGenerator";
import {Dot} from "../../../components/Dot";
import {UIButton} from "../../../components/UIButton";
import {Colors} from "../../../styles/colors";

interface PropTypes {
    imageUri: string
    onSubmit: () => void
}

export const Grid = ({imageUri, onSubmit}: PropTypes) => {
    const [level, setLevel] = useState<number | undefined>(undefined)
    const [pattern, setPattern] = useState<string>("")
    let [boxData, setBoxData] = useState<number[][] | undefined>(undefined)

    useEffect(() => {
        if (level) {
            setBoxData(globalUtils.range(level).map(() => globalUtils.range(level).map(() => 0)))
        }
    }, [level])

    const increment = (i, j) => {
        setPattern(prev => prev + `${i}${j}`)
        setBoxData(prev => prev.map((row, ii) => row.map((item, jj) => (i == ii && j == jj ? item + 1 : item))))
    }

    const submit = async () => {
        let base64Image = undefined;
        try {
            base64Image = await readFileBase64(imageUri)
        } catch (e) {
            alert("Failed to load image!")
        }
        try {
            const PK = await generatePrivateKey({
                base64Image,
                pattern
            })
            await savePrivateKey(PK, true)
            onSubmit()
        } catch (e) {
            alert("Failed to create private key!")
            console.error(e)
        }
    }

    const styles = Styles({level})
    return <>
        <View style={styles.container}>
            <Image source={{uri: imageUri}} style={styles.background}/>
            {
                level && boxData ? globalUtils.range(level).map(i => <View key={i} style={styles.row}>
                    {
                        globalUtils.range(level).map(j => <TouchableOpacity key={j} style={{
                            ...styles.box,
                            backgroundColor: Colors.alpha(Colors.theme.primary, 0.1 * boxData[i][j], "hex")
                        }} onPress={() => increment(i, j)}><Text
                            style={styles.label}>{boxData[i][j]}</Text></TouchableOpacity>)
                    }
                </View>) : <View style={styles.buttons}>
                    {[2, 3, 4, 5].map(label => <Dot style={{margin: 20}} key={label} label={label}
                                                    active={level === label}
                                                    onPress={() => setLevel(label)}/>)}
                </View>
            }
            {
                pattern.length >= 8 && <View style={styles.buttons}>
                    <UIButton style={{flex: 1}} bgColor={"white"} onClick={() => submit()}>Submit</UIButton>
                </View>
            }
        </View>
    </>

};

const Styles = (arg: { level: number }) => StyleSheet.create<{
    container: ViewStyle
    row: ViewStyle
    box: ViewStyle
    active: ViewStyle
    background: ImageStyle
    label: TextStyle
    buttons: ViewStyle
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
