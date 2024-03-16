import { View, Image, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { ShortenPlayerName } from "../../../../assets/NameConversions";

/**
 * @param {string} selectedStat 
 */
export const PlayerCard = ({selectedStat, player, func}) => {

    const ImgSize = 70;
    const width = 110; const height = 150;

    if(func)
        return(
            <TouchableOpacity style={{
                width: width, height: height, borderRadius:5, borderWidth: 1,
                borderColor:"grey", justifyContent:'center', alignItems:'center'
            }} onPress={() => func(player)}>
                <Image 
                    style={{width:ImgSize, height:ImgSize, marginBottom: 15}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />

                <Text style={{fontFamily:"Roboto-Black", color:'white', fontSize: 18}}>
                    {ShortenPlayerName(player.name)}
                </Text>

                <Text style={{fontFamily:"Roboto-Black", color:'white'}}>
                    {selectedStat} {(player[selectedStat] / player["Games Played"]).toFixed(1)}
                </Text>
            </TouchableOpacity>
        )
    else
        return(
            <View style={{
                width: width, height: height, borderRadius:5, borderWidth: 1,
                borderColor:"grey", justifyContent:'center', alignItems:'center'
            }} onPress={func}>
                <Image 
                    style={{width:ImgSize, height:ImgSize}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />
            </View>
        )
}