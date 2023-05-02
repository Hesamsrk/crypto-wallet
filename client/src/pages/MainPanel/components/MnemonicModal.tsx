import React, {PropsWithChildren} from 'react';
import {UIModal} from "../../../components/UI/UIModal";
import {Chip} from "@react-native-material/core";
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Typography} from "../../../styles/typography";
import {Theme} from "../../../styles/theme";

const windowWidth = Dimensions.get('window').width;


interface PropTypes {
    onClose: () => void
    open: boolean
    data: string[]
}

export const MnemonicModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {


    return <UIModal containerStyle={{width:Math.min(windowWidth - 20, 400)}} title={"Pass Phrases"} onClose={props.onClose} open={props.open}>
        <View style={styles.container}>
            {
                props.data && props.data.map((word) => <Chip labelStyle={styles.chipLabel} style={styles.chip} label={word} key={word}/>)
            }
        </View>
        <Text style={styles.subtitle}>
            You can use these 24 phrases to recover your wallet in case you lost your Image or forgot your Pattern. You can
            also use these phrases to import your wallet in other software wallets such as TrustWallet or SafePal.
        </Text>
    </UIModal>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width:"100%",
        marginBottom:10,
        justifyContent:"center",
    },
    chip: {
        marginHorizontal: 4,
        marginVertical:8,
    },
    chipLabel:Typography.create({
        color: Theme.colors.Text.Dark,
        fontSize:15
    }),
    subtitle: Typography.create({
        color: Theme.colors.Text.Light,
        marginVertical: 10,
        textAlign: "center",
        fontSize:12
    })
});



