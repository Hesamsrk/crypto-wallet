import express from "express";
import {getCryptoPrices} from "../services/market";

export const marketRouter = express.Router()


marketRouter.get("/prices", async (req, res) => {
    const {symbols} = req.query
    if (!symbols) {
        return res.status(400).json({error: "Query parameter not defined: symbols"})
    }
    const Symbols = typeof symbols === "string" ? symbols.split(",") : []
    const prices = await getCryptoPrices(Symbols)
    console.log({prices})
    return res.json({data: Object.fromEntries(prices.map(({symbol, price, change}) => [symbol, {price, change}]))})
})