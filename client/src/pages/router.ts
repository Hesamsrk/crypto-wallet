import React from "react";
import {MainPanel} from "./MainPanel";
import {Menu} from "./Menu";
import {PassCode} from "./PassCode";
import {ImportWallet} from "./ImportWallet";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";
import {Theme} from "../styles/theme";
import {ParamListBase, RouteProp} from "@react-navigation/native";

export interface Route {
    name: string
    component: React.FC
    active: boolean
    options?: NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions)
}

interface RouterData {
    isAuthorized: boolean
    privateKeyExists: boolean
}

export const Router = ({privateKeyExists,isAuthorized}: RouterData): Route[] => [
    {
        name: "PassCode",
        component: PassCode,
        active: !isAuthorized
    },
    {
        name: "Menu",
        component: Menu,
        active: isAuthorized && !privateKeyExists
    },
    {
        name: "ImportWallet",
        component: ImportWallet,
        active: isAuthorized && !privateKeyExists
    },
    {
        name: "MainPanel",
        component: MainPanel,
        active: isAuthorized && privateKeyExists,
        options: {
            statusBarColor: Theme.colors.Primary600,
        }
    }
]