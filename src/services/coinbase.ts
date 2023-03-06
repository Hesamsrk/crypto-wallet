import axios from "axios";
import {Configs} from "../config";

const handler = new axios.Axios({
    baseURL: "https://pro-api.coinmarketcap.com",
    headers: {
        "X-CMC_PRO_API_KEY": Configs.COINBASE_API_TOKEN
    },
})

interface metadataOT {
    status: {
        timestamp: string
    },
    data: {
        [key in "BTC" | "USDT" | "ETH" | "TRX" | "DOGE" | "BNB"]: {
            quote: {
                USD: {
                    price: 288.285430973451,
                    percent_change_24h: 0.09489219,
                }
            }
        }
    }
}


const endpoints = {
    Metadata: {
        description: "Get data of up to 100 different symbols at once",
        url: "v2/cryptocurrency/quotes/latest",
        params: {
            symbol: "BTC,USDT,ETH,TRX,DOGE,BNB"
        },
        method: "GET",
        handler: () => handler.get<metadataOT>(endpoints.Metadata.url, {params: endpoints.Metadata.params})
    }
}


export const coinbase = {
    handler,
    endpoints
}