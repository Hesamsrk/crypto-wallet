import {useCallback,} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {useStorageLoader} from "./src/hooks/usePrivateKeyLoader";
import {useFontLoader} from "./src/hooks/useFontLoader";
import {NavigationContainer} from '@react-navigation/native';
import {PassCode} from "./src/pages/PassCode";
import {StyleSheet, View, ViewStyle} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {useHookstate} from "@hookstate/core";
import {Store} from "./src/store";
import {Panel} from "./src/pages/Panel";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const App = () => {
    let {privateKeyLoaded, passCodeLoaded} = useStorageLoader()
    let {fontsLoaded} = useFontLoader()
    const hookState = useHookstate(Store)
    let appLoaded = fontsLoaded && privateKeyLoaded && passCodeLoaded
    const onLayoutRootView = useCallback(async () => {
        if (appLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appLoaded])
    if (!appLoaded) {
        return null
    }
    return <View onLayout={onLayoutRootView} style={styles.root}>
        {
            hookState.authenticated.get() ? <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Panel" component={Panel} options={{}} />
                </Stack.Navigator>
            </NavigationContainer> : <PassCode/>
        }

    </View>
}

const styles = StyleSheet.create<{ root: ViewStyle }>({
    root: {
        flex: 1,
    }
})

export default App
