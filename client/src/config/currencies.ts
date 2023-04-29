import {FC} from "react";
import {SvgProps} from "react-native-svg";
import BTCIcon from "../svg/symbols/BTC.svg"
import TBTCIcon from "../svg/symbols/TBTC.svg"
import BNBIcon from "../svg/symbols/BNB.svg"
import DOGEIcon from "../svg/symbols/DOGE.svg"
import ETHIcon from "../svg/symbols/ETH.svg"
import TRXIcon from "../svg/symbols/TRX.svg"
import USDTIcon from "../svg/symbols/USDT.svg"

export type SupportedSymbols = "USDT" | "BTC" | "TBTC" | "ETH" | "BNB" | "TRX" | "DOGE"

export interface Currency {
    name: string
    symbol: SupportedSymbols
    icon: FC<SvgProps>
    precision: number
    disabled?: boolean
}

export const Currencies: Currency[] = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        precision: 6,
        icon: BTCIcon,
    },
    {
        name: "Testnet",
        symbol: "TBTC",
        precision: 6,
        icon: TBTCIcon,
    }, {
        name: "Ethereum",
        symbol: "ETH",
        precision: 5,
        icon: ETHIcon,
    },
    {
        name: "TetherUS",
        symbol: "USDT",
        precision: 2,
        icon: USDTIcon,
        disabled: true
    },
    {
        name: "Binance",
        symbol: "BNB",
        precision: 2,
        icon: BNBIcon,
        disabled: true
    },
    {
        name: "Tron",
        symbol: "TRX",
        precision: 2,
        icon: TRXIcon,
        disabled: true
    },
    {
        name: "Doge Coin",
        symbol: "DOGE",
        precision: 2,
        icon: DOGEIcon,
        disabled: true
    },
]

