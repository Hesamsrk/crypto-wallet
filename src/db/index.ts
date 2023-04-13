import * as SecureStore from 'expo-secure-store';
import {logger} from "../utils/logger";

export const db = {
    set: async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value);
        logger.log(`db.set("${key}","${value}")`);
    },
    get: async (key: string) => {
        let result = await SecureStore.getItemAsync(key) || "";
        logger.log(`db.get("${key}"): ${result}`);;
        return result
    },
    keys: {
        PRIVATE_KEY: "private-key",
        PASS_CODE:"pass-code"
    }
}

