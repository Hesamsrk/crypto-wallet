import {Currencies, SupportedSymbols} from "../../config/currencies";
import {generateMutation, generateQuery} from "../index";
import {Alert, ToastAndroid} from "react-native";
import {setStringAsync} from "expo-clipboard";
import {logger} from "../../utils/logger";


export const useCryptoAddresses = generateQuery<{ masterSeed: string, accountID?: number }, { data: { [key in SupportedSymbols]: string } }>({
    queryKey: "useCryptoAddresses",
    axios: {
        method: "POST",
        path: "/wallet/address"
    },
    queryOptions: {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchInterval: false
    }
})

export const useCryptoPrivateKeys = generateQuery<{ masterSeed: string, accountID?: number }, { data: { [key in SupportedSymbols]: string } }>({
    queryKey: "useCryptoPrivateKeys",
    axios: {
        method: "POST",
        path: "/wallet/privateKey"
    },
    queryOptions: {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchInterval: false
    }
})

export const useMnemonic = generateQuery<{ masterSeed: string }, { data: string[] }>({
    queryKey: "useMnemonic",
    axios: {
        method: "POST",
        path: "/wallet/mnemonic"
    },
    queryOptions: {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchInterval: false
    }
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
    queryOptions: {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchInterval: false
    }
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
    queryOptions: {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchInterval: false
    }
})




export const useSubmitTransaction = generateMutation<{
    fromAddress: string,
    toAddress: string,
    privateKey: string,
    amount: number,
    symbol: SupportedSymbols
}, {
    data: {
        status: boolean,
        hash: string,
        fees: number
        balance: number
        message?: string
    }
}>({
    mutationKey: "useSubmitTransaction",
    axios: {
        method: "POST",
        path: `/wallet/transfer`,
    },
    mutationOptions: {
        retry: false, onError: () => {
            Alert.alert("Process failed", "The transaction did not work due to some issues. Try again later.")
        },
        onSuccess: (res) => {
            if (res?.data?.status) {
                const data = res.data
                logger.log({data})
                Alert.alert("Process successful", `Your assets have been transferred.\nFee:${data.fees}\nBalance:${data.balance}`
                    , [{
                        text: "Copy TX hash", style: "default", onPress: () => {
                            setStringAsync(data.hash).then(result => result === true && ToastAndroid.show('Transaction Hash Copied!', ToastAndroid.SHORT))
                        }
                    }, {
                        text: "Ok", style: "default"
                    }])
            } else {
                const status = res?.data?.status
                if (status === false) {
                    Alert.alert("Process failed!", "" + res.data.message)
                }

            }
        }
    }
})