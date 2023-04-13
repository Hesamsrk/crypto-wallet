import Wallet from 'ethereumjs-wallet';



export const EthereumWallet = (privateKey:Buffer)=>{

    const ethereumWallet = Wallet.fromPrivateKey(privateKey);

    return {
        address:ethereumWallet.getAddressString(),
        privateKey:ethereumWallet.getPrivateKeyString()
    }
}
