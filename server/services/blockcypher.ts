import axios, {AxiosError} from 'axios';
import bitcore from "bitcore-lib"

export async function getTestnetBalanceSatoshi(address: string): Promise<number> {
    try {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
        return response.data.balance;
    } catch (error) {
        console.error("Failed to fetch TBTC balance!")
        return 0;
    }
}


export async function sendTestnetTransaction(args: {
    fromAddress: string,
    toAddress: string,
    amountSatoshis: number,
    privateKeyWIF: string,
    amountFeeSatoshis?: number
}) {
    const utxos = await getTestnetUtxos(args.fromAddress)
    const balance = utxos.map(utxo => utxo.satoshis).reduce((a, b) => a + b)
    const transaction = new bitcore.Transaction()
    transaction.from(utxos.map(utxo => new bitcore.Transaction.UnspentOutput(utxo)))
        .to(args.toAddress, args.amountSatoshis)
        .change(args.fromAddress)
        .sign(args.privateKeyWIF)

    const hex = transaction.serialize()
    try{
        const response = await axios.post<{ tx: { hash: string, fees: number } }>(`https://api.blockcypher.com/v1/btc/test3/txs/push`, {
            tx: hex,
        });
        if (response.data) {
            const {tx: {fees, hash}} = response.data
            return {
                status: true,
                hash,
                fees,
                balance: balance - args.amountSatoshis - fees
            }
        } else {
            return {
                status: false,
                message:"No response returned from blockcypher!"
            }
        }
    }catch (e){
        return {
            status:false,
            message:"Transaction is correct but blockcypher refused to submit Transaction! Try again later."
        }
    }
}


interface UTXO {
    txId: string,
    outputIndex: number,
    address: string,
    script: string,
    satoshis: number
}

export async function getTestnetUtxos(address: string): Promise<UTXO[]> {

    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}?unspentOnly=true&includeScript=true`;
    const response = await axios.get<{
        txrefs: {
            tx_hash: string,
            script: string
            tx_output_n: number
            value: number
        }[]
    }>(url);
    const txs = response?.data?.txrefs || []
    return txs.map(tx => {
        const res: UTXO = {
            "txId": tx.tx_hash,
            "outputIndex": tx.tx_output_n,
            "address": address,
            "script": tx.script,
            "satoshis": tx.value
        }
        return res
    }).filter(item => item !== undefined) as UTXO[]
}



