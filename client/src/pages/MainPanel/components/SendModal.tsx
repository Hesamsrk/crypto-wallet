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
import {Dimensions, View} from 'react-native';
import {BarcodeScanner} from "./BarcodeScanner";
import {Tools} from "../../../utils/tools";

const windowWidth = Dimensions.get('window').width;
const width = Math.min(windowWidth - 50, 300)

interface PropTypes {
    onClose: () => void
    open: boolean
    selectedCurrency: string
    balances?: { [key in SupportedSymbols]: number }
}

export const SendModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    const selectedCurrencyBody = Currencies.find(item => item.symbol === props.selectedCurrency)
    const [address, setAddress] = useState<string>("")
    const [amount, setAmount] = useState<string>("")

    const [scannerToggle, setScannerToggle] = useState<boolean>(false)
    const balance = props.balances  ? (props.balances[selectedCurrencyBody.symbol] || 0) : 0
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
               label={`Amount ${selectedCurrencyBody.symbol}`} endButton={{
            label: "MAX", onClick: () => setAmount("" + balance)
        }}/>
        <Text
            style={styles.endButton}>{`Balance: ${Tools.formatNumber(balance, selectedCurrencyBody.precision, true)} ${selectedCurrencyBody.symbol}`}</Text>
        <Button title={"Submit"} color={Theme.colors.Accent2} tintColor={Theme.colors.Gray600} style={{marginTop: 10}}/>
    </UIModal>
};


