import React from 'react';
import {Alert, Dimensions, StatusBar, StyleSheet, Text, View} from "react-native";
import {Theme} from "../../../styles/theme";
import CalculatorLine from "../../../svg/material/calculatorLine.svg"
import {faEye, faEyeSlash, faRefresh, faRightFromBracket, faWifi} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Button} from "../../../components/UI/Button";
import {Typography} from "../../../styles/typography";
import {ButtonBase} from "../../../components/UI/ButtonBase";
import {Currencies, Currency, SupportedSymbols} from "../../../config/currencies";
import {Tools} from "../../../utils/tools";
import {removeMasterSeed} from "../../../utils/masterSeed";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../../store";
import {marketPrices} from "../../../services/backend/api";

const screenWidth = Dimensions.get('window').width;

interface PropTypes {
    currency: Currency
    onRefresh: () => void
    onReceiveClick: () => void
    onSendClick: () => void
    onShowNetworkStatus: () => void
    balances?: { [key in SupportedSymbols]: number }
    market: marketPrices | undefined
}

export const PanelHeader: React.FC<PropTypes> = ({
                                                     currency: selectedCurrency,
                                                     onRefresh,
                                                     onReceiveClick,
                                                     onSendClick,
                                                     onShowNetworkStatus,
                                                     balances,
                                                     market
                                                 }) => {
    const hookState = useHookstate(Store)
    const marketInfo = Object.fromEntries(Currencies.map(i=>([i.symbol,market && market[i.symbol] || {price:0,change:0}]))) as marketPrices
    const currentMarket = marketInfo[selectedCurrency.symbol]
    const displayNumbers = hookState.displayNumbers.get()
    let Total = 0
    for (let curr of Currencies) {
        Total += (balances ? (Tools.balanceWrapper(balances[curr.symbol],curr.symbol) || 0) : 0) * marketInfo[curr.symbol].price
    }
    let BTC = Currencies.find(c => c.symbol === "BTC")

    const networkStatus = hookState.networkStatus.get()
    const balance = balances ? (balances[selectedCurrency.symbol] || 0) : 0
    return (<View style={styles.container}>
        <View style={styles.iconBox}>
            <selectedCurrency.icon width={"100%"} height={"100%"}/>
        </View>
        <View style={styles.leftBox}>
            <View style={styles.topRow}>
                <Button style={styles.ButtonExit} color={Theme.colors.Accent1} onClick={() => {
                    Alert.alert("Are you sure?",
                        "Proceeding will remove this wallet key from your wallet and you will need to import it again the next time you need it.",
                        [{text: "No, wait", style: "cancel"}, {
                            text: "Im sure", style: "destructive", onPress: () => {
                                removeMasterSeed().then(() => {
                                })
                            }
                        }], {cancelable: false})
                }}>
                    <View style={styles.buttonExitInner}>
                        <FontAwesomeIcon style={styles.buttonExitIcon} size={15} color={Theme.colors.Gray500}
                                         icon={faRightFromBracket}/>
                        <Text style={styles.buttonExitText}>Exit Wallet</Text>
                    </View>
                </Button>
                <ButtonBase onClick={() => onRefresh()} disabled={networkStatus !== "connected"}><FontAwesomeIcon
                    size={20} color={Theme.colors.Gray500} icon={faRefresh}/></ButtonBase>
                <ButtonBase onClick={() => onShowNetworkStatus()}>
                    <FontAwesomeIcon style={styles.networkStatus} size={20}
                                     color={networkStatus === "connecting" ? Theme.colors.yellow : networkStatus === "connected" ? Theme.colors.Accent2 : Theme.colors.Accent1}
                                     icon={faWifi}/>
                </ButtonBase>
            </View>
            <View style={styles.calculator}>
                <View style={styles.calculatorRow}>
                    <Text style={styles.calculatorKey}>Amount</Text>
                    <Text
                        style={styles.calculatorValue}>{`${Tools.formatNumber(Tools.balanceWrapper(balance,selectedCurrency.symbol), selectedCurrency.precision, displayNumbers)} ${selectedCurrency.symbol}`}</Text>
                </View>
                <View style={styles.calculatorRow}>
                    <Text style={styles.calculatorKey}>Price</Text>
                    <Text
                        style={styles.calculatorValue}>{`${Tools.formatNumber(currentMarket.price, 2)} $`}</Text>
                </View>
                <CalculatorLine width={"100%"} height={12}/>
                <View style={styles.calculatorRow}>
                    <Text style={styles.calculatorKey}>Total</Text>
                    <Text
                        style={styles.calculatorValue}>{`${Tools.formatNumber(currentMarket.price * Tools.balanceWrapper(balance,selectedCurrency.symbol), 2, displayNumbers)} $`}</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={styles.transferButton} labelStyle={styles.transferButtonLabel}
                            color={Theme.colors.Accent1} label={"Send"} onClick={() => onSendClick()}
                            disabled={networkStatus !== "connected"}/>
                    <Button style={styles.transferButton} labelStyle={styles.transferButtonLabel}
                            color={Theme.colors.Accent2} label={"Receive"} onClick={() => onReceiveClick()}
                            disabled={networkStatus !== "connected"}/>
                </View>
            </View>
            <Text style={styles.footerTitle}>Total Assets</Text>
        </View>
        <View style={styles.footer}>
            <View><Text style={styles.totalUSD}>{`${Tools.formatNumber(Total, 2, displayNumbers)} $`}</Text></View>
            {BTC && <View><Text
                style={styles.totalBTC}>{`${Tools.formatNumber(Total / marketInfo.BTC.price, BTC.precision, displayNumbers)} ${BTC.symbol}`}</Text></View>}
            <ButtonBase style={styles.eyeButton} onClick={() => {
                hookState.displayNumbers.set(old => !old)
            }}>
                <FontAwesomeIcon size={25} color={Theme.colors.Gray500} icon={displayNumbers ? faEye : faEyeSlash}/>
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
        fontSize: 12,
        flex: 1,
    }),
    calculatorValue: Typography.create({
        color: Theme.colors.Gray500,
        fontSize: 12,
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
    }),
    networkStatus: {
        marginLeft: 20
    }
})