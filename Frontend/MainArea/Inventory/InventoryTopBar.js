import { View, Image, TouchableOpacity, Text } from "react-native"
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo" 
import {ThemeFonts} from '../../../assets/Themes/ThemeFont'
 
export const InventoryTopBar = ({setPopUp}) => {
    return(
        <View style={{width: "100%", height: 100, justifyContent:'center', alignItems:'center'}}>
            <View style={{width: "90%", height: 75, flexDirection:'row'}}>
                <Image source={getTeamLogo("Celtics")} style={{height:40, width:40}}/>

                <TouchableOpacity style={{
                    width: 100, height: 43, backgroundColor:'white', marginLeft: 10, borderRadius:10,
                    justifyContent:'center', alignItems:'center'
                }} onPress={() => setPopUp(true)}>
                    <Text style={{fontFamily: ThemeFonts, fontSize: 20}}>
                        Teams
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}