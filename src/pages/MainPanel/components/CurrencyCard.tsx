import React from 'react';
import {StyleSheet, View, ViewProps,TouchableWithoutFeedback} from "react-native";
import {Currency} from "../../../utils/currencies";
import {Theme} from "../../../styles/theme";
import {useShake} from "../../../hooks/useShake";
interface PropTypes{
    currency:Currency
    onSelect?:()=>any
    selected?:boolean
}
export const CurrencyCard: React.FC<PropTypes & ViewProps> = ({currency:Currency,onSelect,selected,...ViewProps}) => {
    const {shake,ShakeContainer} = useShake()



    let containerStyles = [styles.container,ViewProps.style]
    selected && containerStyles.push(styles.selected)
    return (<ShakeContainer>
        <TouchableWithoutFeedback onPress={()=>{
            onSelect && onSelect()
            shake()
        }}><View {...ViewProps} style={containerStyles}>
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
        right: -35,
        top: -5,
        borderRadius:200,
    },
    selected:{
        borderColor:Theme.colors.Accent2,
        borderWidth:4,
    }
})
