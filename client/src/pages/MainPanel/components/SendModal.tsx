import React, {PropsWithChildren, useState} from 'react';
import {UIModal} from "../../../components/UI/UIModal";
import {Currencies, SupportedSymbols} from "../../../config/currencies";
import {Input, styles} from "../../../components/UI/Input";
import {Button, Text} from "@react-native-material/core";
import {Theme} from "../../../styles/theme";
import {getStringAsync, StringFormat} from 'expo-clipboard';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";
import {ButtonBase} from "../../../components/UI/ButtonBase";
import {Alert, Dimensions, View} from 'react-native';
import {BarcodeScanner} from "./BarcodeScanner";
import {Tools} from "../../../utils/tools";
import {useSubmitTransaction} from "../../../services/backend/api";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../../store";
import {backendClient} from "../../../services/backend/client";

const windowWidth = Dimensions.get('window').width;
const width = Math.min(windowWidth - 50, 300)

interface PropTypes {
    onClose: () => void
    open: boolean
    selectedCurrency: string
    balances?: { [key in SupportedSymbols]: number }
    wallet: { fromPrivateKey: string, fromAddress: string }
}

export const SendModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    const selectedCurrencyBody = Currencies.find(item => item.symbol === props.selectedCurrency)
    const [address, setAddress] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [scannerToggle, setScannerToggle] = useState<boolean>(false)
    const balance = props.balances ? (props.balances[selectedCurrencyBody.symbol] || 0) : 0
    const hookState = useHookstate(Store)
    const backend = hookState.backend.get()

    const {
        mutate: submitTransaction,
    } = useSubmitTransaction({instance: backendClient(backend)})
    return <UIModal title={`Send ${selectedCurrencyBody.symbol}`} onClose={props.onClose} open={props.open}>
        {
            scannerToggle ? <BarcodeScanner style={{width}} onScanned={({data}) => {
                setAddress(data)
                setScannerToggle(false)
            }}/> : <Input style={{width}} label={"Address"} value={address}
                          trailingContainerStyle={{width: 90, alignItems: "flex-end"}}
                          trailing={<View style={{
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              alignItems: "center"
                          }}><ButtonBase onClick={() => setScannerToggle(true)}><FontAwesomeIcon size={30}
                                                                                                 color={Theme.colors.Primary400}
                                                                                                 icon={faQrcode}/></ButtonBase>
                              <ButtonBase style={{marginLeft: 10}} onClick={() => {
                                  getStringAsync({preferredFormat: StringFormat.PLAIN_TEXT}).then((clipboard) => setAddress(clipboard))
                              }
                              }><Text style={styles.endButton}>Paste</Text></ButtonBase></View>}
                          onChangeText={(text) => setAddress(text)}/>
        }
        <Input value={amount} onChangeText={(text) => setAmount(text)} style={{width}}
               trailingContainerStyle={{width: 90, alignItems: "flex-end"}}
               keyboardType='numeric'
               helperText={`Balance: ${Tools.formatNumber(Tools.balanceWrapper(balance, selectedCurrencyBody.symbol), selectedCurrencyBody.precision, true)} ${selectedCurrencyBody.symbol}`}
               label={`Amount ${selectedCurrencyBody.symbol}`} endButton={{
            label: "Max",
            onClick: () => {
                let max = Math.max(typeof selectedCurrencyBody.minimumFee === "number" ? balance - selectedCurrencyBody.minimumFee : balance, 0)
                setAmount(String(Tools.balanceWrapper(max, selectedCurrencyBody.symbol)))
            }
        }}/>
        <Button title={"Submit"} color={Theme.colors.Accent2} tintColor={Theme.colors.Gray600} style={{marginTop: 10}}
                onPress={() => {
                    if (address.length < 1) {
                        Alert.alert("Error", "Address is not defined!")
                    } else if (amount.length < 1) {
                        Alert.alert("Error", "Amount is not defined!")
                    } else {
                        Alert.alert("Are you sure?",
                            "You may want to double-check the receivers address before submitting the transaction.",
                            [{text: "No, wait", style: "cancel"}, {
                                text: "Im sure", style: "destructive", onPress: () => {
                                    submitTransaction({
                                        fromAddress: props.wallet.fromAddress || "",
                                        privateKey: props.wallet.fromPrivateKey || "",
                                        toAddress: address || "",
                                        amount: amount.length > 0 ? Math.floor(+amount * 100000000) : 0,
                                        symbol: selectedCurrencyBody.symbol
                                    })
                                    props.onClose()
                                }
                            }], {cancelable: false})
                    }
                }}/>
    </UIModal>
};


