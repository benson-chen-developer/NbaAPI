import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native"
import { abbreviateName } from "../../../assets/TeamLogos/getTeamLogo";
import { Entypo } from '@expo/vector-icons';

export const Header = ({game, scores=[-1, -1], matrixInfo}) => {
    const completedSelectedTiles = matrixInfo.selectedTiles.map(selectedTile => ({
        ...selectedTile,
        complete: true
    })).length;
    const homeTeamName = game.teams[0];
    const awayTeamName = game.teams[1];

    const hours = new Date(game.timeStart).getUTCHours() - 12;
    const minutes = new Date(game.timeStart).getMinutes();
    const timeString = `${hours}:${minutes}`;

    const homeFontSize = scores[0] > scores[1] ? 34 : 28;
    const awayFontSize = scores[1] > scores[0] ? 34 : 28;

    if(completedSelectedTiles !== 3) return(
        <View style={styles.header}>
            <Text>Please Pick {3-completedSelectedTiles} More Tile{3-completedSelectedTiles === 1 ? "" : "s"}</Text>
        </View>
    )

    else if(matrixInfo.isTimeOut) return(
        <View style={styles.headerTimeOut}>
            <Image 
                style={{height:50, width:50, marginRight: 20 }}
                source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(homeTeamName)}.png`}}
            />
            <View style={{height:"100%", justifyContent:'center'}}>
                <Text style={{color:'white', fontSize:20, marginRight: 100}}>TIME OUT</Text>
                <View style={{marginTop:5, flexDirection:'row'}}>
                    <View style={{width:10, height:10, backgroundColor:'white', borderRadius:20, marginRight:5}}/>
                    <View style={{width:10, height:10, backgroundColor:'white', borderRadius:20, marginRight:5}}/>
                    <View style={{width:10, height:10, backgroundColor:'white', borderRadius:20, marginRight:5}}/>
                    <View style={{width:10, height:10, backgroundColor:'white', borderRadius:20, marginRight:5}}/>
                    <View style={{width:10, height:10, backgroundColor:'#717171', borderRadius:20, marginRight:5}}/>
                    <View style={{width:10, height:10, backgroundColor:'#717171', borderRadius:20, marginRight:5}}/>
                </View>
            </View>
            {/* <Entypo name="stopwatch" size={30} color="white" />
            <Text style={{color:'white', fontSize:25, marginLeft:10}}>2:45</Text> */}
        </View>
    )

    return(
        <View style={styles.header}>
            <TeamItem teamName={awayTeamName} isHome={false}/>

            {scores[0] !== -1 ? 
                <View style={{width:95, height:"100%"}}>
                    <View style={{flexDirection:'row', width:"100%", justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: "Roboto-Black", fontSize: homeFontSize, color:'white'}}>
                            {scores[0]} 
                        </Text>
                        <Text style={{fontFamily: "Roboto-Black", fontSize:34, color:'white'}}>
                            -
                        </Text>
                        <Text style={{fontFamily: "Roboto-Black", fontSize: awayFontSize, color:'white'}}>
                            {scores[1]} 
                        </Text>
                    </View>

                    <View style={{flexDirection:'row', width:"100%", justifyContent:'center'}}>
                        <Text style={{fontFamily: "Roboto", fontSize:18, color:'white'}}>
                            12:00
                        </Text>
                    </View>
                </View>
                    :
                <View style={{width:100, alignItems:'center'}}>
                    <Text style={styles.gameTime}>
                        {timeString}
                    </Text>
                    <Text style={styles.gameTimeSmall}>
                        PM EST
                    </Text>
                </View>
            }

            <TeamItem teamName={homeTeamName} isHome={true}/>
        </View>
    )
}

const TeamItem = ({teamName, isHome}) => {
    return(
        <View style={{
            justifyContent:'center', height:100, width:120, 
            alignItems: isHome ? 'flex-end' : 'flex-start', 
            marginLeft: isHome ? 0 : 10, marginRight: !isHome ? 0 : 10
        }}>
            <Image 
                style={{height:60, width:60 }}
                source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamName)}.png`}}
            />
            <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:18}}>
                {teamName}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:"100%", height:50, flexDirection:'row', marginBottom:10,
        justifyContent:'space-between', alignItems:'center'
    },
    headerTimeOut:{
        width:"100%", height:50, flexDirection:'row', marginBottom:10, 
        marginLeft: 20, marginRight: 20,
        // justifyContent:'space-between', 
        alignItems:'center'
    },
    gameTime:{
        color:'white', fontSize:20, fontFamily:'Roboto-Bold'
    },
    gameTimeSmall:{
        color:'white', fontSize:15, fontFamily:'Roboto-Regular'
    }
})