import {Camera, CameraType} from 'expo-camera';
import {useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {UIButton} from "../../../components/UI/UIButton";
import {Grid} from "./Grid";
import {Dot} from "../../../components/UI/Dot";
import {generatePrivateKey, readFileBase64} from "../utils";

export const Cam = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(undefined);
    const [imageUri, setImageUri] = useState<string | undefined>(undefined);
    const [level, setLevel] = useState<number>(3)
    const [pattern, setPattern] = useState<string>("")
    if (!permission) {
        // Camera permissions are still loading
        return <></>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        requestPermission().then((res) => {
            res.granted || close()
        })
        return <View style={Styles.container}/>;
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }
    };

    const submit = async () => {
        let base64Image = undefined;
        try {
            base64Image = await readFileBase64(imageUri)
        } catch (e) {
            alert("Failed to load image!")
        }
        try{
            const PK = await generatePrivateKey({
                base64Image,
                pattern
            })
        }catch (e){
            alert("Failed to create private key!")
        }

    }

    return (
        <View style={Styles.container}>
            {
                imageUri ? <Grid backgroundURL={imageUri} level={level}
                                 onPatternMove={(sectionID) => setPattern(prev => prev + sectionID)}>
                        <UIButton onClick={() => submit()}>Submit</UIButton>
                    </Grid> :
                    <Camera ref={(ref) => setCamera(ref)} style={Styles.camera} type={type}>
                        <View style={Styles.buttons}>
                            {[2, 3, 4, 5].map(label => <Dot key={label} label={label} active={level === label}
                                                            onPress={() => setLevel(label)}/>)}
                        </View>
                        <View style={Styles.buttons}>
                            <UIButton style={Styles.button}
                                      onClick={() => setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))}>Rotate
                                Camera</UIButton>
                            <UIButton style={Styles.button}
                                      onClick={() => takePicture()}>Capture</UIButton>
                        </View>
                    </Camera>
            }
        </View>
    );
}


const Styles = StyleSheet.create<{
    container: ViewStyle
    camera: ViewStyle
    buttons: ViewStyle
    button: ViewStyle
}>({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: "flex-end"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button: {
        flex: 1
    }
});

