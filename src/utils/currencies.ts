import {FC} from "react";
import {SvgProps} from "react-native-svg";
import BTCIcon from "./../assets/symbols/BTC.svg"
import BNBIcon from "./../assets/symbols/BNB.svg"
import DOGEIcon from "./../assets/symbols/DOGE.svg"
import ETHIcon from "./../assets/symbols/ETH.svg"
import TRXIcon from "./../assets/symbols/TRX.svg"
import USDTIcon from "./../assets/symbols/USDT.svg"


export interface Currency {
    name: string
    symbol: string
    icon: FC<SvgProps>
}

export const Currencies: Currency[] = [
    {
        name:"TetherUS",
        symbol:"USDT",
        icon:USDTIcon
    },
    {
        name:"Bitcoin",
        symbol:"BTC",
        icon:BTCIcon
    },
    {
        name:"Ethereum",
        symbol:"ETH",
        icon:ETHIcon
    },
    {
        name:"Binance",
        symbol:"BNB",
        icon:BNBIcon
    },
    {
        name:"Tron",
        symbol:"TRX",
        icon:TRXIcon
    },
    {
        name:"Doge Coin",
        symbol:"DOGE",
        icon:DOGEIcon
    },
]