import React, {PropsWithChildren, useState} from 'react';
import {UIModal} from "../../../components/UI/UIModal";
import {Currencies} from "../../../config/currencies";
import {Input, styles} from "../../../components/UI/Input";
import {Button, Text} from "@react-native-material/core";
import {Theme} from "../../../styles/theme";
import {getStringAsync, StringFormat} from 'expo-clipboard';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";
import {ButtonBase} from "../../../components/UI/ButtonBase";
import {Dimensions, View} from 'react-native';
import {BarcodeScanner} from "./BarcodeScanner";
import {Tools} from "../../../utils/tools";
import {useHookstate} from "@hookstate/core";
import {Store} from "../../../store";
import {db} from "../../../db";

const windowWidth = Dimensions.get('window').width;
const width = Math.min(windowWidth - 50, 300)
interface PropTypes {
    onClose: () => void
    open: boolean
};

export const NetworkModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    const hookState = useHookstate(Store)
    const backend = hookState.backend.get()
    const [host,setHost] = useState<string>("")
    const [auth,setAuth] = useState<string>("")

    return <UIModal title={"Setup Server"} onClose={props.onClose} open={props.open}>
        <Input style={{width}} label={"Host"} onChangeText={(t)=>setHost(t)} helperText={backend?.baseURL||""}/>
        <Input style={{width}} label={"Authentication Token"} onChangeText={(t)=>setAuth(t)} helperText={backend?.authToken||""}/>
        <Button title={"Submit"} color={Theme.colors.Accent2} tintColor={Theme.colors.Gray600} style={{marginTop: 10}} onPress={()=>{
            hookState.backend.set({authToken:auth,baseURL:host})
            db.set(db.keys.BACK_END_AUTH,auth)
            db.set(db.keys.BACK_END_HOST,host)
            props.onClose()
        }}/>
    </UIModal>
};


