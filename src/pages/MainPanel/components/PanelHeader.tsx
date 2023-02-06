import React from 'react';
import {StyleSheet, View,Text, ViewStyle} from "react-native";
import {Theme} from "../../../styles/theme";
import BitCoin from "../../../assets/symbols/BTC.svg"
import {faEye,faQrcode} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Button} from "../../../components/UI/Button";
export const PanelHeader: React.FC = () => {
    return (<View style={styles.container}>
        <View style={styles.iconBox}>
            <BitCoin width={"100%"} height={"100%"}/>
        </View>
        <View style={styles.leftBox}>
            <View><Button label={"Exit"} color={Theme.colors.Accent2}/> <FontAwesomeIcon size={45} color={Theme.colors.Gray500} icon={faQrcode}/></View>
        </View>
        <View style={styles.footer}>
            <View><Text>120,414.05 $</Text></View>
            <View><Text>2.51245 BTC</Text><FontAwesomeIcon size={35} color={Theme.colors.Gray500} icon={faEye}/></View>
        </View>
    </View>)
}

const styles = StyleSheet.create<{
    container: ViewStyle
    leftBox: ViewStyle
    iconBox: ViewStyle
    footer: ViewStyle
}>({
    container: {
        width: "100%",
        position: "relative",
        height: 340,
        backgroundColor: Theme.colors.Primary600,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: Theme.colors.Primary600,
        shadowOffset: {
            width: 5,
            height: 18,
        },
        shadowOpacity:  0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    leftBox: {},
    iconBox: {
        height:290,
        width:290,
        position:"absolute",
        right:-80,
        top:-40
    },
    footer: {
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        backgroundColor:Theme.colors.Primary500,
        height:75,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
    },
})