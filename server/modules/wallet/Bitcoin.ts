import * as bitcoin from 'bitcoinjs-lib';
import {BIP32Interface} from "bip32";

export function BitcoinPublicKeyToAddress(publicKeyBuffer: Buffer): string {
    const publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    return bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash);
}

export function isValidBitcoinAddress(address: string): boolean {
    try {
        const decode = bitcoin.address.fromBase58Check(address);
        const network = bitcoin.networks.bitcoin;
        return decode.version === network.pubKeyHash || decode.version === network.scriptHash;
    } catch (error) {
        return false;
    }
}

export const BitcoinWallet = (node: BIP32Interface, testnet: boolean) => {
    const privateKey = node.toWIF();
    const {address} = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
    });
    return {privateKey, address}
}