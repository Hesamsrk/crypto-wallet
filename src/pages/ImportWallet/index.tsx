import {View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {useState} from "react";
import {Grid} from "./components/Grid";
import {Page} from "../../components/layout/Page";
import {Button} from "../../components/UI/Button";


export const ImportWallet = Page(
    () => {
        const [status, setStatus] = useState<"import" | "menu">("menu")
        const [imageUri, setImageUri] = useState<string | undefined>(undefined);

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

        return <Grid imageUri={imageUri} onSubmit={() => setStatus("menu")}/>
    }
)