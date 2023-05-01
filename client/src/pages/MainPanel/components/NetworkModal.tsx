import React, {PropsWithChildren, useState} from 'react';
import {UIModal} from "../../../components/UI/UIModal";
import {Input} from "../../../components/UI/Input";
import {Button} from "@react-native-material/core";
import {Theme} from "../../../styles/theme";
import {Dimensions} from 'react-native';
import {useHookstate} from "@hookstate/core";
import {Store} from "../../../store";
import {db} from "../../../db";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";
import {ButtonBase} from "../../../components/UI/ButtonBase";
import {BarcodeScanner} from "./BarcodeScanner";

const windowWidth = Dimensions.get('window').width;
const width = Math.min(windowWidth - 50, 300)


interface QRCodeConfig {
    host: string
    authToken: string
}

const parseConfigs = (data: string): QRCodeConfig => {
    const conf = JSON.parse(data) as QRCodeConfig
    return {
        host: conf.host || "host",
        authToken: conf.authToken || "auth",
    }
}

interface PropTypes {
    onClose: () => void
    open: boolean
};
export const NetworkModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    const hookState = useHookstate(Store)
    const backend = hookState.backend.get()
    const [host, setHost] = useState<string>("")
    const [auth, setAuth] = useState<string>("")
    const [scannerToggle, setScannerToggle] = useState<boolean>(false)

    return <UIModal title={"Setup Server"} onClose={props.onClose} open={props.open}>
        {
            scannerToggle ? <BarcodeScanner style={{width}} onScanned={({data}) => {
                const conf = parseConfigs(data)
                setHost(conf.host)
                setAuth(conf.authToken)
                setScannerToggle(false)
            }}/> : <>
                <Input style={{width}} label={"Host"} onChangeText={(t) => setHost(t)} value={host}
                       helperText={backend?.baseURL || ""}
                       trailing={<ButtonBase onClick={() => setScannerToggle(true)}><FontAwesomeIcon size={30}
                                                                                                     color={Theme.colors.Primary400}
                                                                                                     icon={faQrcode}/></ButtonBase>}/>
                <Input style={{width}} label={"Authentication Token"} onChangeText={(t) => setAuth(t)} value={auth}
                       helperText={backend?.authToken || ""}/>
            </>
        }

        <Button title={"Submit"} color={Theme.colors.Accent2} tintColor={Theme.colors.Gray600} style={{marginTop: 10}}
                onPress={() => {
                    hookState.backend.set({authToken: auth, baseURL: host})
                    db.set(db.keys.BACK_END_AUTH, auth)
                    db.set(db.keys.BACK_END_HOST, host)
                    props.onClose()
                }}/>
    </UIModal>
};


