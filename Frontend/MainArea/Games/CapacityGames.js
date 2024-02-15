import { Text, View } from "react-native"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont"
import { useMyContext } from "../../Context/MyContext"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CapacityGames = () => {
    const {liveGames} = useMyContext();

    return(
        <View style={{width:"100%", justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
            <MaterialCommunityIcons 
                name="basketball" size={24} right={4}
                color={liveGames.length === 2 ? "#F18944" : 'white'}
            />
            
            <Text style={{
                color: liveGames.length === 2 ? 'white' : '#c1c6c6', 
                fontFamily:ThemeFonts, fontSize:25
            }}>
                {liveGames.length}/2 Games
            </Text>

        </View>
    )
}