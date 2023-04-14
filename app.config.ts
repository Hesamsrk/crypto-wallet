import {ConfigContext, ExpoConfig} from 'expo/config';
import {config} from "dotenv"
config()

export default ({config}: ConfigContext): ExpoConfig => ({
    ...config,
    name: "crypto-wallet",
    slug: "crypto-wallet",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./src/assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    updates: {
        fallbackToCacheTimeout: 5000
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: false,
        infoPlist: {
            NSFaceIDUsageDescription: "This app uses FaceID or TouchID to verify users"
        }
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./src/assets/icon.png",
            backgroundColor: "#FFFFFF"
        },
        package: "com.hesamsrk.cryptowallet"
    },
    extra: {
        eas: {
            projectId: "f03908de-08bb-4f0f-93b3-e16c69ce9fae",
        }
    },
    owner: "hesamsrk"

});
