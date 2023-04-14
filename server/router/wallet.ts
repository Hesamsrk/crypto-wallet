import express, {Request} from "express";
import {getWallet, isValidEntropyForBip39} from "../modules/wallet/HDWallet";

export const walletRouter = express.Router()

walletRouter.post("/address", async (req: Request<undefined, { error: string } | { data: { [key: string]: string } }, { masterSeed: string, accountID: number }, undefined>, res) => {
    const {masterSeed, accountID} = req.body || {}
    if (!masterSeed) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    }else{
        if(!isValidEntropyForBip39(masterSeed)){
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
    }else{
        if(!isValidEntropyForBip39(masterSeed)){
            return res.status(400).json({error: "MasterSeed is not a valid entropy!"})
        }
    }
    const wallet = await getWallet(masterSeed, accountID || 0)
    return res.status(200).json({data: Object.fromEntries(Object.entries(wallet).map(([key, {privateKey}]) => ([key, privateKey])))})
})

