import Constants from "expo-constants";

export const Configs = {
    DEV_MODE: false,
    COINBASE_API_TOKEN:Constants.expoConfig?.extra?.env?.COINBASE_API_TOKEN || "",
    MINIMUM_PATTERN_LENGTH:8,
    SERVICES:{
        backend:{
            baseURL:"http://localhost:9090",
            authToken:"3b45f8e3e68a0d6eb0a37c5908e08f5c"
        }
    }
}
