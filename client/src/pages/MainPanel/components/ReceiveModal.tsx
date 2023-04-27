import React, {PropsWithChildren} from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {UIModal} from "../../../components/UI/UIModal";
import QRCode from 'react-native-qrcode-svg';
import {Theme} from "../../../styles/theme";
import {Typography} from "../../../styles/typography";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {setStringAsync} from 'expo-clipboard';
import {Currencies} from "../../../config/currencies";

interface PropTypes {
    onClose: () => void
    open: boolean
    publicKey: string
    selectedCurrency:string
}

export const ReceiveModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    const selectedCurrencyBody = Currencies.find(item => item.symbol === props.selectedCurrency)

    return <UIModal title={`Receive ${selectedCurrencyBody.symbol}`} onClose={props.onClose} open={props.open}>
        <View style={styles.container}>
            <View style={styles.qrContainer}>
                <QRCode backgroundColor={Theme.colors.Gray600} color={Theme.colors.Primary600} value={props.publicKey} size={200} ecl={"Q"}/>
            </View>
            <Text style={styles.subtitle}>
                To proceed, you can either scan the QR code presented above or copy the address.
            </Text>
            <TouchableOpacity style={styles.textBox} onPress={()=>setStringAsync(props.publicKey).then(result=>result=== true && ToastAndroid.show('Public key has been copied to your clipboard!', ToastAndroid.SHORT))}>
                <Text style={styles.publicKey}>{props.publicKey}</Text>
                <FontAwesomeIcon size={20}
                                 color={Theme.colors.Primary600}
                                 icon={faCopy}/>
            </TouchableOpacity>
        </View>
    </UIModal>
};

const styles = StyleSheet.create({
    qrContainer: {
        padding: 20,
        backgroundColor: Theme.colors.Gray600,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1
    },
    container: {
        alignItems: "center"
    },
    textBox: {
        backgroundColor: Theme.colors.Gray600,
        padding: 8,
        borderRadius: 5,
        flexDirection:"row"
    },
    subtitle:Typography.create({
        color:Theme.colors.Text.Light,
        marginVertical:10,
        textAlign:"center"
    }),
    publicKey: Typography.create({
        fontSize: 13,
        marginRight:5
    })
});
