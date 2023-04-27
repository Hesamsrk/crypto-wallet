import {ExpoConfig} from 'expo/config';
import * as dotenv from "dotenv"

dotenv.config()
const env = Object.fromEntries(Object.entries(process.env).filter(([key, value]) => key.startsWith("CW_")))
console.log({env})

const config: ExpoConfig = {
    name: 'Crypto Wallet',
    slug: 'crypto-wallet',
    version: "1.0.0",
    primaryColor: "#1C2541",
    orientation: "portrait",
    assetBundlePatterns: [
        "assets/**/*"
    ],
    icon: "./assets/icon.png",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    userInterfaceStyle: "light",
    extra: {
        eas: {
            projectId: "f03908de-08bb-4f0f-93b3-e16c69ce9fae",
            env
        }
    },
    owner: "hesamsrk",
    updates: {
        fallbackToCacheTimeout: 5000
    },
    ios: {
        supportsTablet: false,
        infoPlist: {
            NSFaceIDUsageDescription: "This app uses FaceID or TouchID to verify users"
        }
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/icon.png",
            backgroundColor: "#FFFFFF"
        },
        package: "com.hesamsrk.cryptowallet"
    },
};

export default config;