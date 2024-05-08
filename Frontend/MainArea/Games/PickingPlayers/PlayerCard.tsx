import { Dispatch, SetStateAction } from "react"
import { View, Image } from "react-native"
import { Colors } from "../../../Global/Enums/color"
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    player: {name: string, picId: string}
    index: number;
    maxLength: number;
    setSelectedPlayers: Dispatch<SetStateAction<{name: string, picId: string}[]>>
}

export const PlayerCard: React.FC<Props> = ({ player, index, maxLength, setSelectedPlayers }) => {

    if(player.name === null)
    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor:'grey', 
            marginLeft: index !== 0 ? 5 : 25, marginRight: index === maxLength-1 ? 25 : 5,
            borderRadius: 5,
        }}>
            
        </View>
    )

    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor:'grey', 
            marginLeft: index !== 0 ? 5 : 25, marginRight: index === maxLength ? 25 : 5, 
            borderRadius: 5,
            justifyContent:'flex-end',
        }}>
            <Image 
                source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${player.picId}.png`}}
                style={{
                    width:'100%', height:"80%", borderRadius: 5
                }}
            />

            {/* Top Stuff */}
            <View style={{
                position:'absolute', justifyContent:'flex-end', top: -15, left: -10
            }}>
                {/* X Btn */}
                <TouchableOpacity 
                    style={{
                        width:35, height:35, backgroundColor:'#323232', 
                        borderRadius:50, justifyContent:'center', alignItems:'center',
                    }} 
                    onPress={() => {
                        setSelectedPlayers(p => {
                            let foundPlayerIndex = p.findIndex(e => e.name === player.name)

                            const updatedPlayers = [...p];
                            const frontOfArray = updatedPlayers.slice(0, foundPlayerIndex);
                            const backOfArray = updatedPlayers.slice(foundPlayerIndex+1, updatedPlayers.length);

                            let newArr = frontOfArray.concat(backOfArray);
                            while(newArr.length < 4)
                                newArr.push({"name": null, "picId": null});

                            return newArr; 
                        });
                    }}
                >
                    <Feather name="x" size={26} color="#fff" />
                </TouchableOpacity>
            </View>
            
        </View>
    )
}