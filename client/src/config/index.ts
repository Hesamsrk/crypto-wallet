import Constants from "expo-constants";

export const ENV:{
CW_AUTH_TOKEN:string
} = Constants.expoConfig.extra.eas.env
export const Configs = {
    DEV_MODE: false,
    MINIMUM_PATTERN_LENGTH:8,
    SERVICES:{
        backend:{
            baseURL:"http://192.168.1.5:9090/",
            authToken:ENV.CW_AUTH_TOKEN
        }
    }
}
