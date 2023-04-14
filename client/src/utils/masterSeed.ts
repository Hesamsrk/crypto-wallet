import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import {CryptoDigestAlgorithm, CryptoEncoding} from 'expo-crypto';
import {Store} from "../store";
import { db } from '../db';
import {logger} from "./logger";

export const readFileBase64 = async (path: string) => await FileSystem.readAsStringAsync(path, {encoding: "base64"})

const hashFunctionLevel1 = (input: string) => Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, input, {encoding: CryptoEncoding.HEX})
const hashFunctionLevel2 = (input: string) => Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, input, {encoding: CryptoEncoding.BASE64})


export const generateMasterSeed = async ({base64Image, pattern}: { base64Image: string, pattern: string }) => {
    logger.log({base64Image, pattern})
    const imageHash = await hashFunctionLevel1(base64Image)
    const patternHash = await hashFunctionLevel1(pattern)
    const MasterSeed = await hashFunctionLevel2(imageHash + patternHash)
    logger.log("MasterSeed generated:")
    logger.log(`Pattern: ${pattern} =>(base64) ${patternHash}`)
    logger.log(`Image: ${base64Image.substring(0, 35)}... =>(base64) ${imageHash}`)
    logger.log(`Key: hash(image) + hash(pattern) =>(HEX) ${MasterSeed}`)
    return MasterSeed
}

export const saveMasterSeed = async (privateKey: string, saveInStorage: boolean) => {
    let old = Store.privateKey.get()
    logger.log("Last MasterSeed:", old)
    logger.log("current MasterSeed:", privateKey)
    // Save MasterSeed in memory
    Store.privateKey.set(privateKey)
    // Save MasterSeed in storage
    saveInStorage && await db.set(db.keys.PRIVATE_KEY,privateKey)
}

export const removeMasterSeed = async ()=>{
    // Remove MasterSeed from memory
    Store.privateKey.set("")
    // Remove MasterSeed from storage
    await db.set(db.keys.PRIVATE_KEY,"")
}