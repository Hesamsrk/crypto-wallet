import express, {Request} from "express";
import {getWallet, isValidEntropyForBip39} from "../modules/wallet/HDWallet";
import {getTestnetBalance, transferBitcoinTestnet} from "../services/blockcypher";
import {isValidTestnetAddress} from "../modules/wallet/Testnet";

export const walletRouter = express.Router()

walletRouter.post("/address", async (req: Request<undefined, { error: string } | { data: { [key: string]: string } }, { masterSeed: string, accountID: number }, undefined>, res) => {
    const {masterSeed, accountID} = req.body || {}
    if (!masterSeed) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    } else {
        if (!isValidEntropyForBip39(masterSeed)) {
            return res.status(400).json({error: "MasterSeed is not a valid entropy!"})
        }
    }
    const wallet = await getWallet(masterSeed, accountID || 0)
    return res.status(200).json({data: Object.fromEntries(Object.entries(wallet).map(([key, {address}]) => ([key, address])))})
})

walletRouter.post("/privateKey", async (req: Request<undefined, { error: string } | { data: { [key: string]: string } }, { masterSeed: string, accountID: number }, undefined>, res) => {
    const {masterSeed, accountID} = req.body || {}
    if (!masterSeed) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    } else {
        if (!isValidEntropyForBip39(masterSeed)) {
            return res.status(400).json({error: "MasterSeed is not a valid entropy!"})
        }
    }
    const wallet = await getWallet(masterSeed, accountID || 0)
    return res.status(200).json({data: Object.fromEntries(Object.entries(wallet).map(([key, {privateKey}]) => ([key, privateKey])))})
})


walletRouter.post("/balance", async (req, res) => {
    const supportedSymbols = ["TBTC"]

    const {address, symbol} = req.body || {}
    if (!address) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    }
    if (!symbol) {
        return res.status(400).json({error: "Body parameter not defined: symbol"})
    }

    if (!supportedSymbols.includes(symbol)) {
        return res.status(400).json({error: "symbol is not supported!"})
    }

    let balance = 0
    switch (symbol) {
        case "TBTC":
            if (!isValidTestnetAddress(address)) {
                return res.status(400).json({error: `Address is not a valid ${symbol} address!`})
            }
            balance = await getTestnetBalance(address)
            break
    }
    return res.json({data: balance})
})


walletRouter.post("/balance/list", async (req, res) => {

    const {masterSeed, accountID} = req.body || {}
    if (!masterSeed) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    } else {
        if (!isValidEntropyForBip39(masterSeed)) {
            return res.status(400).json({error: "MasterSeed is not a valid entropy!"})
        }
    }
    const wallet = await getWallet(masterSeed, accountID || 0)
    return res.json({
        data: {
            "TBTC": await getTestnetBalance(wallet.TBTC.address),
        }
    })
})


walletRouter.post("/transfer", async (req, res) => {
    const supportedSymbols = ["TBTC"]

    const {fromAddress, toAddress, symbol, amount, privateKey} = req.body || {}
    if (!fromAddress) {
        return res.status(400).json({error: "Body parameter not defined: fromAddress"})
    }
    if (!toAddress) {
        return res.status(400).json({error: "Body parameter not defined: toAddress"})
    }
    if (!privateKey) {
        return res.status(400).json({error: "Body parameter not defined: privateKey"})
    }
    if (!symbol) {
        return res.status(400).json({error: "Body parameter not defined: symbol"})
    }
    if (!amount) {
        return res.status(400).json({error: "Body parameter not defined: amount"})
    }

    if (!supportedSymbols.includes(symbol)) {
        return res.status(400).json({error: "symbol is not supported!"})
    }
    switch (symbol) {
        case "TBTC":
            if (!isValidTestnetAddress(fromAddress)) {
                return res.status(400).json({error: `fromAddress is not a valid ${symbol} address!`})
            }
            if (!isValidTestnetAddress(toAddress)) {
                return res.status(400).json({error: `toAddress is not a valid ${symbol} address!`})
            }
            return res.json({data: await transferBitcoinTestnet({privateKey, fromAddress, toAddress, amount: +amount})})
    }

})

