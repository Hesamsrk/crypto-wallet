import express, {Request} from "express";
import {getHDWalletNodes, getWallet} from "../modules/wallet/HDWallet";

export const apiRouter = express.Router()

apiRouter.get("/wallet", async (req: Request<undefined, { error: string } | { data: { wallet:any } }, { masterSeed: string }, undefined>, res) => {
    console.log({body: req.body})
    const masterSeed = req.body?.masterSeed
    if (!masterSeed) {
        return res.status(400).json({error: "Body parameter not defined: masterSeed"})
    }
    getHDWalletNodes(masterSeed).then(res => {
        const test = res.Bitcoin.privateKey
        console.log(test && test.toString("hex"))
    })
    const wallet = await getWallet(masterSeed)
    return res.status(200).json({data:{wallet}})
})
