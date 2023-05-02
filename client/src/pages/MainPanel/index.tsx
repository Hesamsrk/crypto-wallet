import {Page} from "../../components/layout/Page";
import {PanelHeader} from "./components/PanelHeader";
import {Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {Currencies} from "../../config/currencies";
import {CurrencyCard} from "./components/CurrencyCard";
import {useState} from "react";
import {Typography} from "../../styles/typography";
import {
    useBalanceList,
    useCryptoAddresses,
    useCryptoPrivateKeys,
    useMarketPrices, useMnemonic,
    usePing
} from "../../services/backend/api";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../store";
import Spinner from 'react-native-loading-spinner-overlay';
import {ReceiveModal} from "./components/ReceiveModal";
import {SendModal} from "./components/SendModal";
import {backendClient} from "../../services/backend/client";
import {NetworkModal} from "./components/NetworkModal";
import {logger} from "../../utils/logger";
import {Counter} from "../../components/UI/Counter";
import {MnemonicModal} from "./components/MnemonicModal";
import {Button, Chip} from "@react-native-material/core";
import {Theme} from "../../styles/theme";

export const MainPanel = Page(() => {
    const hookState = useHookstate(Store)
    const backend = hookState.backend.get()
    const networkStatus = hookState.networkStatus.get()
    const privateKey = hookState.privateKey.get()
    const accountID = hookState.accountID.get()
    const [selectedCurrency, setSelectedCurrency] = useState<string>(Currencies[0].symbol)
    const selectedCurrencyBody = Currencies.find(item => item.symbol === selectedCurrency)
    const {
        data: cryptoAddresses,
        refetch: refetchAddresses,
        isRefetching: cryptoAddressesIsRefetching
    } = useCryptoAddresses({
        instance: backendClient(backend), variables: {masterSeed: privateKey, accountID}
    })

    const {
        data: cryptoPrivateKeys,
        refetch: refetchPrivateKeys,
        isRefetching: privateKeysIsRefetching
    } = useCryptoPrivateKeys({
        instance: backendClient(backend), variables: {masterSeed: privateKey, accountID}
    })

    const {
        data: mnemonic,
        refetch: refetchMnemonic,
        isRefetching: mnemonicIsRefetching
    } = useMnemonic({
        instance: backendClient(backend), variables: {masterSeed: privateKey}
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

    const {data: balances, refetch: refetchBalances, isRefetching: balancesIsRefetching} = useBalanceList({
        instance: backendClient(backend), variables: {masterSeed: privateKey, accountID}
    })
    const {data: marketPrices, refetch: refetchMarketPrices, isRefetching: marketPricesIsRefetching} = useMarketPrices({
        instance: backendClient(backend)
    })

    const [openModal, setOpenModal] = useState<"close" | "Receive" | "Send" | "Network" | "Mnemonics">("close")

    const refetchRequests = async () => {
        await refetchAddresses()
        await refetchBalances()
        await refetchMarketPrices()
        await refetchPrivateKeys()
        await refetchMnemonic()
    }
    const loading = networkStatus==="connected" ? (marketPricesIsRefetching || balancesIsRefetching || cryptoAddressesIsRefetching || privateKeysIsRefetching) || mnemonicIsRefetching : false

    return <>
        <Spinner visible={networkStatus === "connecting" || loading}/>
        {openModal === "Receive" && <ReceiveModal onClose={() => setOpenModal("close")} open={openModal === "Receive"}
                                                  selectedCurrency={selectedCurrency}
                                                  publicKey={cryptoAddresses?.data ? (cryptoAddresses.data[selectedCurrencyBody.symbol] || "") : ""}/>}
        {openModal === "Send" && <SendModal onClose={() => setOpenModal("close")} open={openModal === "Send"}
                                            wallet={{
                                                fromAddress: cryptoAddresses?.data ? (cryptoAddresses.data[selectedCurrencyBody.symbol] || "") : "",
                                                fromPrivateKey:cryptoPrivateKeys?.data ? (cryptoPrivateKeys.data[selectedCurrencyBody.symbol] || "") : ""
                                            }}
                                            selectedCurrency={selectedCurrency} balances={balances?.data}/>}
        {openModal === "Network" &&
        <NetworkModal onClose={() => setOpenModal("close")} open={openModal === "Network"}/>}
        {openModal === "Mnemonics" &&
        <MnemonicModal onClose={() => setOpenModal("close")} open={openModal === "Mnemonics"} data={mnemonic?.data || []}/>}

        <PanelHeader onShowNetworkStatus={() => setOpenModal("Network")} currency={selectedCurrencyBody}
                     balances={balances?.data} onRefresh={() => {
            refetchRequests().then(() => Alert.alert("Done", "Data refreshed successfully!"))
        }} onReceiveClick={() => setOpenModal("Receive")}
                     onSendClick={() => setOpenModal("Send")} market={marketPrices?.data}/>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.topBar}>
                <Chip variant={"outlined"} style={{backgroundColor:Theme.colors.Primary400}} color={Theme.colors.Gray600} label={"Mnemonic"} onPress={()=>setOpenModal("Mnemonics")} />
                <Counter label={"Wallet ID"} minimum={0} maximum={9} onChange={(val) => {
                    hookState.accountID.set(val)
                    setTimeout(() => {
                        refetchRequests().then(r => Alert.alert("Done", "New wallet loaded!"))
                    }, 500)
                }}/>
            </View>
            <View style={{width: "100%"}}><Text style={styles.title}>Cryptocurrencies</Text></View>
            {
                Currencies.map(currency => <CurrencyCard selected={currency.symbol === selectedCurrency}
                                                         onSelect={() => {
                                                             setSelectedCurrency(currency.symbol)
                                                         }}
                                                         style={styles.card} currency={currency}
                                                         balance={balances?.data ? (balances.data[currency.symbol] || 0) : 0}
                                                         disabled={currency.disabled}
                                                         key={currency.symbol}
                                                         market={(marketPrices?.data && marketPrices.data[currency.symbol]) || {
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
    }),
    topBar:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        justifyContent:"space-between",
        marginVertical:10,
        borderBottomColor:Theme.colors.Primary600,
        borderBottomWidth:1
    }
})
