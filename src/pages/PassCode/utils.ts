import * as LocalAuthentication from "expo-local-authentication";
import {Alert} from "react-native";
import {logger} from "../../utils/logger";

export async function fingerPrintAuth(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync()

    if(!hasHardware){
        Alert.alert("Sorry","Your device does not support this functionality!")
        return false
    }

    const biometricEnabled = await LocalAuthentication.isEnrolledAsync()

    // Check if fingerprint is enabled
    if(!biometricEnabled){
        Alert.alert("Sorry","You should enable biometric authentication on your device!")
        return false
    }


    const res = (await LocalAuthentication.authenticateAsync({
        promptMessage:"Sign in to your wallet",
        disableDeviceFallback:true,
        cancelLabel:"Use passcode",
        fallbackLabel:"Use passcode"
    })) as {error:boolean,success:boolean,warning:boolean}
    if(res.error){
        logger.log("Auth Error:",res.error)
        return false
    }
    logger.log("Auth Warning:",res.warning)

    return res.success
}
