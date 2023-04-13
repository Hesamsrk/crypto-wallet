import React from 'react';
import {StyleSheet, View, Text,ViewProps,TouchableWithoutFeedback} from "react-native";
import {Currency} from "../../../config/currencies";
import {Theme} from "../../../styles/theme";
import {useShake} from "../../../hooks/useShake";
import {Typography} from "../../../styles/typography";
import {Tools} from "../../../utils/tools";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../../store";
interface PropTypes{
    currency:Currency
    onSelect?:()=>any
    selected?:boolean
}
export const CurrencyCard: React.FC<PropTypes & ViewProps> = ({currency:Currency,onSelect,selected,...ViewProps}) => {
    const {shake,ShakeContainer} = useShake()
    const hookState = useHookstate(Store)
    const displayNumbers = hookState.displayNumbers.get()
    return (<ShakeContainer>
        <TouchableWithoutFeedback onPress={()=>{
            onSelect && onSelect()
            shake()
        }}><View {...ViewProps} style={[styles.container,ViewProps.style,(selected?styles.selected:{})]}>
            <View style={styles.contentBox}>
                <Text style={styles.name}>
                    {Currency.name}
                </Text>
                <Text style={styles.price}>
                    {`${Tools.formatNumber(Currency.getPrice(),2)} $`}
                </Text>
                <Text style={[styles.change,{color:Currency.getChange()>0?Theme.colors.Accent2:Theme.colors.Accent1}]}>
                    {`${Currency.getChange()>0? "+": "-"} ${Tools.formatNumber(Math.abs(Currency.getChange()),2)}%`}
                </Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>
                        {Tools.formatNumber(Currency.getAmount(),Currency.precision,displayNumbers)}
                    </Text>
                    <Text style={styles.symbol}>
                        {Currency.symbol}
                    </Text>
                </View>
            </View>
            <View style={styles.iconBox}>
                <Currency.icon width={"100%"} height={"100%"}/>
            </View>
        </View></TouchableWithoutFeedback>
    </ShakeContainer>)
}


const styles = StyleSheet.create({
    container: {
        width:180,
        height:110,
        borderRadius:30,
        backgroundColor:Theme.colors.Background,
        overflow:"hidden",

        shadowColor: Theme.colors.Black,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    iconBox:{
        height: 120,
        width: 120,
        position: "absolute",
        right: -40,
        top: -5,
        borderRadius:200,
    },
    selected:{
        borderColor:Theme.colors.Accent2,
        borderWidth:4,
    },
    contentBox:{
        width:100,
        height:"100%",
        paddingLeft:8,
        paddingTop:10
    },
    name:Typography.create({
        color:Theme.colors.Black,
        fontSize:16,

    }),
    price:Typography.create({
        color:Theme.colors.Primary500,
        fontSize:8,
        marginLeft:2
    }),
    change:Typography.create({
        fontSize:20,
        marginVertical:5
    }),
    amountContainer:{
      flexDirection:"row",
      alignItems:"flex-end"
    },
    amount:Typography.create({
        color:Theme.colors.Black,
        fontSize:12,
    }),
    symbol:Typography.create({
        color:Theme.colors.Black,
        fontSize:9,
        marginLeft:3
    }),
})
