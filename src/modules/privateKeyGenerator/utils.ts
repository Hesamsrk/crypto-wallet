import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import {CryptoDigestAlgorithm, CryptoEncoding} from 'expo-crypto';

export const readFileBase64 = async (path: string) => FileSystem.readAsStringAsync(path, {encoding: "base64"})


const hashFunctionLevel1 = (input: string) => Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA512, input, {encoding: CryptoEncoding.BASE64})
const hashFunctionLevel2 = (input: string) => Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA512, input, {encoding: CryptoEncoding.HEX})


export const generatePrivateKey = async ({base64Image, pattern}: { base64Image: string, pattern: string }) => {
    const imageHash = await hashFunctionLevel1(base64Image)
    const patternHash = await hashFunctionLevel1(pattern)
    const PK = await hashFunctionLevel2(imageHash + patternHash)
    console.log("PK generated:")
    console.log(`Pattern: ${pattern} =>(base64) ${patternHash}`)
    console.log(`Image: ${base64Image.substring(0,35)}... =>(base64) ${imageHash}`)
    console.log(`Key: hash(image) + hash(pattern) =>(HEX) ${PK}`)

    return PK
}