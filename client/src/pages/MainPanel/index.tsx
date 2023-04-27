import {Page} from "../../components/layout/Page";
import {PanelHeader} from "./components/PanelHeader";
import {Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {Currencies} from "../../config/currencies";
import {CurrencyCard} from "./components/CurrencyCard";
import {useEffect, useState} from "react";
import {Typography} from "../../styles/typography";
import {useCryptoAddresses, usePing} from "../../services/backend/api";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../store";
import Spinner from 'react-native-loading-spinner-overlay';
import {ReceiveModal} from "./components/ReceiveModal";
import {SendModal} from "./components/SendModal";
import {logger} from "../../utils/logger";

export const MainPanel = Page(() => {
    const hookState = useHookstate(Store)
    const privateKey = hookState.privateKey.get()
    const [selectedCurrency, setSelectedCurrency] = useState<string>(Currencies[0].symbol)
    const selectedCurrencyBody = Currencies.find(item => item.symbol === selectedCurrency)
    const {
        data: cryptoAddresses,
        isLoading: cryptoAddressesIsLoading,
        refetch,
        isError: cryptoAddressesIsError,
        isSuccess
    } = useCryptoAddresses({masterSeed: privateKey, accountID: 0}, {
        onError: () => {
            Alert.alert("Error", "The process of fetching the wallet addresses has failed.")
        }
    })
    const {data:connected} = usePing(undefined,{refetchOnMount:true,refetchOnReconnect:true,refetchInterval:500,refetchOnWindowFocus:true})
    const [openModal, setOpenModal] = useState<"close" | "Receive" | "Send">("close")

    useEffect(()=>{
        if(connected===true){
            hookState.networkStatus.set("connected")
        }else{
            hookState.networkStatus.set("disconnected")
        }
    },[connected])

    return <>
        <Spinner visible={cryptoAddressesIsLoading}/>
        <ReceiveModal onClose={() => setOpenModal("close")} open={openModal === "Receive"}
                      publicKey={cryptoAddresses?.data[selectedCurrencyBody.symbol] || ""}/>
        <SendModal onClose={() => setOpenModal("close")} open={openModal === "Send"}/>
        <PanelHeader currency={selectedCurrencyBody} onRefresh={() => {
            refetch().then(()=>Alert.alert("Done","Data refreshed successfully!"))
        }} onReceiveClick={() => setOpenModal("Receive")}
                     onSendClick={() => setOpenModal("Send")}/>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{width: "100%"}}><Text style={styles.title}>Cryptocurrencies</Text></View>
            {
                Currencies.map(currency => <CurrencyCard selected={currency.symbol === selectedCurrency}
                                                         onSelect={() => {
                                                             setSelectedCurrency(currency.symbol)
                                                         }}
                                                         style={styles.card} currency={currency}
                                                         disabled={currency.disabled}
                                                         key={currency.symbol}/>)
            }
            <View style={{width: "100%"}}><Text style={styles.title}>Platforms</Text></View>
        </ScrollView>
    </>
})

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 5,
        paddingBottom: 60
    },
    card: {
        margin: 10,
    },
    title: Typography.create({
        fontFamily: "Sansation-bold",
        fontSize: 18,
        margin: 5,
        marginHorizontal: 10
    })
})
