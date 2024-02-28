import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';
import { getTeamLogo, getTeamLogoCdn } from '../../../assets/TeamLogos/getTeamLogo';
import { useNavigation } from '@react-navigation/native';

export default function LiveGameSlip({setSelectedLiveGameId, game}) {

    const navigation = useNavigation();

    const bringToLiveGame = (game) => {

        navigation.navigate("GameHome", { 
            homeTeam: game.teams[0],
            awayTeam: game.teams[1],
            game: game,
            player1Team: [
                {
                    name: "J. Butler",
                    "PTS": 0,
                    "REB": 0,
                    "AST": 0,
                    "BLK": 0,
                    "STL": 0,
                    "3PM": 0,
                    "3PA": 0
                },
                {
                    name: "B. Adebayo",
                    "PTS": 0,
                    "REB": 0,
                    "AST": 0,
                    "BLK": 0,
                    "STL": 0,
                    "3PM": 0,
                    "3PA": 0
                },
                {
                    name: "D. Robinson",
                    "PTS": 0,
                    "REB": 0,
                    "AST": 0,
                    "BLK": 0,
                    "STL": 0,
                    "3PM": 0,
                    "3PA": 0
                },
            ],
            player2Team: ["J. Allen", "Jeremy Sochan", "Jeremy Sochan"],
            api: 'https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_0022300842.json'
        })
        
    }

    useEffect(() => {
        // console.log("LiveGameSlip", JSON.stringify(game, null, 2));
    }, []);

    return(
        <TouchableOpacity style={{
            width:"90%", height: 125, borderRadius: 5, backgroundColor:"white",
            margin: 15, flexDirection:'row', 
            justifyContent:'space-around', alignItems:'center'
        }} onPress={() => bringToLiveGame(game)}>
            <View>
                <Image source={{uri: getTeamLogoCdn(game.teams[0])}} style={styles.logo}/>
            </View>

            <Text style={{
                fontFamily: ThemeFonts, fontSize: 35
            }}>
                100 : 50
            </Text>

            <View>
                <Image source={{uri: getTeamLogoCdn(game.teams[1])}} style={styles.logo}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logo: {
      height: 80, width: 80
    },
  });