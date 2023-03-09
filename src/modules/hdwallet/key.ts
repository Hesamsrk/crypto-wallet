import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import {CryptoDigestAlgorithm, CryptoEncoding} from 'expo-crypto';
import {Store} from "../../store";
import { db } from '../../db';

export const readFileBase64 = async (path: string) => await FileSystem.readAsStringAsync(path, {encoding: "base64"})

const hashFunctionLevel1 = (input: string) => Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA512, input, {encoding: CryptoEncoding.BASE64})
const hashFunctionLevel2 = (input: string) => Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA512, input, {encoding: CryptoEncoding.HEX})


export const generatePrivateKey = async ({base64Image, pattern}: { base64Image: string, pattern: string }) => {
    console.log({base64Image, pattern})
    const imageHash = await hashFunctionLevel1(base64Image)
    const patternHash = await hashFunctionLevel1(pattern)
    const PK = await hashFunctionLevel2(imageHash + patternHash)
    console.log("PK generated:")
    console.log(`Pattern: ${pattern} =>(base64) ${patternHash}`)
    console.log(`Image: ${base64Image.substring(0, 35)}... =>(base64) ${imageHash}`)
    console.log(`Key: hash(image) + hash(pattern) =>(HEX) ${PK}`)
    return PK
}

export const savePrivateKey = async (privateKey: string, saveInStorage: boolean) => {
    let old = Store.privateKey.get()
    console.log("Last PK:", old)
    console.log("current PK:", privateKey)
    // Save PK in memory
    Store.privateKey.set(privateKey)
    // Save PK in storage
    saveInStorage && await db.set(db.keys.PRIVATE_KEY,privateKey)
}

export const removePrivateKey = async ()=>{
    // Remove PK from memory
    Store.privateKey.set("")
    // Remove PK from storage
    await db.set(db.keys.PRIVATE_KEY,"")
}