import express, {Express} from 'express';
import dotenv from 'dotenv';
import {apiRouter} from "./router/api"
import morgan from "morgan"
dotenv.config();
const port = process.env.PORT || 9090;

const app: Express = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => res.send("This server is the back-end for crypto-wallet."));
app.use("/api", apiRouter)
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}).setTimeout(5000);