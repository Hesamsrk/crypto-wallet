import React from "react";
import {MainPanel} from "./MainPanel";
import {MainMenu} from "./MainMenu";
import {PassCode} from "./PassCode";
import {ImportWallet} from "./ImportWallet";
import {NativeStackNavigationOptions} from "react-native-screens/native-stack";
import {Theme} from "../styles/theme";

export interface Route {
    name: string
    component: React.FC
    active: boolean
    options?:NativeStackNavigationOptions
}

interface RouterData{
    isAuthorized:boolean
    privateKeyExists:boolean
}

export const Router = (data:RouterData): Route[] => [
/*    {
        name: "PassCode",
        component: PassCode,
        active: !data.isAuthorized
    },
    {
        name: "MainPanel",
        component: MainPanel,
        active: data.isAuthorized && data.privateKeyExists
    },
    {
        name: "MainMenu",
        component: MainMenu,
        active: data.isAuthorized
    },
    {
        name: "ImportWallet",
        component: ImportWallet,
        active: data.isAuthorized
    }*/
    {
        name: "MainPanel",
        component: MainPanel,
        active: true,
        options:{
            statusBarColor:Theme.colors.Primary600,
        }
    }
]