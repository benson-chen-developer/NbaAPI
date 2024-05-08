import { Dispatch, SetStateAction } from "react"
import { View, Image, Text, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PlayerData } from "../../../Global/Types/DataTypes"
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
    playerData: PlayerData
    playerLevel: number
    handleOpenPress: () => void
    setCurrentPlayer: Dispatch<SetStateAction<string>>
    setSelectedPlayers:  Dispatch<SetStateAction<{name: string, picId: string}[]>>
    selectedPlayers: {name: string, picId: string}[];
    highestValues: {"PTS": number, "REB": number, "AST": number, "BLK": number, "STL": number, "TO": number, "PF": number}
}

export const PlayerRow: React.FC<Props> = ({playerData, playerLevel, setCurrentPlayer, handleOpenPress, selectedPlayers, setSelectedPlayers, highestValues}) => {
    
    const stats = {
        "PTS": (playerData["PTS"] / playerData["Games Played"]).toFixed(1),
        "REB": (playerData["REB"] / playerData["Games Played"]).toFixed(1),
        "AST": (playerData["AST"] / playerData["Games Played"]).toFixed(1),
        "STL": (playerData["STL"] / playerData["Games Played"]).toFixed(1),
        "BLK": (playerData["BLK"] / playerData["Games Played"]).toFixed(1),
        "FG%": `${(playerData["FG"]/playerData["FGA"] * 100).toFixed(0)}%`,
        "3PT%": `${(playerData["FG3"]/playerData["FG3A"] * 100).toFixed(0)}%`,
        "FT%": `${(playerData["FT"]/playerData["FTA"] * 100).toFixed(0)}%`,
        "PF": (playerData["PF"] / playerData["Games Played"]).toFixed(1),
        "TO": (playerData["TO"] / playerData["Games Played"]).toFixed(1),
    }
    
    return(
        <View style={{
            width: "100%", height:100, borderBottomColor:'#3b3d41', borderBottomWidth:.5,
            flexDirection:'row', alignItems:'center'
        }}>

            <View style={{
                width:"45%", flexDirection:'row', height:"100%", alignItems:'center',
                overflow:'hidden'
            }}>
                <TouchableOpacity style={{
                    width:"100%", flexDirection:'row', height:"100%", alignItems:'center'
                }} onPress={() => {
                    let foundPlayerIndex = selectedPlayers.findIndex(p => p.name === playerData.name)
                    let firstNullIndex = 0;
                    for (const p of selectedPlayers) {
                        if ((!p.name || !p.picId) || firstNullIndex === 3) {
                            break;
                        } else {
                            firstNullIndex++;
                        }
                    }

                    setSelectedPlayers(p => {
                        if(foundPlayerIndex === -1){
                            const arr = [...p]; 
                            arr[firstNullIndex] = {name: playerData.name, picId: playerData.picId};
                            return arr;
                        } else {
                            const updatedPlayers = [...p];
                            const frontOfArray = updatedPlayers.slice(0, foundPlayerIndex);
                            const backOfArray = updatedPlayers.slice(foundPlayerIndex+1, updatedPlayers.length);

                            let newArr = frontOfArray.concat(backOfArray);
                            while(newArr.length < 4)
                                newArr.push({"name": null, "picId": null});

                            return newArr; 
                        }
                    });
                }}>

                {/* PFP */}
                <View style={{
                    width:70, height:70, borderRadius:50, marginLeft: 10, marginBottom: 10,
                    backgroundColor:'#fff', overflow:'hidden'
                }}>
                    <Image 
                        source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${playerData.picId}.png`}}
                        style={{width: "100%", height:"100%"}}
                    />
                </View>

                {/* Lvl Box */}
                <View style={{height:"100%", borderRadius: 10, position:'absolute', justifyContent:'flex-end'}}>
                    <View style={{
                        width: 70, height:25, borderRadius: 15, backgroundColor:'white',
                        borderWidth: 1, borderBlockColor:'black', 
                        marginLeft: 10, marginBottom: 10, 
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
                
                </TouchableOpacity>
            </View>

            {/* The stats side */}
            <View style={{height:"100%", width:"55%"}}>

                {/* BarChart + Fire Icon */}
                <View style={{width:"100%", height:"50%", alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}> 
                    
                    <View style={{flexDirection:'row', marginLeft: 20, alignItems:'center'}}>
                        <FontAwesome5 name="fire" size={22} color="#fa5f0d" style={{marginRight: 5}}/>
                        <Text style={{ fontFamily: "Roboto-Bold", color: "#fff", fontSize: 16 }}>
                            14.1k
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        setCurrentPlayer(playerData["name"]);
                        handleOpenPress();
                    }}>
                        <MaterialCommunityIcons name="chart-bar" size={24} color="white" style={{marginRight: 10}}/>
                    </TouchableOpacity>
                </View>

                {/* All The Stats */}
                <ScrollView style={{ width: "100%", marginLeft: 10 }} horizontal={true}>
                    {Object.entries(stats).map(([key, value], index) => {
                        const isMax = highestValues[key] === value;

                        return (
                            <View key={index} style={{ width: 40, alignItems: 'center', marginRight: index === Object.entries(stats).length-1 ? 10 : 0}}>
                                {key === "TO" || key === "PF" ?
                                    <>
                                        <Text style={{ fontFamily: "Roboto-Bold", color: isMax ? '#F2133B' : "#fff", fontSize: 16 }}>
                                            {value}
                                        </Text>
                                        <Text style={{ fontFamily: "Roboto-Bold", color: isMax ? '#9d122b' : "#b6b6b6", fontSize: 12 }}>
                                            {key}
                                        </Text>
                                    </>
                                        :
                                    <>
                                        <Text style={{ fontFamily: "Roboto-Bold", color: isMax ? '#f7f711' : "#fff", fontSize: 16 }}>
                                            {value}
                                        </Text>
                                        <Text style={{ fontFamily: "Roboto-Bold", color: isMax ? '#ead15c' : "#b6b6b6", fontSize: 12 }}>
                                            {key}
                                        </Text>
                                    </>
                                }
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

        </View>
    )
}