import axios from 'axios';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';

const ECPair = ECPairFactory(ecc);

export async function getTestnetBalance(address: string): Promise<number> {
    try {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
        return response.data.balance / 100000000;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

const validator = (
    pubkey: Buffer,
    msghash: Buffer,
    signature: Buffer,
): boolean => ECPair.fromPublicKey(pubkey).verify(msghash, signature);


const Test = () => {
    const alice = ECPair.fromWIF(
        'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr',
    );
    const psbt = new bitcoin.Psbt();
    psbt.addInput({
        // if hash is string, txid, if hash is Buffer, is reversed compared to txid
        hash: '7d067b4a697a09d2c3cff7d4d9506c9955e93bff41bf82d439da7d030382bc3e',
        index: 0,
        // non-segwit inputs now require passing the whole previous tx as Buffer
        // nonWitnessUtxo: Buffer.from(
        //     '0200000001f9f34e95b9d5c8abcd20fc5bd4a825d1517be62f0f775e5f36da944d9' +
        //     '452e550000000006b483045022100c86e9a111afc90f64b4904bd609e9eaed80d48' +
        //     'ca17c162b1aca0a788ac3526f002207bb79b60d4fc6526329bf18a77135dc566020' +
        //     '9e761da46e1c2f1152ec013215801210211755115eabf846720f5cb18f248666fec' +
        //     '631e5e1e66009ce3710ceea5b1ad13ffffffff01' +
        //     // value in satoshis (Int64LE) = 0x015f90 = 90000
        //     '905f010000000000' +
        //     // scriptPubkey length
        //     '19' +
        //     // scriptPubkey
        //     '76a9148bbc95d2709c71607c60ee3f097c1217482f518d88ac' +
        //     // locktime
        //     '00000000',
        //     'hex',
        // ),

        // // If this input was segwit, instead of nonWitnessUtxo, you would add
        // // a witnessUtxo as follows. The scriptPubkey and the value only are needed.
        witnessUtxo: {
            script: Buffer.from(
                '76a9148bbc95d2709c71607c60ee3f097c1217482f518d88ac',
                'hex',
            ),
            value: 90000,
        },
    });
    psbt.addOutput({
        address: '1KRMKfeZcmosxALVYESdPNez1AP1mEtywp',
        value: 80000,
    });
    psbt.signInput(0, alice);
    psbt.validateSignaturesOfInput(0, validator);
    psbt.finalizeAllInputs();
    psbt.extractTransaction().toHex();

}

interface transferBitcoinTestnetInputs {
    fromAddress: string
    privateKey: string
    toAddress: string
    amount: number
}


export const transferBitcoinTestnet = async ({
                                                 fromAddress,
                                                 privateKey,
                                                 amount,
                                                 toAddress
                                             }: transferBitcoinTestnetInputs) => {
    const utxoResponse = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${fromAddress}/full`);
    const txHashes = (utxoResponse?.data?.txs as Array<{ hash: string }> || []).map((i: { hash: string }) => i.hash)
    const alice = ECPair.fromWIF(
        privateKey,
    );
    const value = amount * 100000000
    const psbt = new bitcoin.Psbt();

    const scriptPubKey = bitcoin.address.toOutputScript(fromAddress, bitcoin.networks.testnet);
    psbt.addInput({
        hash: txHashes[0],
        index: 0,
        witnessUtxo: {
            script: Buffer.from(
                scriptPubKey.toString("hex"),
                'hex',
            ),
            value,
        },
    })
    psbt.addOutput({
        address: toAddress,
        value: value - 10,
    });
    psbt.signInput(0, alice);
    psbt.validateSignaturesOfInput(0, validator);
    psbt.finalizeAllInputs();
    return psbt.extractTransaction().toHex();
}






