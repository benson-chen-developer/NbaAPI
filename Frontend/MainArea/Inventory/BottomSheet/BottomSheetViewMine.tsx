import { View, Image, Text } from "react-native"
import { PlayerData } from "../../../Global/Types/DataTypes"
import { LinearGradient } from 'expo-linear-gradient';
import { getTeamLogo } from "../../../../assets/TeamLogos/getTeamLogo";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "../../../Global/Enums/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SecondHalf } from "./SecondHalf";
import { Dispatch, SetStateAction } from "react";

interface Props {
    playerStats: PlayerData;
}

export const BottomSheetViewMine: React.FC<Props> = ({playerStats}) => {
    return(
        <View style={{height:'100%', width:"100%", backgroundColor:'rgba(255,255,255,.9)'}}>
            
            {/* 1st Half */}
            <View style={{width:"100%", backgroundColor:'#273447', height:"30%"}}>
                {/* Absolute Positions */}
                <LinearGradient colors={["#007A32", "#273447"]} style={{width:"100%", height:"60%", position:'absolute'}} />
                <Image source={{uri: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&h=200&w=200"}}
                    style={{width:100, height:100, opacity:.75, margin: 15, position:'absolute'}}
                />
                <Text style={{color:'white', fontSize: 28, fontFamily:'Roboto-Bold', position:'absolute', marginLeft: 12}}>
                    #0
                </Text>
                

                <View style={{height:"100%", alignItems:'flex-end', flexDirection:'row'}}>
                    {/* Player Pic */}
                    <View style={{width:"40%", height:"100%", justifyContent:'flex-end'}}>
                        <Image source={{uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${playerStats.picId}.png`}}
                            style={{width:200, height:150}}
                        />
                    </View>

                    {/* All stats on right of pic */}
                    <View style={{width:"60%", height:"100%", marginLeft: 30}}>
                        <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold', marginTop: 10}}>
                            {playerStats.name}
                        </Text>

                        <View style={{flexDirection:'row', height: 50, alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:25,fontFamily:'Roboto-Bold', marginRight:5}}>
                                LV 5
                            </Text>
                            <View style={{width:125, height:23, backgroundColor:'#D9D9D9', borderRadius:5, marginBottom:3}}>
                                <View style={{width:"40%", height:23, backgroundColor:'#2BD6B2', borderRadius:4}}/>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', width:195, justifyContent:'flex-start', top: -5}}>
                            <Image source={{uri: `"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&h=200&w=200"`}}
                                style={{width:22, height:22, top: -2, marginRight:5}}
                            />
                            <Text style={{color:'white', fontSize:15,fontFamily:'Roboto-Bold'}}>
                                100 / 250
                            </Text>
                        </View>

                        <View style={{flexDirection:'row', width:195, justifyContent:'flex-start', top: -5, marginTop:5}}>
                            <MaterialCommunityIcons name="star-shooting" size={24} color="#f2e44e" style={{top: -4, left: 2, marginRight:5}} />
                            <Text style={{color:'white', fontSize:15,fontFamily:'Roboto-Bold'}}>
                                50 / 100
                            </Text>
                        </View>

                        <View style={{flexDirection:'row', width:"100%", top: -5, marginTop:2}}>
                            <View style={{flexDirection:'row'}}>
                                <MaterialCommunityIcons name="crown" size={24} color="#b44ef2" style={{top: -4, left: 2, marginRight:5}}/>
                                <Text style={{color:'white', fontSize:15,fontFamily:'Roboto-Bold', top:-1}}>
                                    5 / 10
                                </Text>
                            </View>

                            <TouchableOpacity style={{
                                width:90, height:40, borderRadius:10, backgroundColor: "#27b799", marginLeft: 30,
                            }}>
                                <View style={{width:"100%", height: 37, backgroundColor: Colors.green, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:'white', fontFamily:"Roboto-Bold", fontSize:18}}>
                                        Upgrade
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <SecondHalf 
                lastFiveGames={[
                    {
                        date: "4/1",
                        opp: "DET",
                        players: [
                            {"PTS": 20,"REB": 2,"AST": 3,"STL": 4,"BLK": 5,"FG": 1, "FGA": 2,"FG3": 2, "FG3A": 2, "FT": 2,"FTA": 2, "Games Played": 2,"PF": 2,"TO": 2, "abbreviated": "BOS","name": "Jayson Tatum"}
                        ]
                    },
                    {
                        date: "4/3",
                        opp: "ATL",
                        players: [
                            {"PTS": 23,"REB": 2,"AST": 3,"STL": 4,"BLK": 5,"FG": 1, "FGA": 2,"FG3": 2, "FG3A": 2, "FT": 2,"FTA": 2, "Games Played": 2,"PF": 2,"TO": 2, "abbreviated": "BOS","name": "Jayson Tatum"}
                        ]
                    },
                    {
                        date: "4/7",
                        opp: "IND",
                        players: [
                            {"PTS": 27,"REB": 2,"AST": 3,"STL": 4,"BLK": 5,"FG": 1, "FGA": 2,"FG3": 2, "FG3A": 2, "FT": 2,"FTA": 2, "Games Played": 2,"PF": 2,"TO": 2, "abbreviated": "BOS","name": "Jayson Tatum"}
                        ]
                    },
                    {
                        date: "4/12",
                        opp: "WAS",
                        players: [
                            {"PTS": 41,"REB": 2,"AST": 3,"STL": 4,"BLK": 5,"FG": 1, "FGA": 2,"FG3": 2, "FG3A": 2, "FT": 2,"FTA": 2, "Games Played": 2,"PF": 2,"TO": 2, "abbreviated": "BOS","name": "Jayson Tatum"}
                        ]
                    },
                    {
                        date: "4/15",
                        opp: "MIL",
                        players: [
                            {"PTS": 15,"REB": 2,"AST": 3,"STL": 4,"BLK": 5,"FG": 1, "FGA": 2,"FG3": 2, "FG3A": 2, "FT": 2,"FTA": 2, "Games Played": 2,"PF": 2,"TO": 2, "abbreviated": "BOS","name": "Jayson Tatum"}
                        ]
                    }
                ]} 
                
                currentPlayer={playerStats}
            />
        </View>
    )
}