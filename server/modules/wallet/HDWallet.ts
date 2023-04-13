import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from "bip39"
import {BitcoinPublicKeyToAddress} from "./Bitcoin";
import {EthereumWallet} from "./Ethereum";

const bip32 = BIP32Factory(ecc);


export const getHDWalletNodes = async (masterSeed: string, accountID: number = 0) => {
    const entropy = Buffer.from(masterSeed, 'base64');
    const mnemonic = bip39.entropyToMnemonic(entropy);
    const Master = bip32.fromSeed(await bip39.mnemonicToSeed(mnemonic));

    // Using the BIP44 standard:
    const Bitcoin = Master.derivePath(`m/44'/0'/${accountID}'`)
    const Ethereum = Master.derivePath(`m/44'/60'/${accountID}'`);
    // const Tron = Master.derivePath(`m/44'/195'/${accountID}'`)

    return {Master, Bitcoin, Ethereum,}
}

export interface KeyPair {
    privateKey: string
    address: string
}

export type Wallet = {
    [key in "Bitcoin" | "Ethereum"]: KeyPair;
};


export const getWallet = async (masterSeed: string, accountID: number = 0): Promise<Wallet> => {
    const {Ethereum, Bitcoin} = await getHDWalletNodes(masterSeed, accountID)

    const etherWallet = Ethereum.privateKey && EthereumWallet(Ethereum.privateKey)

    return {
        Bitcoin: {
            address: Bitcoin.publicKey ? BitcoinPublicKeyToAddress(Bitcoin.publicKey) : "",
            privateKey: Bitcoin.privateKey ? Bitcoin.privateKey.toString("hex") : ""
        },
        Ethereum: {
            address: etherWallet ? etherWallet.address : "",
            privateKey: etherWallet ? etherWallet.privateKey : ""
        }
    }
}


