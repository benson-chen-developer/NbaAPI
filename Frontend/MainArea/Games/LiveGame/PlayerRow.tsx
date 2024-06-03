import { ScrollView, Text, View, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getLevelColor } from "../../../Global/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMyContext } from "../../../Context/MyContext";
import { PlayerExtra } from "../../../Global/Types/PlayerTypes";

interface Props {
    playerExtra: PlayerExtra
}

export const PlayerRow:React.FC<Props> = ({playerExtra}) => {
    const {playerStats} = useMyContext();

    let player = playerStats.find(p => p.name.toLowerCase() === playerExtra.name.toLowerCase());
    const stats = {
        "PTS": (player["PTS"] / player["Games Played"]).toFixed(1),
        "REB": (player["REB"] / player["Games Played"]).toFixed(1),
        "AST": (player["AST"] / player["Games Played"]).toFixed(1),
        "STL": (player["STL"] / player["Games Played"]).toFixed(1),
        "BLK": (player["BLK"] / player["Games Played"]).toFixed(1),
        "FG%": `${(player["FG"]/player["FGA"] * 100).toFixed(0)}%`,
        "3PT%": `${(player["FG3"]/player["FG3A"] * 100).toFixed(0)}%`,
    }

    return (
        <View style={{width: "100%", height:80, flexDirection:'row', alignItems:'center'}}>
            {/* Left PFP and Name */}
            <View style={{
                width:"45%", flexDirection:'row', height:"100%", alignItems:'center',
                overflow:'hidden', backgroundColor: Colors.bgDarker
            }}>
                <View style={{width:"100%", flexDirection:'row', height:"100%", alignItems:'center'}}>
                    {/* PFP */}
                    <View style={{width:50, height:50, borderRadius:50, marginLeft: 10, backgroundColor:'#fff', overflow:'hidden'}}>
                        <Image 
                            source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${playerExtra.picId}.png`}}
                            style={{width: "100%", height:"100%"}}
                        />
                    </View>

                    {/* Lvl Box */}
                    {/* <View style={{height:"100%", borderRadius: 10, position:'absolute', justifyContent:'flex-end'}}>
                        <View style={{
                            width: 70, height:25, borderRadius: 15, 
                            backgroundColor: getLevelColor(playerLevel),
                            borderWidth: 1, borderBlockColor:'black', 
                            marginLeft: 10, marginBottom: 10, 
                            alignItems:'center', justifyContent:'center'
                        }}>
                            <Text style={{
                                fontFamily: 'Roboto-Bold', fontSize: 16, 
                                color: getLevelColor(playerLevel) === '#FAF9F6' ? "#000" : "#FFF"
                            }}>
                                Lvl {playerLevel}
                            </Text>
                        </View>
                    </View> */}

                    {/* Name and Jersy Number */}
                    <View style={{height:"100%", marginLeft: 10, justifyContent:'center'}}>
                        <Text style={{fontFamily:"Roboto-Bold", color:'white', fontSize: 16}}>
                            {playerExtra.name.charAt(0).toUpperCase() + '. '}
                            {playerExtra.name.split(" ")[1].slice(0, 8)}{playerExtra.name.split(" ")[1].length >= 8 ? "." : ""}
                        </Text>
                        <Text style={{fontFamily:"Roboto-Bold", color:'white', marginTop: 3, fontSize: 14}}>
                            #0
                        </Text>
                    </View>
                </View>
            </View>

            {/* The stats side */}
            <View style={{height:"100%", width:"55%"}}>
                {/* BarChart + Fire Icon */}
                <View style={{width:"100%", height:"50%", alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}> 
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <FontAwesome5 name="fire" size={14} color="#fa5f0d" style={{marginRight: 3}}/>
                        <Text style={{ fontFamily: "Roboto-Bold", color: "#fff", fontSize: 15 }}>
                            14.1k
                        </Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => {
                        setCurrentPlayer(playerData["name"]);
                        handleOpenPress();
                    }}>
                        <MaterialCommunityIcons name="chart-bar" size={24} color="white" style={{marginRight: 10}}/>
                    </TouchableOpacity> */}
                </View>

                {/* All The Stats */}
                <ScrollView style={{ width: "100%"}} horizontal={true}>
                    {Object.entries(stats).map(([key, value], index) => {
                        return (
                            <View key={index} style={{ width: 35, alignItems: 'center', marginRight: index === Object.entries(stats).length-1 ? 10 : 0}}>
                                <Text style={{ fontFamily: "Roboto-Bold", color: "#fff", fontSize: 16 }}>
                                    {value}
                                </Text>
                                <Text style={{ fontFamily: "Roboto-Bold", color: "#b6b6b6", fontSize: 12 }}>
                                    {key}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

        </View>
    )
}
