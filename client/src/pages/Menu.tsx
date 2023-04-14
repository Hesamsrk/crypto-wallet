import React from 'react';
import {Page} from "../components/layout/Page";
import { StyleSheet, View, ViewStyle,} from "react-native";
import {Logo} from "../components/UI/Logo";
import {Button} from "../components/UI/Button";
import {} from '@react-navigation/native';


export const Menu = Page(({navigation}) => {
    return (<>
        <View style={styles.centralContainer}>
            <Logo style={styles.logo}/>
            <Button label={"Import Wallet"} style={styles.button} onClick={()=>{
                navigation.navigate("ImportWallet")
            }}/>
        </View>
    </>)
}, {
    justifyContent: "center",
    alignItems: "center",
})


const styles = StyleSheet.create<{
    centralContainer:ViewStyle,
    logo: ViewStyle,
    button:ViewStyle
}>({
    centralContainer:{
        width:"100%",
    },
    logo: {
        width:"100%",
        height:150,
    },
    button:{
        margin:20
    }
})