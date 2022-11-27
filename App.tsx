import {useState} from "react";
import {UIButton} from "./src/components/UI/UIButton";
import {StyleSheet, View, ViewStyle} from "react-native";
import {ThemeColors} from "./src/styles/themeColors";
import {Grid} from "./src/modules/privateKeyGenerator/components/Grid";
import * as ImagePicker from "expo-image-picker";
import {Camera} from 'expo-camera';
import {Cam} from "./src/modules/privateKeyGenerator/components/Cam";

const App = () => {
    const [status, setStatus] = useState<"import" | "menu" | "generate">("menu")
    const [imageUri, setImageUri] = useState<string | undefined>(undefined);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(undefined);
    const [mustSaveImage,setMustSaveImage] = useState<boolean>(false)

    const takeCameraPermission = async () => {
        try {
            if (!permission.granted) {
                const res = await requestPermission()
                if (!res.granted) {
                    return false
                }
            }
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync();
            setImageUri(data.uri);
        }
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: false,
            allowsEditing: false,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }

        return !result.canceled
    };


    return (
        <View style={Styles.container}>
            {status === "import" && imageUri && <Grid mustSaveImage={mustSaveImage} imageUri={imageUri}/>}
            {status === "generate" && <Cam setCamera={(ref) => setCamera(ref)}
                                           takePicture={() => takePicture().then(() => {
                                               setStatus("import")
                                               setMustSaveImage(true)
                                           })}/>}
            {
                (status !== "menu") ? <UIButton bgColor={ThemeColors.secondary}
                                                onClick={() => setStatus("menu")}>Go Back</UIButton> : <>
                    <UIButton bgColor={ThemeColors.secondary}
                              onClick={() => takeCameraPermission().then(ok => ok && setStatus("generate"))}>Generate
                        Private Key</UIButton>
                    <UIButton bgColor={ThemeColors.secondary}
                              onClick={() => {
                                  pickImage().then((ok) => ok && setStatus("import"))
                              }
                              }>Import Private Key</UIButton>
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
            backgroundColor:
            ThemeColors.background
        }
    })
;


export default App
