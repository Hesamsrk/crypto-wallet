import {useState} from "react";
import {UIButton} from "./src/components/UI/UIButton";
import {StyleSheet, View, ViewStyle} from "react-native";
import {ThemeColors} from "./src/styles/themeColors";
import {Cam} from "./src/modules/privateKeyGenerator/components/Cam";

const App = () => {
    const [status, setStatus] = useState<"new" | "import" | "option">("option")

    return (
        <View style={Styles.container}>
            {status === "new" && <Cam/>}
            {
                (status!=="option")?<UIButton bgColor={ThemeColors.secondary}
                                              onClick={() => setStatus("option")}>Go Back</UIButton>:<>
                    <UIButton bgColor={ThemeColors.secondary}
                              onClick={() => setStatus("new")}>New Private Key</UIButton>
                    <UIButton bgColor={ThemeColors.secondary}
                              onClick={() => setStatus("import")}>Import Private Key</UIButton>
                </>
            }
        </View>
    );
}


const Styles = StyleSheet.create<{
container: ViewStyle
}>({
container: {
    flex: 1,
        justifyContent: "center",
        backgroundColor: ThemeColors.background
}
});


export default App
