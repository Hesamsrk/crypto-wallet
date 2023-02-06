import * as SecureStore from 'expo-secure-store';

export const db = {
    set: async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value);
        console.log(`db.set("${key}","${value}")`);
    },
    get: async (key: string) => {
        let result = await SecureStore.getItemAsync(key) || "";
        console.log(`db.get("${key}"): ${result}`);;
        return result
    },
    keys: {
        PRIVATE_KEY: "private-key",
        PASS_CODE:"pass-code"
    }
}

