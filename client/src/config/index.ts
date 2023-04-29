import Constants from "expo-constants";

export const ENV: {
    CW_AUTH_TOKEN: string
    CW_BACKEND_BASE_URL: string
} = Constants.expoConfig.extra.eas.env


export const Configs = {
    DEV_MODE: true,
    MINIMUM_PATTERN_LENGTH: 8,
    SERVICES: {
        backend: {
            baseURL: ENV.CW_BACKEND_BASE_URL,
            authToken: ENV.CW_AUTH_TOKEN
        }
    }
}
