import React from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from "react-native";
import {Theme} from "../../../styles/theme";
import CalculatorLine from "../../../assets/material/calculatorLine.svg"
import {faEye, faQrcode, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Button} from "../../../components/UI/Button";
import {Typography} from "../../../styles/typography";
import {ButtonBase} from "../../../components/UI/ButtonBase";
import {Currencies, Currency} from "../../../modules/currnecies/currencies";
import {Util} from "../../../utils/global";

const screenWidth = Dimensions.get('window').width;

interface PropTypes {
    currency: Currency
}

export const PanelHeader: React.FC<PropTypes> = ({currency: SelectedCurrency}) => {
    let Total = 0
    for (let curr of Currencies) {
        Total += curr.getAmount() * curr.getPrice()
    }
    let BTC = Currencies.find(c=>c.symbol==="BTC")

    return (<View style={styles.container}>
        <View style={styles.iconBox}>
            <SelectedCurrency.icon width={"100%"} height={"100%"}/>
        </View>
        <View style={styles.leftBox}>
            <View style={styles.topRow}>
                <Button style={styles.ButtonExit} color={Theme.colors.Accent1}>
                    <View style={styles.buttonExitInner}>
                        <FontAwesomeIcon style={styles.buttonExitIcon} size={15} color={Theme.colors.Gray500}
                                         icon={faRightFromBracket}/>
                        <Text style={styles.buttonExitText}>Exit Wallet</Text>
                    </View>
                </Button>
                <ButtonBase><FontAwesomeIcon size={35} color={Theme.colors.Gray500} icon={faQrcode}/></ButtonBase>
            </View>
            <View style={styles.calculator}>
                <View style={styles.calculatorRow}>
                    <Text style={styles.calculatorKey}>Amount</Text>
                    <Text
                        style={styles.calculatorValue}>{`${Util.formatNumber(SelectedCurrency.getAmount(), SelectedCurrency.precision)} ${SelectedCurrency.symbol}`}</Text>
                </View>
                <View style={styles.calculatorRow}>
                    <Text style={styles.calculatorKey}>Price</Text>
                    <Text
                        style={styles.calculatorValue}>{`${Util.formatNumber(SelectedCurrency.getPrice(), 2)} $`}</Text>
                </View>
                <CalculatorLine width={"100%"} height={12}/>
                <View style={styles.calculatorRow}>
                    <Text style={styles.calculatorKey}>Total</Text>
                    <Text
                        style={styles.calculatorValue}>{`${Util.formatNumber(SelectedCurrency.getPrice() * SelectedCurrency.getAmount(), 2)} $`}</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={styles.transferButton} labelStyle={styles.transferButtonLabel}
                            color={Theme.colors.Accent1} label={"Send"}/>
                    <Button style={styles.transferButton} labelStyle={styles.transferButtonLabel}
                            color={Theme.colors.Accent2} label={"Receive"}/>
                </View>
            </View>
            <Text style={styles.footerTitle}>Total Assets</Text>
        </View>
        <View style={styles.footer}>
            <View><Text style={styles.totalUSD}>{`${Util.formatNumber(Total, 2)} $`}</Text></View>
            {BTC && <View><Text style={styles.totalBTC}>{`${Util.formatNumber(Total/BTC.getPrice(), BTC.precision)} ${BTC.symbol}`}</Text></View>}
            <ButtonBase style={styles.eyeButton}>
                <FontAwesomeIcon size={25} color={Theme.colors.Gray500} icon={faEye}/>
            </ButtonBase>
        </View>
    </View>)
}
const coinIconDimension = 270
const coinIconHorizontalPadding = 70
const footerHeight = 70
const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: "relative",
        height: 312,
        backgroundColor: Theme.colors.Primary600,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        shadowColor: Theme.colors.Primary600,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.60,
        shadowRadius: 11.27,
        elevation: 40,
        paddingTop: StatusBar.currentHeight + 5,
    },
    leftBox: {
        width: screenWidth - coinIconDimension + coinIconHorizontalPadding,
        height: "100%",
    },
    iconBox: {
        height: coinIconDimension,
        width: coinIconDimension,
        position: "absolute",
        right: -coinIconHorizontalPadding,
        top: -40
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Theme.colors.Primary500,
        height: footerHeight,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",

        shadowColor: Theme.colors.Primary600,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.27,
        elevation: 14
    },
    footerTitle: Typography.create({
        color: Theme.colors.Gray500,
        fontSize: 20,
        bottom: footerHeight,
        position: "absolute",
        paddingHorizontal: 16,
        paddingVertical: 5
    }),
    totalBTC: Typography.create({
        color: Theme.colors.Gray500,
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
        textAlignVertical: "bottom",
        includeFontPadding: false,
        paddingBottom: 4
    }),
    totalUSD: Typography.create({
        color: Theme.colors.Gray500,
        fontSize: 30,
        flex: 1,
        textAlignVertical: "bottom",
        includeFontPadding: false,
    }),
    eyeButton: {
        marginLeft: 10,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    ButtonExit: {
        marginLeft: 10,
        marginRight: 20,
        borderRadius: 7,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    buttonExitInner: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonExitText: Typography.create(
        {
            color: Theme.colors.Gray500,
            fontSize: 14,
            marginLeft: 10
        }),
    buttonExitIcon: {
        transform: [{
            rotate: "180deg"
        }]
    },
    calculator: {
        width: "100%",
    },
    calculatorRow: {
        flexDirection: "row",
        paddingLeft: 20,
        marginVertical: 3,
    },
    calculatorKey: Typography.create({
        color: Theme.colors.Gray500,
        fontSize: 14,
        flex: 1,
    }),
    calculatorValue: Typography.create({
        color: Theme.colors.Gray500,
        fontSize: 14,
        flex: 2,
    }),
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    transferButton: {
        marginHorizontal: 5,
        paddingHorizontal: 0,
        paddingVertical: 0,
        height: 35,
        width: 90,
        borderRadius: 100
    },
    transferButtonLabel: Typography.create({
        fontSize: 14,
        color: Theme.colors.Gray500
    })
})