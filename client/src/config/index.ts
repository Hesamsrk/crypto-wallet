import Constants from "expo-constants";

export const Configs = {
    DEV_MODE: false,
    MINIMUM_PATTERN_LENGTH:8,
    SERVICES:{
        backend:{
            baseURL:"http://localhost:9090",
            authToken:Constants.CW_AUTH_TOKEN
        }
    }
}
