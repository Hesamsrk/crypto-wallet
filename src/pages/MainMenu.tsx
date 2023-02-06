import React from 'react';
import {Page} from "../components/layout/Page";
import {Alert, StyleSheet, View, ViewStyle,} from "react-native";
import {Logo} from "../components/UI/Logo";
import {Button} from "../components/UI/Button";


export const MainMenu = Page(() => {
    return (<>
        <View style={styles.centralContainer}>
            <Logo style={styles.logo}/>
            <Button label={"Import Wallet"} style={styles.button} onClick={()=>{
                Alert.alert("Coming soon!","This functionality is not implemented yet!")
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