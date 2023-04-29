import {Currencies, SupportedSymbols} from "../../config/currencies";
import {generateQuery} from "../index";


export const useCryptoAddresses = generateQuery<{ masterSeed: string, accountID?: number }, { data: { [key in SupportedSymbols]: string } }>({
    queryKey: "useCryptoAddresses",
    axios: {
        method: "POST",
        path: "/wallet/address"
    },
    queryOptions: {keepPreviousData: true,refetchOnWindowFocus:false,refetchOnReconnect:false,refetchOnMount:false,refetchIntervalInBackground:false,refetchInterval:false}
})

export const useCryptoPrivateKeys = generateQuery<{ masterSeed: string, accountID?: number }, { data: { [key in SupportedSymbols]: string } }>({
    queryKey: "useCryptoPrivateKeys",
    axios: {
        method: "POST",
        path: "/wallet/privateKey"
    },
    queryOptions: {keepPreviousData: true,refetchOnWindowFocus:false,refetchOnReconnect:false,refetchOnMount:false,refetchIntervalInBackground:false,refetchInterval:false}
})


export const usePing = generateQuery<undefined, boolean>({
    queryKey: "usePing",
    axios: {
        method: "GET",
        path: "/ping",
        config: {
            timeout: 2000,
        }
    }
})


export const useBalanceList = generateQuery<{ masterSeed, accountID }, { data: { [key in SupportedSymbols]: number } }>({
    queryKey: "useBalanceList",
    axios: {
        method: "POST",
        path: "/wallet/balance/list",
    },
    queryOptions: {keepPreviousData: true,refetchOnWindowFocus:false,refetchOnReconnect:false,refetchOnMount:false,refetchIntervalInBackground:false,refetchInterval:false}
})

export type marketPrices = {
    [key in SupportedSymbols]: {
        price: number,
        change: number
    }
}

export const useMarketPrices = generateQuery<undefined, {
    data: marketPrices
}>({
    queryKey: "useMarketPrices",
    axios: {
        method: "GET",
        path: `/market/prices?symbols=${Currencies.map(i => i.symbol).join(",")}`,
    },
    queryOptions: {keepPreviousData: true,refetchOnWindowFocus:false,refetchOnReconnect:false,refetchOnMount:false,refetchIntervalInBackground:false,refetchInterval:false}
})
