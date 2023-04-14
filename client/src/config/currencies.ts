import {FC} from "react";
import {SvgProps} from "react-native-svg";
import BTCIcon from "../assets/symbols/BTC.svg"
import BTCTIcon from "../assets/symbols/BTCT.svg"
import BNBIcon from "../assets/symbols/BNB.svg"
import DOGEIcon from "../assets/symbols/DOGE.svg"
import ETHIcon from "../assets/symbols/ETH.svg"
import TRXIcon from "../assets/symbols/TRX.svg"
import USDTIcon from "../assets/symbols/USDT.svg"

export type SupportedSymbols = "USDT" | "BTC" | "BTCT" | "ETH" | "BNB" | "TRX" | "DOGE"

export interface Currency {
    name: string
    symbol: SupportedSymbols
    icon: FC<SvgProps>
    precision: number
    getPrice: () => number
    getAmount: () => number
    getChange: () => number
    disabled?: boolean
}

export const Currencies: Currency[] = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        precision: 6,
        icon: BTCIcon,
        getPrice: () => (52000.3112361236),
        getAmount: () => (12.1261236),
        getChange: () => (-5.612361236),
    },
    {
        name: "Testnet",
        symbol: "BTCT",
        precision: 6,
        icon: BTCTIcon,
        getPrice: () => (52000.3112361236),
        getAmount: () => (12.1261236),
        getChange: () => (-5.612361236),
    }, {
        name: "Ethereum",
        symbol: "ETH",
        precision: 5,
        icon: ETHIcon,
        getPrice: () => (1200.612361263),
        getAmount: () => (5.126236),
        getChange: () => (+0.51236126),
    },
    {
        name: "TetherUS(TRC20)",
        symbol: "USDT",
        precision: 2,
        icon: USDTIcon,
        getPrice: () => (1200.51261236),
        getAmount: () => (12.1236123612),
        getChange: () => (+5.61235235),
        disabled: true
    },
    {
        name: "Binance",
        symbol: "BNB",
        precision: 2,
        icon: BNBIcon,
        getPrice: () => (340),
        getAmount: () => (15125),
        getChange: () => (-2.43),
        disabled: true
    },
    {
        name: "Tron",
        symbol: "TRX",
        precision: 2,
        icon: TRXIcon,
        getPrice: () => (0.03),
        getAmount: () => (12),
        getChange: () => (+1.01),
        disabled: true
    },
    {
        name: "Doge Coin",
        symbol: "DOGE",
        precision: 2,
        icon: DOGEIcon,
        getPrice: () => (0.00041),
        getAmount: () => (4124),
        getChange: () => (-0.05),
        disabled: true
    },
]

