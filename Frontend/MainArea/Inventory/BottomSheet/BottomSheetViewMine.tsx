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
    mainColor: string;
    imgUrl: string
}

export const BottomSheetViewMine: React.FC<Props> = ({playerStats, imgUrl, mainColor}) => {
    return(
        <View style={{height:'100%', width:"100%", backgroundColor:'rgba(255,255,255,.9)'}}>
            
            {/* 1st Half */}
            <View style={{width:"100%", backgroundColor:'#273447', height:"30%"}}>
                {/* Absolute Positions */}
                <LinearGradient colors={[mainColor, "#273447"]} style={{width:"100%", height:"70%", position:'absolute'}} />
                <Image source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${imgUrl}.png&h=200&w=200`}}
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
                            {playerStats.name.slice(0, 16)}{playerStats.name.length > 16 ? "." : null}
                        </Text>

                        <View style={{flexDirection:'row', height: 50, alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:25,fontFamily:'Roboto-Bold', marginRight:5}}>
                                LV 5
                            </Text>
                            <View style={{width:125, height:23, backgroundColor:'#D9D9D9', borderRadius:5, marginBottom:3}}>
                                <View style={{width:"40%", height:23, backgroundColor:'#2BD6B2', borderRadius:4}}/>
                                <View style={{position:'absolute', width:'100%', height:'100%', justifyContent:'center'}}>
                                    <Text style={{position:'absolute', marginLeft: 5, fontFamily:'Roboto-Bold', fontSize:15}}>100/250</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', width:195, justifyContent:'flex-start', top: -5}}>
                            <Image source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${imgUrl}.png`}}
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

                        <View style={{flexDirection:'row', width:"100%", justifyContent:'center', marginTop: -20, marginLeft: 10}}>
                            <TouchableOpacity style={{
                                width:80, height:37, borderRadius:10, backgroundColor: "#27b799", marginLeft: 30,
                            }}>
                                <View style={{width:"100%", height: 33, backgroundColor: Colors.green, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:'white', fontFamily:"Roboto-Bold", fontSize:16}}>
                                        Upgrade
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <SecondHalf 
                currentPlayer={playerStats}
            />
        </View>
    )
}