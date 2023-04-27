import {useFonts} from "expo-font";

export const useFontLoader = ()=>{
    const [fontsLoaded] = useFonts({
        "Sansation-regular": require("../fonts/Sansation/Sansation_Regular.ttf"),
        "Sansation-bold": require("../fonts/Sansation/Sansation_Bold.ttf"),
        "Sansation-italic": require("../fonts/Sansation/Sansation_Bold_Italic.ttf"),
        "Sansation-bold-italic": require("../fonts/Sansation/Sansation_Bold_Italic.ttf"),
        "Sansation-light": require("../fonts/Sansation/Sansation_Light.ttf")
    });

    return {fontsLoaded}
}