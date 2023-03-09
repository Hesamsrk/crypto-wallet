import {hookstate} from '@hookstate/core';

interface IStore {
    privateKey: string
    passCode:string
    authenticated:boolean
    displayNumbers:boolean
}


export const Store = hookstate<IStore>({
    privateKey: "",
    passCode:"",
    authenticated:false,
    displayNumbers:true
});






