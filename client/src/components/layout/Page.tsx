import {SafeAreaView, StyleSheet, View, ViewProps, ViewStyle} from "react-native";
import {Theme} from "../../styles/theme";
import React from "react";
import {NavigationScreenProp} from "react-navigation"

const Container: React.FC<ViewProps> = (props) => {
    let {children, style, ...rest} = props
    return <SafeAreaView {...rest} style={[Styles.container, style]}>{children}</SafeAreaView>
}

const Styles = StyleSheet.create<{ container: ViewStyle }>({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.Background,
    }
})

type PageProps<P = unknown> = P & { pageProps?: ViewProps | undefined }


export function Page<T = {
    navigation: NavigationScreenProp<any, any>
}>(Component: (props: T) => JSX.Element, style?: ViewStyle): React.FC<PageProps<T>> {
    return (props) => {
        const {pageProps, ...r} = props
        let rest = r as unknown as T
        return <Container {...pageProps} style={style}>
            <Component {...rest}/>
        </Container>
    }
}

