import {Alert, Dimensions, StatusBar, StyleSheet, Text, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {useCallback, useEffect, useState} from "react";
import {Page} from "../../components/layout/Page";
import {Theme} from "../../styles/theme";
import {Button} from "../../components/UI/Button";
import {RadioButton} from "../../components/UI/RadioButton";
import {Grid} from "./components/Grid";
import {generatePrivateKey, readFileBase64, savePrivateKey} from "../../modules/hdwallet/key";
import {Configs} from "../../config";
import {Typography} from "../../styles/typography";


export const ImportWallet = Page(
    ({navigation}) => {
        const [imageUri, setImageUri] = useState<string | undefined>(undefined);
        const [gridDimension, setGridDimension] = useState<number>(3)
        const [pattern, setPattern] = useState<string>("")
        useEffect(() => {
            pickImage().then(result => {
                if (result.canceled) {
                    navigation.goBack()
                } else {
                    setImageUri(result.assets[0].uri)
                }
            })
        }, [])

        const pickImage = useCallback(async () => ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: false,
            allowsEditing: false,
        }), []);
        const submit = useCallback(async (pattern: string) => {

                if (pattern.length < 2 * Configs.MINIMUM_PATTERN_LENGTH) {
                    Alert.alert("Try again!","Pattern should be longer.")
                    return
                }

                let base64Image = undefined;
                try {
                    base64Image = await readFileBase64(imageUri)
                } catch (e) {
                    console.log(e)
                    Alert.alert("Try again!","Failed to load the provided image.")
                    return
                }
                try {
                    const PK = await generatePrivateKey({
                        base64Image,
                        pattern
                    })
                    await savePrivateKey(PK, true)
                } catch (e) {
                    Alert.alert("Try again!","Failed to create the private key.")
                    console.log(e)
                }
            }
            , [imageUri,pattern])

        return <>
            <View style={styles.gridContainer}>
                <Grid dimension={gridDimension} imageUri={imageUri} onPatternChange={(pattern) => setPattern(pattern)}/>
            </View>
            <Text
                style={Typography.global.subtitleText}>{pattern.length === 0 ?
                `Select at least ${Configs.MINIMUM_PATTERN_LENGTH} boxes ( You can select each more than once )` : pattern.length<Configs.MINIMUM_PATTERN_LENGTH*2 ?
                `Select at least ${Configs.MINIMUM_PATTERN_LENGTH - pattern.length / 2} more boxes`: `Make your patten even stronger or click submit`
            }</Text>
            <View style={styles.footer}>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    {
                        [3, 4, 5].map((item) => <RadioButton color={Theme.colors.Gray600} label={`${item}X${item}`}
                                                             onSelect={() => setGridDimension(item)}
                                                             labelColor={Theme.colors.Gray600}
                                                             selected={item === gridDimension}/>)
                    }
                </View>
                <View>
                    <Button style={styles.button} label={"Submit"} onClick={() => submit(pattern)}
                            disabled={pattern.length < 2 * Configs.MINIMUM_PATTERN_LENGTH}/>
                    <Button style={[styles.button, {backgroundColor: Theme.colors.Accent1}]} label={"Cancel"}
                            onClick={() => navigation.goBack()}/>
                </View>
            </View>
        </>
    }
)
const screenHeight = Dimensions.get('window').height;

const footerHeight = 270
const styles = StyleSheet.create({
    gridContainer: {
        height: screenHeight - footerHeight,
        marginTop: StatusBar.currentHeight,
        padding: 30,
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Theme.colors.Primary500,
        height: footerHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,

        shadowColor: Theme.colors.Primary600,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.60,
        shadowRadius: 11.27,
        elevation: 40,
    },
    button: {
        margin: 10
    }
})
