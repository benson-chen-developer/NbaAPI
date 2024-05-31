import { Dispatch, SetStateAction } from "react"
import { View, Image, Text } from "react-native"
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlayerCardType } from "../../../Global/Types/PickingPlayerTypes";
import { getLevelColor } from "../../../Global/Colors";
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
    player: PlayerCardType
    setSelectedOpp: Dispatch<SetStateAction<PlayerCardType>>
}

export const SaboTage: React.FC<Props> = ({ player, setSelectedOpp }) => {

    return(
        <View style={{
            marginBottom: 40, width:'100%', justifyContent:'space-evenly', flexDirection:'row'
        }}>

            {/* Card frame */}
            {player.name === null ?
                <View style={{ width: 150, height: 200, backgroundColor:'grey', borderRadius: 5, }}>
                    <View style={{justifyContent:'flex-end', alignItems:'flex-start', width:'100%', height:"100%"}}>
                        
                        <BombIcon/>
                    </View>
                </View>
                    :
                <View style={{ 
                    width: 150, height: 200, backgroundColor: player.backgroundColor, 
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
                                    top: -10, left: -10,
                                }} 
                                onPress={() => {
                                    setSelectedOpp({name: null, picId: null, level: 0, backgroundColor: null})
                                }}
                            >
                                <Feather name="x" size={26} color="#fff" />
                            </TouchableOpacity>
        
                            {/* Level */}
                            <View style={{
                                width:80, height:30, backgroundColor: getLevelColor(player.level),
                                top: -8, left: 10, borderRadius: 20,
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
                    </View>
                </View>
            }

            {/* Stats */}
            <View style={{height:'100%', width: 150}}>

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