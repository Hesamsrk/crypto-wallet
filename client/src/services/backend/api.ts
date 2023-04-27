import {SupportedSymbols} from "../../config/currencies";
import {generateQuery} from "../index";


export const useCryptoAddresses = generateQuery<{ masterSeed: string, accountID?: number},{data:{ [key in SupportedSymbols]: string }}>({
    queryKey:"useCryptoAddresses",
    axios:{
        method:"POST",
        path:"/wallet/address"
    },
    queryOptions:{keepPreviousData: true}
})

export const useCryptoPrivateKeys = generateQuery<{ masterSeed: string, accountID?: number },{data:{ [key in SupportedSymbols]: string }}>({
    queryKey:"useCryptoPrivateKeys",
    axios:{
        method:"POST",
        path:"/wallet/privateKeys"
    },
    queryOptions:{keepPreviousData: true}
})



export const usePing = generateQuery<undefined,boolean>({
    queryKey:"usePing",
    axios:{
        method:"GET",
        path:"/ping",
        config:{
            timeout:2000,
        }
    }})
