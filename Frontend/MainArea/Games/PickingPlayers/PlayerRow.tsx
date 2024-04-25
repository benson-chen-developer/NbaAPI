import { Dispatch, SetStateAction } from "react"
import { View, Image, Text, ScrollView } from "react-native"
import { PlayerData } from "../../../Global/Types/DataTypes"

interface Props {
    playerData: PlayerData
    playerLevel: number
    handleOpenPress: () => void
    setCurrentPlayer: Dispatch<SetStateAction<string>>
}

export const PlayerRow: React.FC<Props> = ({playerData, playerLevel, setCurrentPlayer, handleOpenPress}) => {
    
    const stats = playerData;
    
    return(
        <View style={{
            width: "100%", height:100, borderBottomColor:'#3b3d41', borderBottomWidth:.5,
            flexDirection:'row', alignItems:'center'
        }}>
            {/* PFP */}
            <View style={{
                width:70, height:70, borderRadius:50, marginLeft: 20, marginBottom: 10,
                backgroundColor:'#fff', overflow:'hidden'
            }}>
                <Image 
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${playerData.picId}.png`}}
                    style={{width: "100%", height:"100%"}}
                />
            </View>

            {/* Lvl Box */}
            <View style={{
                height:"100%", borderRadius: 10, position:'absolute', justifyContent:'flex-end'
            }}>
                <View style={{
                    width: 70, height:25, borderRadius: 15, backgroundColor:'white',
                    borderWidth: 1, borderBlockColor:'black', 
                    marginLeft: 20, marginBottom: 10, 
                    alignItems:'center', justifyContent:'center'
                }}>
                    <Text style={{fontFamily: 'Roboto-Bold', fontSize: 16}}>
                        Lvl {playerLevel}
                    </Text>
                </View>
            </View>

            {/* Name and Jersy Number */}
            <View style={{height:"100%", marginLeft: 10, justifyContent:'center'}}>
                <Text style={{fontFamily:"Roboto-Bold", color:'white', fontSize: 18}}>
                    {playerData.name.charAt(0).toUpperCase() + '. '}
                    {playerData.name.split(" ")[1]}
                </Text>
                <Text style={{fontFamily:"Roboto-Bold", color:'white', marginTop: 5, fontSize: 16}}>
                    #0
                </Text>
            </View>

            {/* All The Stats */}
            <ScrollView style={{ width: "50%", marginLeft: 20 }} horizontal={true}>
                <View style={{width:30, alignItems:'center'}}>
                    <Text style={{fontFamily:"Roboto-Bold", color:'white', fontSize: 18}}>
                        20
                    </Text>
                    <Text style={{fontFamily:"Roboto-Bold", color:'#b6b6b6', fontSize: 14}}>
                        PTS
                    </Text>
                </View>
                {/* {playerData.map((data, index) => {
                    return (
                        <View style={{width:30, alignItems:'center'}}>
                            <Text style={{fontFamily:"Roboto-Bold", color:'white', fontSize: 18}}>
                                20
                            </Text>
                            <Text style={{fontFamily:"Roboto-Bold", color:'#b6b6b6', fontSize: 14}}>
                                PTS
                            </Text>
                        </View>
                    )
                })} */}
            </ScrollView>

        </View>
    )
}