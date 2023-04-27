import {Page} from "../../components/layout/Page";
import {PanelHeader} from "./components/PanelHeader";
import {Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {Currencies} from "../../config/currencies";
import {CurrencyCard} from "./components/CurrencyCard";
import {useState} from "react";
import {Typography} from "../../styles/typography";
import {useCryptoAddresses, usePing} from "../../services/backend/api";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../store";
import Spinner from 'react-native-loading-spinner-overlay';
import {ReceiveModal} from "./components/ReceiveModal";
import {SendModal} from "./components/SendModal";
import {backendClient} from "../../services/backend/client";
import {NetworkModal} from "./components/NetworkModal";

export const MainPanel = Page(() => {
    const hookState = useHookstate(Store)
    const backend = hookState.backend.get()
    console.log({backend})
    const privateKey = hookState.privateKey.get()
    const [selectedCurrency, setSelectedCurrency] = useState<string>(Currencies[0].symbol)
    const selectedCurrencyBody = Currencies.find(item => item.symbol === selectedCurrency)
    const {
        data: cryptoAddresses,
        isLoading: cryptoAddressesIsLoading,
        refetch,
    } = useCryptoAddresses({
        instance: backendClient(backend), variables: {masterSeed: privateKey, accountID: 0}
    })

    usePing({
        instance: backendClient(backend), queryOptions: {
            refetchInterval: 1500,
            onSuccess: (data) => {
                data === true ? hookState.networkStatus.set("connected") : hookState.networkStatus.set("disconnected")
            },
            onError: (err) => {
                hookState.networkStatus.set("disconnected")
                console.log("Failed", {err})
            }
        }
    })
    const [openModal, setOpenModal] = useState<"close" | "Receive" | "Send" | "Network">("close")
    const networkStatus = hookState.networkStatus.get()

    return <>
        <Spinner visible={networkStatus === "connected" && cryptoAddressesIsLoading}/>
        {openModal === "Receive" && <ReceiveModal onClose={() => setOpenModal("close")} open={openModal === "Receive"}
                                                  selectedCurrency={selectedCurrency}
                                                  publicKey={cryptoAddresses?.data[selectedCurrencyBody.symbol] || ""}/>}
        {openModal === "Send" && <SendModal onClose={() => setOpenModal("close")} open={openModal === "Send"}
                                            selectedCurrency={selectedCurrency}/>}
        {openModal === "Network" && <NetworkModal onClose={() => setOpenModal("close")} open={openModal === "Network"}/>}

        <PanelHeader onShowNetworkStatus={()=>setOpenModal("Network")} currency={selectedCurrencyBody} onRefresh={() => {
            refetch().then(() => Alert.alert("Done", "Data refreshed successfully!"))
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
