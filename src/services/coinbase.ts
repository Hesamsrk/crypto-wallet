import axios from "axios";
import {Configs} from "../config";
import {Currencies, SupportedSymbols} from "../config/currencies";
import {Endpoint} from "./index";

const AX = new axios.Axios({
    baseURL: "https://pro-api.coinmarketcap.com",
    headers: {
        "X-CMC_PRO_API_KEY": Configs.COINBASE_API_TOKEN
    },
})

export interface CoinData {
    status: {
        timestamp: string
    },
    data: {
        [key in SupportedSymbols]: {
            quote: {
                USD: {
                    price: number,
                    percent_change_24h: number,
                }
            }
        }
    }
}

const endpoints = {
    coinData: new Endpoint<CoinData>({
            url: "v2/cryptocurrency/quotes/latest",
            params: {
                symbol: Currencies.map(o => o.symbol).join(",")
            },
            method: "GET",
            axios: AX
        }
    ),
}


export const coinbase = {
    AX,
    endpoints
}