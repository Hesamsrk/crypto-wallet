import {ConfigContext, ExpoConfig} from 'expo/config';
import {config} from "dotenv"
config()
const env = Object.fromEntries(Object.entries(process.env).filter(([key, value]) => key.startsWith("CW_")))
console.log({env})

export default ({config}: ConfigContext): ExpoConfig => ({
        ...config,
        primaryColor:"#1C2541",
        assetBundlePatterns: [
            'assets/**/*',
        ],
        name: "crypto-wallet",
        slug: "crypto-wallet",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
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
        extra: {
            eas: {
                projectId: "f03908de-08bb-4f0f-93b3-e16c69ce9fae",
                env
            }
        },
        owner: "hesamsrk"

    }
);
