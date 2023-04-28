import * as bitcoin from "bitcoinjs-lib";

export function isValidTestnetAddress(address: string): boolean {
    try {
        const decode = bitcoin.address.fromBase58Check(address);
        const network = bitcoin.networks.testnet;
        return decode.version === network.pubKeyHash || decode.version === network.scriptHash;
    } catch (error) {
        return false;
    }
}