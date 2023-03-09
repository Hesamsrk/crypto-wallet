import Constants from "expo-constants";

export const Configs = {
    CREATE_MODE: false,
    COINBASE_API_TOKEN:Constants.expoConfig?.extra?.env?.COINBASE_API_TOKEN || "",
    MINIMUM_PATTERN_LENGTH:8
}
