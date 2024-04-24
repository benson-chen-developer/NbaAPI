import { Dispatch, SetStateAction } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMyContext } from "../../Context/MyContext";
import { PlayerData, PlayerLevels } from "../../Global/Types/DataTypes";

interface Props {
    playerData: PlayerData
    playerLevel: number
    handleOpenPress: () => void
    setCurrentPlayer: Dispatch<SetStateAction<string>>
}

export const PlayerCard: React.FC<Props> = ({playerData, playerLevel, setCurrentPlayer, handleOpenPress}) => {
    let backgroundColor: string;
    if (playerLevel >= 20) {
        backgroundColor = '#B01BC0';
    } else if (playerLevel >= 15) {
        backgroundColor = '#EAD15C';
    } else if (playerLevel >= 10) {
        backgroundColor = '#fff';
    } else {
        backgroundColor = '#B59773';
    }
    
    return (
        <TouchableOpacity 
            style={{alignItems: 'center', backgroundColor: backgroundColor, width: 150, height: 160, borderTopLeftRadius:15, borderTopRightRadius:15}}
            onPress={() => {
                setCurrentPlayer(playerData.name)
                handleOpenPress();
            }}
        >
            <View style={{position:'absolute', width:"100%", top: -25, alignItems:'center'}}>
                <Image 
                    source={{ uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${playerData.picId}.png`}} 
                    style={{height:115, width: 150}}
                />
            </View>

            <View style={{width:"100%", height: "55%", alignItems:'center'}}>
                <View style={{width:'85%', justifyContent:'space-between', flexDirection:'row', marginTop:10}}>
                    <Text style={{color:backgroundColor === "#fff" ? "black" : "#fff", fontSize:20, fontFamily:'Roboto-Bold'}}>#0</Text>
                    <Text style={{color:backgroundColor === "#fff" ? "black" : "#fff", fontSize:20, fontFamily:'Roboto-Bold'}}>F</Text>
                </View>
            </View>

            <View style={{
                width:"100%", height: "45%", backgroundColor:'black', 
                alignItems:'center', justifyContent:'space-evenly'
            }}>
                <Text style={{color:'white', fontSize:18,fontFamily:'Roboto-Bold'}}>{playerData.name}</Text>

                <View style={{width:"100%", alignItems:'center', justifyContent:'space-evenly', flexDirection:'row'}}>
                    <Text style={{color:'white', fontSize:18,fontFamily:'Roboto-Bold'}}>
                        LV {playerLevel}
                    </Text>
                    <View style={{width:80, height:18, backgroundColor:'#D9D9D9', borderRadius:5}}>
                        <View style={{width:"25%", height:18, backgroundColor:'#2BD6B2', borderRadius:4}}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};