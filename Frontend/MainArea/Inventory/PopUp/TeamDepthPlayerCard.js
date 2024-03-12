import { View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

export const TeamDepthPlayerCard = ({func}) => {

    const size = 70;

    if(func)
        return(
            <TouchableOpacity style={{
                width: 90, height: 110, borderRadius:5, borderWidth: 1,
                borderColor:"grey", justifyContent:'center', alignItems:'center'
            }} onPress={func}>
                <Image 
                    style={{width:size, height:size}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />
            </TouchableOpacity>
        )
    else
        return(
            <View style={{
                width: 90, height: 110, borderRadius:5, borderWidth: 1,
                borderColor:"grey", justifyContent:'center', alignItems:'center'
            }} onPress={func}>
                <Image 
                    style={{width:size, height:size}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />
            </View>
        )
}