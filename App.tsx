import {useCallback,} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {useStorageLoader} from "./src/hooks/usePrivateKeyLoader";
import {useFontLoader} from "./src/hooks/useFontLoader";
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View, ViewStyle} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useHookstate} from "@hookstate/core";
import {Store} from "./src/store";
import {Theme} from "./src/styles/theme";
import {Router} from "./src/pages/router";
import {QueryClient, QueryClientProvider} from "react-query";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()


const App = () => {
    let {privateKeyLoaded, passCodeLoaded} = useStorageLoader()
    let {fontsLoaded} = useFontLoader()
    let appLoaded = fontsLoaded && privateKeyLoaded && passCodeLoaded

    const hookState = useHookstate(Store)
    const authenticated = hookState.authenticated.get()
    const privateKey = hookState.privateKey.get()

    const onLayoutRootView = useCallback(async () => {
        if (appLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appLoaded])

    return appLoaded ? <View onLayout={onLayoutRootView} style={styles.root}>
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                    navigationBarColor: Theme.colors.Primary600,
                    statusBarColor:Theme.colors.Primary600,
                }}>
                    {Router({privateKeyExists: !!privateKey, isAuthorized: authenticated}).map((r, i) => r.active ?
                        <Stack.Screen key={i} name={r.name} component={r.component} options={r.options}/> : null)}
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    </View> : null
}

const styles = StyleSheet.create<{ root: ViewStyle }>({
    root: {
        flex: 1,
    }
})

export default App
