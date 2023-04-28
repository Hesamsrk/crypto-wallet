import axios from 'axios';

export async function getTestnetBalance(address: string): Promise<number> {
    try {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
        return response.data.balance*Math.pow(10,-8);
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function sendTestnetTransaction(fromAddress: string, toAddress: string, amount: number, privateKey: string): Promise<string> {
    try {
        // Get unspent outputs (UTXOs) for the sender's address
        const utxoResponse = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${fromAddress}/full`);
        const utxos = utxoResponse.data.txrefs;

        // Calculate the total value of the sender's UTXOs
        const totalValue = utxos.reduce((acc: number, utxo: any) => acc + utxo.value, 0);

        // Calculate the change and output amounts
        const change = totalValue - amount;
        const outputs = [
            {
                addresses: [toAddress],
                value: amount,
            },
        ];
        if (change > 0) {
            outputs.push({
                addresses: [fromAddress],
                value: change,
            });
        }

        // Create the transaction data
        const txData = {
            inputs: utxos.map((utxo: any) => ({
                addresses: [fromAddress],
                output_index: utxo.tx_output_n,
                output_value: utxo.value,
                prev_hash: utxo.tx_hash,
            })),
            outputs,
        };

        // Sign the transaction
        const signResponse = await axios.post(`https://api.blockcypher.com/v1/btc/test3/txs/new`, txData);
        const signedTx = signResponse.data;
        signedTx.signatures.forEach((signature: any, index: number) => {
            signature.privatekey = privateKey;
        });

        // Broadcast the transaction
        const broadcastResponse = await axios.post(`https://api.blockcypher.com/v1/btc/test3/txs/send`, signedTx);
        return broadcastResponse.data.tx.hash;
    } catch (error) {
        console.error(error);
        return '';
    }
}
