import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, ViewProps} from 'react-native';
import {BarCodeScannedCallback, BarCodeScanner} from 'expo-barcode-scanner';
import {Theme} from "../../../styles/theme";
import {Typography} from "../../../styles/typography";

interface PropTypes{
    onScanned: BarCodeScannedCallback
}

export const BarcodeScanner = (props:ViewProps & PropTypes)=>{
    const [hasPermission, setHasPermission] = useState(null);
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    if (hasPermission === null) {
        return <Text style={styles.subtitle}>Requesting for camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.subtitle}>No access to camera!</Text>;
    }
    return <View style={[styles.container,props.style]}>
        <BarCodeScanner
            onBarCodeScanned={props.onScanned}
            style={styles.scanner}
        />
    </View>
}

const styles = StyleSheet.create({
    scanner:{
        position: 'relative',
        width:"100%",
        aspectRatio:1,
        zIndex:100,
        backgroundColor:Theme.colors.Transparent
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    },
    subtitle:Typography.create({
        color:Theme.colors.Text.Light,
        marginVertical:10,
        textAlign:"center"
    }),
});
