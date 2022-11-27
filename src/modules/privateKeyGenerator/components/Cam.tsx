import {Camera, CameraType} from "expo-camera";
import {StyleSheet, View, ViewStyle} from "react-native";
import {useState} from "react";
import {UIButton} from "../../../components/UI/UIButton";

interface PropTypes {
    setCamera: (ref) => void
    takePicture: () => void
}

export const Cam = ({setCamera, takePicture}: PropTypes) => {
    const [type, setType] = useState(CameraType.back);

    return <Camera ref={(ref) => setCamera(ref)} style={Styles.camera} type={type}>
        <View style={Styles.buttons}>
            <UIButton style={Styles.button}
                      onClick={() => setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))}>Rotate
                Camera</UIButton>
            <UIButton style={Styles.button}
                      onClick={() => takePicture()}>Capture</UIButton>
        </View>
    </Camera>
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
