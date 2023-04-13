import * as bitcoin from 'bitcoinjs-lib';

export function BitcoinPublicKeyToAddress(publicKeyBuffer: Buffer): string {
    const publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    const network = bitcoin.networks.bitcoin;
    const address = bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);
    // Alternative Way: address = bitcoin.payments.p2pkh({ pubkey: publicKeyBuffer, network: bitcoin.networks.bitcoin })?.address || ""
    return address;
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