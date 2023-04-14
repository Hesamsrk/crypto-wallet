import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from "bip39"
import {BitcoinWallet} from "./Bitcoin";
import {EthereumWallet} from "./Ethereum";

const bip32 = BIP32Factory(ecc);


export const getHDWalletNodes = async (masterSeed: string, accountID: number = 0) => {
    const entropy = Buffer.from(masterSeed, 'base64');
    const mnemonic = bip39.entropyToMnemonic(entropy);
    const Master = bip32.fromSeed(await bip39.mnemonicToSeed(mnemonic));

    // Using the BIP44 standard:
    const Bitcoin = Master.derivePath(`m/44'/0'/${accountID}'`)
    const Ethereum = Master.derivePath(`m/44'/60'/${accountID}'`);
    const Testnet = Master.derivePath(`m/44'/1'/${accountID}'`)
    // const Tron = Master.derivePath(`m/44'/195'/${accountID}'`)
    // const DogeCoin = Master.derivePath(`m/44'/3'/${accountID}'`)

    return {Master, Bitcoin, Ethereum, Testnet}
}

export interface KeyPair {
    privateKey: string
    address: string
}

export type Wallet = {
    [key in "BTC" | "ETH" | "BTCT"]: KeyPair;
};


export const getWallet = async (masterSeed: string, accountID: number = 0): Promise<Wallet> => {
    const {Ethereum, Bitcoin, Testnet} = await getHDWalletNodes(masterSeed, accountID)

    const etherWallet = Ethereum.privateKey && EthereumWallet(Ethereum.privateKey)
    const bitcoinWallet = BitcoinWallet(Bitcoin, false)
    const bitcoinTestNetWallet = BitcoinWallet(Testnet, true)
    return {
        BTC: {
            address: bitcoinWallet.address || "",
            privateKey: bitcoinWallet.privateKey
        },
        ETH: {
            address: etherWallet ? etherWallet.address : "",
            privateKey: etherWallet ? etherWallet.privateKey : ""
        },
        BTCT: {
            address: bitcoinTestNetWallet.address || "",
            privateKey: bitcoinTestNetWallet.privateKey
        }
    }
}

