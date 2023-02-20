import {Page} from "../../components/layout/Page";
import {PanelHeader} from "./components/PanelHeader";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Currencies, Currency} from "../../utils/currencies";
import {CurrencyCard} from "./components/CurrencyCard";
import {useState} from "react";
import {Typography} from "../../styles/typography";

export const MainPanel = Page(() => {
    const [selectedCurrency,setSelectedCurrency]= useState<Currency>(Currencies[0])


    return <>
        <PanelHeader currency={selectedCurrency}/>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{width:"100%"}}><Text style={styles.title}>Cryptocurrencies</Text></View>
            {
                Currencies.map(currency=><CurrencyCard selected={currency.symbol===selectedCurrency.symbol} onSelect={()=>setSelectedCurrency(currency)} style={styles.card} currency={currency} key={currency.symbol}/>)
            }
            <View style={{width:"100%"}}><Text style={styles.title}>Platforms</Text></View>
        </ScrollView>
    </>
})

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"flex-start",
        padding:5,
        paddingBottom:60
    },
    card:{
        margin:10,
    },
    title:Typography.create({
        fontFamily: "Sansation-bold",
        fontSize:18,
        margin:5,
        marginHorizontal:10
    })
})
