import {useEffect, useState} from "react";
import {db} from "../db";
import {useHookstate} from "@hookstate/core";
import {Store} from "../store";

export const useStorageLoader = () => {
    const hookState = useHookstate(Store)
    const [loaded,setLoaded] = useState<{privateKeyLoaded:boolean,passCodeLoaded:boolean}>({privateKeyLoaded:false,passCodeLoaded:false})
    const memory = {
        privateKey: hookState.privateKey.get(),
        passCode: hookState.passCode.get()
    }
    useEffect(() => {
        memory.privateKey.length < 1 && db.get((db.keys.PRIVATE_KEY)).then(value => value.length > 0 && hookState.privateKey.set(value)).then(()=>setLoaded(old=>({...old,privateKeyLoaded:true})))
        memory.passCode.length < 1 && db.get((db.keys.PASS_CODE)).then(value => value.length > 0 && hookState.passCode.set(value)).then(()=>setLoaded(old=>({...old,passCodeLoaded:true})))
        db.get((db.keys.BACK_END_HOST)).then(value => value.length > 0 && hookState.backend.set(old=>({...old,baseURL:value})))
        db.get((db.keys.BACK_END_AUTH)).then(value => value.length > 0 && hookState.backend.set(old=>({...old,authToken:value})))
    }, [])

    return {...loaded}
}