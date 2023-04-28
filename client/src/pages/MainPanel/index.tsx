import {Page} from "../../components/layout/Page";
import {PanelHeader} from "./components/PanelHeader";
import {Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {Currencies} from "../../config/currencies";
import {CurrencyCard} from "./components/CurrencyCard";
import {useState} from "react";
import {Typography} from "../../styles/typography";
import {useBalanceList, useCryptoAddresses, useMarketPrices, usePing} from "../../services/backend/api";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../store";
import Spinner from 'react-native-loading-spinner-overlay';
import {ReceiveModal} from "./components/ReceiveModal";
import {SendModal} from "./components/SendModal";
import {backendClient} from "../../services/backend/client";
import {NetworkModal} from "./components/NetworkModal";
import {logger} from "../../utils/logger";

export const MainPanel = Page(() => {
    const hookState = useHookstate(Store)
    const backend = hookState.backend.get()
    const privateKey = hookState.privateKey.get()
    const [selectedCurrency, setSelectedCurrency] = useState<string>(Currencies[0].symbol)
    const selectedCurrencyBody = Currencies.find(item => item.symbol === selectedCurrency)
    const {
        data: cryptoAddresses,
        refetch: refetchAddresses,
        isRefetching: cryptoAddressesIsLoading
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
                logger.log("Failed", {err})
            }
        }
    })

    const {data: balances, refetch: refetchBalances,isRefetching:balancesIsLoading} = useBalanceList({
        instance: backendClient(backend), variables: {masterSeed: privateKey, accountID: 0}
    })
    const {data: marketPrices, refetch: refetchMarketPrices,isRefetching:marketPricesIsLoading} = useMarketPrices({
        instance: backendClient(backend)
    })

    const [openModal, setOpenModal] = useState<"close" | "Receive" | "Send" | "Network">("close")
    const networkStatus = hookState.networkStatus.get()

    const refetchRequests = async () => {
        await refetchAddresses()
        await refetchBalances()
        await refetchMarketPrices()
    }
    const loading = marketPricesIsLoading || balancesIsLoading || cryptoAddressesIsLoading

    return <>
        <Spinner visible={networkStatus === "connecting" || loading}/>
        {openModal === "Receive" && <ReceiveModal onClose={() => setOpenModal("close")} open={openModal === "Receive"}
                                                  selectedCurrency={selectedCurrency}
                                                  publicKey={cryptoAddresses?.data ? (cryptoAddresses.data[selectedCurrencyBody.symbol] || "") : ""}/>}
        {openModal === "Send" && <SendModal onClose={() => setOpenModal("close")} open={openModal === "Send"}
                                            selectedCurrency={selectedCurrency} balances={balances?.data}/>}
        {openModal === "Network" &&
        <NetworkModal onClose={() => setOpenModal("close")} open={openModal === "Network"}/>}

        <PanelHeader onShowNetworkStatus={() => setOpenModal("Network")} currency={selectedCurrencyBody}
                     balances={balances?.data} onRefresh={() => {
            refetchRequests().then(() => Alert.alert("Done", "Data refreshed successfully!"))
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
                                                         balance={balances ? balances[currency.symbol] || 0 : 0}
                                                         disabled={currency.disabled}
                                                         key={currency.symbol}
                                                         market={marketPrices?.data ? marketPrices.data.find(i => i.symbol === currency.symbol) : {
                                                             price: 0,
                                                             change: 0
                                                         }}/>)
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
