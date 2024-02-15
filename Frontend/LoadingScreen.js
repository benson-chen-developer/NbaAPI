import { View , Text} from "react-native"
import { ThemeFonts } from "../assets/Themes/ThemeFont"

export const LoadingScreen = () => {
    return(
        <View style={{
            width:"100%", height:"100%", position:'absolute', 
            alignItems:'center', backgroundColor: 'rgba(0,0,0,.5)'
        }}>
            <View style={{height:"30%"}}/>
            <Text style={{
                color:'white', fontFamily:ThemeFonts, fontSize: 50
            }}>
                Loading
            </Text>
        </View>
    )
}