import {StyleSheet, ViewStyle} from "react-native";
import {Colors} from "./colors";

interface ILayout{
    page: ViewStyle
}


export const Layout = StyleSheet.create<ILayout>({
    page: {
        flex: 1,
        justifyContent:"center",
        backgroundColor: Colors.background
    }
})