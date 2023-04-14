import express, {Express} from 'express';
import dotenv from 'dotenv';
import {walletRouter} from "./router/wallet"
import morgan from "morgan"

dotenv.config();
const port = process.env.PORT || 9090;

const app: Express = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
    const auth_token = process.env.AUTH_TOKEN
    if (!auth_token) {
        return next()
    }
    const header_token = req.header("Authorization")
    if (!header_token || header_token !== auth_token) {
        return res.status(401).json({error: "Authorization token required!"})
    }
    next()
})
app.get('/', (req, res) => res.send("This server is the back-end for crypto-wallet."));
app.use("/wallet", walletRouter)
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}).setTimeout(5000);