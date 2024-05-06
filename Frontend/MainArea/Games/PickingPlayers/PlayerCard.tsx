import { Dispatch, SetStateAction } from "react"
import { View, Image } from "react-native"
import { Colors } from "../../../Global/Enums/color"

interface Props {
    player: {name: string, picId: string}
    selectedIndex: number
    index: number
}

export const PlayerCard: React.FC<Props> = ({ player, selectedIndex, index }) => {

    if(player.name === null)
    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor:'grey', 
            marginLeft: 5, marginRight: 5, borderRadius: 5
        }}>
            
        </View>
    )

    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor:'grey', 
            marginLeft: 5, marginRight: 5, borderRadius: 5,
            borderBlockColor: Colors.yellow, borderWidth: selectedIndex === index ? 5 : 0
        }}>
            <Image 
                source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${player.picId}.png`}}
                style={{
                    width:'50%', height:"50%"
                }}
            />
        </View>
    )
}