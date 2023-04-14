import {backendClient} from "./client";
import {SupportedSymbols} from "../../config/currencies";
import {generateQuery} from "../index";


export const useCryptoAddresses = generateQuery<{ masterSeed: string, accountID?: number},{ [key in SupportedSymbols]: string }>({
    queryKey:"useCryptoAddresses",
    axios:{
        instance:backendClient,
        method:"POST",
        path:"/wallet/address"
    },
    queryOptions:{keepPreviousData: true}
})

export const useCryptoPrivateKeys = generateQuery<{ masterSeed: string, accountID?: number },{ [key in SupportedSymbols]: string }>({
    queryKey:"useCryptoPrivateKeys",
    axios:{
        instance:backendClient,
        method:"POST",
        path:"/wallet/privateKeys"
    },
    queryOptions:{keepPreviousData: true}
})
