import {View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {useState} from "react";
import {Grid} from "./components/Grid";
import {Page} from "../../components/layout/Page";
import {UIButton} from "../../components/UI/UIButton";


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

        // return <View>
        //     {status === "import" && imageUri && <Grid imageUri={imageUri} onSubmit={() => setStatus("menu")}/>}
        //     {
        //         (status !== "menu") ? <UIButton
        //             onClick={() => setStatus("menu")}>Go Back</UIButton> : <>
        //             <UIButton
        //                 onClick={() => {
        //                     pickImage().then((ok) => ok && setStatus("import"))
        //                 }
        //                 }>Import Private Key</UIButton>
        //         </>
        //     }
        // </View>

        return <>
        </>
    }
)