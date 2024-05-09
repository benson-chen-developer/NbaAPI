import { Dispatch, SetStateAction } from "react"
import { View, Image, Text } from "react-native"
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlayerCardType } from "../../../Global/Types/PickingPlayerTypes";
import { getLevelColor } from "../../../Global/Colors";
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
    player: PlayerCardType
    index: number;
    maxLength: number;
    setSelectedPlayers: Dispatch<SetStateAction<PlayerCardType[]>>
}

export const PlayerCard: React.FC<Props> = ({ player, index, maxLength, setSelectedPlayers }) => {

    if(player.name === null)
    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor:'grey', 
            marginLeft: index !== 0 ? 25 : 25, marginRight: index === maxLength-1 ? 25 : 5,
            borderRadius: 5,
        }}>
            <View style={{
                justifyContent:'flex-end', alignItems:'flex-start', width:'100%', height:"100%"
            }}>
                {index === 3 ?
                    <BombIcon/> : null
                }
            </View>
        </View>
    )

    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor: player.backgroundColor, 
            marginLeft: index !== 0 ? 25 : 25, marginRight: index === maxLength ? 25 : 5, 
            borderRadius: 5,
            justifyContent: 'flex-end', alignItems:'center'
        }}>

            {/* Name */}
            <Text style={{
                fontSize: 20, fontFamily:'Roboto-Bold', top: 10
            }}>
                {player.name.split(" ")[0][0]}. {player.name.split(" ")[1]}
            </Text>

            <Image 
                source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${player.picId}.png`}}
                style={{
                    width:'100%', height:"80%", borderRadius: 5
                }}
            />

            {/* Top Stuff */}
            <View style={{
                position:'absolute', justifyContent:'space-between',
                alignItems:'flex-start', width:'100%', height:"100%"
            }}>
                <View style={{
                    flexDirection:'row', justifyContent: 'space-between', width:'100%'
                }}>
                    {/* X Btn */}
                    <TouchableOpacity 
                        style={{
                            width:35, height:35, backgroundColor:'#323232', 
                            borderRadius:50, justifyContent:'center', alignItems:'center',
                            top: -15, left: -15,
                        }} 
                        onPress={() => {
                            setSelectedPlayers(p => {
                                let foundPlayerIndex = p.findIndex(e => e.name === player.name)

                                const updatedPlayers = [...p];
                                const frontOfArray = updatedPlayers.slice(0, foundPlayerIndex);
                                const backOfArray = updatedPlayers.slice(foundPlayerIndex+1, updatedPlayers.length);

                                let newArr = frontOfArray.concat(backOfArray);
                                while(newArr.length < 4)
                                    newArr.push({"name": null, "picId": null, level:0, backgroundColor:null});

                                return newArr; 
                            });
                        }}
                    >
                        <Feather name="x" size={26} color="#fff" />
                    </TouchableOpacity>

                    {/* Level */}
                    <View style={{
                        width:80, height:30, backgroundColor: getLevelColor(player.level),
                        top: -13, left: 10, borderRadius: 20,
                        justifyContent:'center', alignItems:'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,  elevation: 4,
                        shadowRadius: 4,
                    }}>
                        <Text style={{
                            fontFamily:'Roboto-Bold', fontSize:20, color: getLevelColor(player.level) === "#FAF9F6" ? "#000" : "#fff"
                        }}>
                            LV {player.level}
                        </Text>
                    </View>
                </View>

                {index === 3 ?
                    <BombIcon/> : null
                }
            </View>
        </View>
    )
}

const BombIcon = () => {
    return(
        <View style={{
            flexDirection:'row', alignItems:'flex-end',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,  elevation: 4,
            shadowRadius: 4,
        }}>
            <View style={{left: -12}}>
                <FontAwesome5 name="bomb" size={50} color="#fff" />
            </View>
        </View>
    )
}