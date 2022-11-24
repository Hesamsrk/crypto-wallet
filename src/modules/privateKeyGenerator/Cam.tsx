import {Camera, CameraType} from 'expo-camera';
import {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {UIButton} from "../../components/UI/UIButton";
import styled from "styled-components/native";


export const Cam = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(undefined);
    const [imageUri, setImageUri] = useState<string | undefined>(undefined);

    if (!permission) {
        // Camera permissions are still loading
        return <></>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        requestPermission().then((res) => {
            res.granted || close()
        })
        return <Container/>;
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }
    };

    if (imageUri) {
        return <Container><Image source={{uri: imageUri}} style={{flex: 1}}/></Container>
    }

    return (
        <Container>
            <Camera ref={(ref) => setCamera(ref)} style={styles.camera} type={type}>
                <Buttons>
                    <UIButton
                        onClick={() => setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))}>Rotate
                        Camera</UIButton>
                    <UIButton
                        onClick={() => takePicture()}>Capture</UIButton>
                </Buttons>
            </Camera>
        </Container>
    );
}

const Container = styled.View`
  width: 100%;
  height: 80%;
  padding: 10px;
`
const Buttons = styled.View`
  position: absolute;
  bottom:0;
  left: 0;
  right: 0;
`


const styles = StyleSheet.create({
    camera: {
        flex: 1,
    }
});

