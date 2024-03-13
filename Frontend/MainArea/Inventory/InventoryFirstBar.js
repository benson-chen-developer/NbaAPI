import { View, Image, TouchableOpacity, Text } from "react-native"
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo" 
import {ThemeFonts} from '../../../assets/Themes/ThemeFont'
 
export const InventoryFirstBar = ({currentTeam, setPopUpInfo}) => {
    return(
        <View style={{width: "100%", justifyContent:'center', alignItems:'center', marginBottom:15}}>
            <View style={{width: "90%", flexDirection:'row'}}>
                <Image source={getTeamLogo(currentTeam.name)} style={{height:40, width:40}}/>

                <TouchableOpacity style={{
                    width: 100, height: 43, backgroundColor:'white', marginLeft: 10, borderRadius:10,
                    justifyContent:'center', alignItems:'center'
                }} onPress={() => setPopUpInfo(p => ({ ...p, popUpScreen: "Team" }))}>
                    <Text style={{fontFamily: ThemeFonts, fontSize: 20}}>
                        Teams
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}