import { View, TouchableOpacity, Text } from "react-native"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont"

export const InventorySecondBar = ({homeScreen, setHomeScreen}) => {

    const btnHeight = 35; const btnWidth = 85; const fontSize = 18;

    return(
        <View style={{width: "100%", justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <View style={{width: "90%", height: 50, flexDirection:'row'}}>

                <TouchableOpacity style={{
                    width: btnWidth, height: btnHeight, 
                    backgroundColor: homeScreen !== "All" ? "#1F202D" : 'white', 
                    borderRadius:10, justifyContent:'center', alignItems:'center'
                }} onPress={() => setHomeScreen("All")}>
                    <Text style={{
                        fontFamily: ThemeFonts, fontSize: fontSize,
                        color: homeScreen !== "All" ? "white" : 'black'
                    }}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: btnWidth, height: btnHeight, 
                    backgroundColor: homeScreen !== "Team" ? "#1F202D" : 'white',
                    marginLeft: 15, borderRadius:10,
                    justifyContent:'center', alignItems:'center'
                }} onPress={() => setHomeScreen("Team")}>
                    <Text style={{
                        fontFamily: ThemeFonts, fontSize: fontSize, 
                        color: homeScreen !== "Team" ? "white" : 'black'
                    }}>
                        Team
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}