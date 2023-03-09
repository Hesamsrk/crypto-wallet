import {useQuery} from "react-query";
import {coinbase, CoinData} from "../services/coinbase";
import {AxiosResponse} from "axios";

export const useCoinData = ()=>{
    return useQuery<AxiosResponse<CoinData>>("USE_COIN_DATA",async ()=>{
        return coinbase.endpoints.coinData.fetch()
    })
}
