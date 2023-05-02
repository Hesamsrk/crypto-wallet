import express, {Request} from "express";
import {getMnemonic, getWallet, isValidEntropyForBip39} from "../modules/wallet/HDWallet";
import {getTestnetBalanceSatoshi, sendTestnetTransaction} from "../services/blockcypher";
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


walletRouter.post("/mnemonic", async (req: Request<undefined, { error: string } | { data: string[] }, { masterSeed: string }, undefined>, res) => {
    const {masterSeed} = req.body || {}
    if (!masterSeed) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    } else {
        if (!isValidEntropyForBip39(masterSeed)) {
            return res.status(400).json({error: "MasterSeed is not a valid entropy!"})
        }
    }
    const mnemonic = await getMnemonic(masterSeed)
    return res.status(200).json({data: mnemonic})
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
            balance = await getTestnetBalanceSatoshi(address)
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
            "TBTC": await getTestnetBalanceSatoshi(wallet.TBTC.address),
        }
    })
})


walletRouter.post("/transfer", async (req, res) => {
    const supportedSymbols = ["TBTC"]

    const {fromAddress, toAddress, symbol, amount, privateKey,fee} = req.body || {}
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
            try{
                const response = await sendTestnetTransaction({privateKeyWIF:privateKey, fromAddress, toAddress, amountSatoshis:+amount})
                return res.json({data:response })
            }catch (e){
                return res.status(500).json({error:"Failed to submit Testnet transaction."})
            }
    }
    res.status(404).json({error:"Symbol not found!"})
})
