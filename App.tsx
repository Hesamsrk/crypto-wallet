import {NativeRouter} from "react-router-native";
import {KeyGen} from "./src/modules/keyGen/keyGen";
import {Store} from "./src/store";
import {Inside} from "./src/modules/inside/inside";
import {useEffect} from "react";
import {db} from "./src/db";
import {useHookstate} from "@hookstate/core";

const App = () => {
    const hookState = useHookstate(Store)
    const privateKey = hookState.privateKey.get()

    useEffect(()=>{
        if(privateKey.length<1){
            db.get(db.keys.PRIVATE_KEY).then(PK=>{
                PK.length>1 && hookState.privateKey.set(PK)
            })
        }
    },[])

    useEffect(()=>{
        console.log("PK:",privateKey)
    },[privateKey])
    return (
        <NativeRouter>
            {
                privateKey.length > 1 ? <Inside/> : <KeyGen/>
            }
        </NativeRouter>
    );
}

export default App
