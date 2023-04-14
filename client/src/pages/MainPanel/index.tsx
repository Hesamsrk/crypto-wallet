import {Page} from "../../components/layout/Page";
import {PanelHeader} from "./components/PanelHeader";
import {Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {Currencies} from "../../config/currencies";
import {CurrencyCard} from "./components/CurrencyCard";
import {useState} from "react";
import {Typography} from "../../styles/typography";
import {useCryptoAddresses} from "../../services/backend/api";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../store";
import Spinner from 'react-native-loading-spinner-overlay';

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
    } = useCryptoAddresses({masterSeed: privateKey, accountID: 0}, {
        onError: () => {
            Alert.alert("Error", "The process of fetching the wallet addresses has failed.")
        }
    })

    return <>
        <Spinner visible={cryptoAddressesIsLoading}/>
        <PanelHeader currency={selectedCurrencyBody} onRefresh={() => {
            refetch()
        }}/>
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
