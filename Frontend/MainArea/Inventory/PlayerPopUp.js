import { useEffect, useState } from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont";
import { FontAwesome } from '@expo/vector-icons';

export const PlayerPopUp = ({currentPlayer, setCurrentPlayer, setPopUp, currentTeam}) => {

    useEffect(() => {
        // console.log('playerpopup', currentPlayer)
    }, [])

    return(
        // Whole Screen including black part
        <View style={{height:"100%", width:"100%", backgroundColor:'rgba(0,0,0,.5)', position:'absolute',justifyContent:'center', alignItems:'center'}}>
            
            {/* White Box */}
            <View style={{
                height: "75%", width:"90%", backgroundColor:'white', borderRadius:10, alignItems:'center'
            }}>
                {/* First Row */}
                <View style={{width:"90%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', height:"100%", alignItems:'center'}}>
                        <View style={{width:70, height:70, justifyContent:'center', alignItems:'center', backgroundColor: "#162438", borderRadius: 5}}>
                            <View style={{
                                width:70, height:70, justifyContent:'center', alignItems:'center',
                                position:'absolute', top: -4, left:-4, backgroundColor: "#283f60", borderRadius:5
                            }}>
                                <Image source={getTeamLogo(currentTeam.name)} style={{width:50, height:50}}/>
                            </View>
                        </View>
                        <Text style={{fontFamily: 'Roboto-BlackItalic', fontSize: 30, marginLeft: 15}}>
                            {currentTeam.name.toUpperCase()}
                        </Text>
                    </View>
                    <View style={{height: "100%", alignItems:'flex-start'}}>
                        <TouchableOpacity onPress={() => setPopUp(false)}>
                            <FontAwesome name="close" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Second Row */}
                <View style={{width:"90%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text>{currentPlayer.name}</Text>
                </View>

                {/* Third (Pic) */}
                <View style={{width:"90%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Image />
                </View>

                {/* Fourth (Stats) */}
                <StatBar currentPlayer={currentPlayer}/>
            </View>
        </View>
    )
}

const StatBar = ({currentPlayer}) => {
    const numberColor = "grey"; const statColor = "black";
    return(
        <View style={{width:"80%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{width: "20%", alignItems:'center'}}>
                <Text style={{fontFamily:ThemeFonts, fontSize:25, color:statColor}}>PTS</Text>
                <Text style={{fontFamily:ThemeFonts, fontSize:20, color:numberColor}}>{currentPlayer.PPG}</Text>
            </View>
            <View style={{width: "20%", alignItems:'center'}}>
                <Text style={{fontFamily:ThemeFonts, fontSize:25, color:statColor}}>REB</Text>
                <Text style={{fontFamily:ThemeFonts, fontSize:20, color:numberColor}}>{(currentPlayer.REB / currentPlayer['Games Played']).toFixed(1)}</Text>
            </View>
            <View style={{width: "20%", alignItems:'center'}}>
                <Text style={{fontFamily:ThemeFonts, fontSize:25, color:statColor}}>AST</Text>
                <Text style={{fontFamily:ThemeFonts, fontSize:20, color:numberColor}}>{(currentPlayer.AST / currentPlayer['Games Played']).toFixed(1)}</Text>
            </View>
        </View>
    )
}