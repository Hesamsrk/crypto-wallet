import {Page} from "../../components/layout/Page";
import {Alert, StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native"
import {Numpad} from "./components/NumPad";
import {Typography} from "../../styles/typography";
import {Dial} from "./components/Dial";
import {useEffect, useState} from "react";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../store";
import {db} from "../../db";
import {useShake} from "../../hooks/useShake";
import {fingerPrintAuth} from "./utils";

const MAX_NUMBER_OF_ATTEMPTS = 10
export const PassCode = Page(() => {
    const [status, setStatus] = useState<"init" | "init-repeat" | "normal">("normal")
    const [value, setValue] = useState<string>("")
    const [mistakes, setMistakes] = useState<number>(0)
    const hookState = useHookstate(Store)
    const passcode = hookState.passCode.get()
    const {shake,ShakeContainer} = useShake()
    const handlePasscode = (inputPasscode: string) => {
        switch (status) {
            case "init":
                hookState.passCode.set(inputPasscode)
                setStatus("init-repeat")
                break
            case "init-repeat":
                if (passcode === inputPasscode) {
                    db.set(db.keys.PASS_CODE, passcode).then(r => hookState.authenticated.set(true));
                } else {
                    Alert.alert("Passcodes does not match", "Please enter the same passcode again.");
                }
                break
            case "normal":
                if (passcode === inputPasscode) {
                    hookState.authenticated.set(true)
                } else {
                    setMistakes(old => old + 1)
                    shake()
                }
                if (mistakes >= MAX_NUMBER_OF_ATTEMPTS) {
                    hookState.passCode.set("")
                    hookState.privateKey.set("")
                    db.set(db.keys.PASS_CODE, "")
                    db.set(db.keys.PRIVATE_KEY, "")
                    Alert.alert("Too many false attempts", "To protect your assets from potential dangers the private key has been cleared from the storage and you should import it again. Your passcode is also removed so you should define a new one.")
                    setMistakes(0)
                }
                break
        }
        setValue("")
    }

    useEffect(() => {
        if (passcode.length === 0) {
            setStatus("init")
        }
    }, [passcode])

    useEffect(() => {
        value.length === 8 && handlePasscode(value)
    }, [value])

    return <>
        <Dial length={value.length}/>
        <ShakeContainer style={styles.titleContainer}>
            <Text style={styles.titleText}>
                {
                    status === "init" ? "Enter an 8 digit passcode:" :
                        status === "init-repeat" ? "Re-enter the passcode:" :
                            status === "normal" ? (mistakes > 0 ? `Wrong passcode, try again: (attempts left:${MAX_NUMBER_OF_ATTEMPTS - mistakes})` : "Enter your passcode:") :
                                ""
                }
            </Text>
        </ShakeContainer>
        <Numpad onClick={(click) => {
            if (click === "clear") {
                setValue(value => value.length > 0 ? value.slice(0, -1) : "")
            } else if (click === "biometric") {
                fingerPrintAuth().then(authenticated=>authenticated && hookState.authenticated.set(true))
            } else if (click === "clearAll") {
                setValue("")
            } else {
                setValue(value => value + String(click))
            }
        }}/>
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>
                Passcode provides an extra layer of security when using the wallet
            </Text>
        </View>
    </>
}, {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
})

const styles = StyleSheet.create<{
    subtitleText: TextStyle,
    subtitleContainer: ViewStyle,
    titleText: TextStyle,
    titleContainer: ViewStyle,
}>({
    subtitleContainer: {},
    subtitleText: {
        ...Typography.global.PassCodeText,
        marginHorizontal: 60,
        marginVertical: 30
    },
    titleContainer: {
        backgroundColor:"white"
    },
    titleText: {
        ...Typography.global.PassCodeText,
        margin: 20
    }
})

