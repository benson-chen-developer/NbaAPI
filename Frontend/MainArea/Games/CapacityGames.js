import { Text, View } from "react-native"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont"
import { useMyContext } from "../../Context/MyContext"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CapacityGames = () => {
    const {liveGames, user} = useMyContext();

    return(
        <View style={{width:"100%", justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
            <MaterialCommunityIcons 
                name="basketball" size={24} right={4}
                color={liveGames.length === user.maxLiveGames ? "#F18944" : 'white'}
            />
            
            <Text style={{
                color: liveGames.length === user.maxLiveGames ? 'white' : '#c1c6c6', 
                fontFamily:ThemeFonts, fontSize:25
            }}>
                {liveGames.length}/{user.maxLiveGames}
            </Text>

        </View>
    )
}