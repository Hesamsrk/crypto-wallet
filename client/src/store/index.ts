import {hookstate} from '@hookstate/core';

interface IStore {
    privateKey: string
    passCode:string
    authenticated:boolean
    displayNumbers:boolean
    networkStatus: "connecting" | "connected" | "disconnected",
    backend?:{
        baseURL:string,
        authToken:string
    },
    accountID:number
}


export const Store = hookstate<IStore>({
    privateKey: "",
    passCode:"",
    authenticated:false,
    displayNumbers:true,
    networkStatus: "connecting",
    backend:undefined,
    accountID:0
});






