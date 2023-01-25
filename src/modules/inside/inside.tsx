import {Route, Routes} from "react-router-native";
import {Text, View} from "react-native";
import {Layout} from "../../styles/layout";
import {Store} from "../../store";
import {UIButton} from "../../components/UIButton";
import {db} from "../../db";

export const Inside = () => {
    const privateKey = Store.privateKey.get()
    return <View style={Layout.page}>
        <UIButton onClick={() => {
                      db.set(db.keys.PRIVATE_KEY,"").then(()=>{
                          Store.privateKey.set("")
                      })
                  }}>Remove Private Key</UIButton>
        <Routes>
            <Route path="/" element={<Text>{privateKey}</Text>}/>
            {/*<Route path="/about" component={About} />*/}
            {/*<Route path="/topics" component={Topics} />*/}
        </Routes>
    </View>
}