import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native"
import { abbreviateName, getTeamLogoCdn } from "../../../assets/TeamLogos/getTeamLogo";
import { fetchBoxScore, updateLastActionNumber, updatePlayerStats } from "../../functions/GameLiveFunctions";
import { GamePlayers } from "./GamePlayers";
import { useMyContext } from '../../Context/MyContext';

export const GameHome = ({route}) => {

    const {user} = useMyContext();

    const { 
        homeTeam, awayTeam, api, game,
        player1Team, player2Team
    } = route.params;

    const [homePlayerStats, setHomePlayerStats] = useState([]);
    const [awayPlayerStats, setAwayPlayerStats] = useState([]);

    useEffect(() => {
        fetchBoxScore(api, game.player1Id === user.id ? game.player1LastActionNumber :game.player2LastActionNumber)
            .then(res => {
                const updatedPlayers = updatePlayerStats(res, player1Team);
                setHomePlayerStats(updatedPlayers);

                updateLastActionNumber(user.id, game, res[res.length-1].actionNumber);

                // console.log("GameHome (updatedPlayers)", updatedPlayers)
            })
    }, [])

    return(
        <SafeAreaView style={{backgroundColor:"#162538"}}>
            <View style={{width:"100%", height:"100%", backgroundColor:"#162538"}}>
                
                <View style={styles.header}>
                    <TeamItem teamName={homeTeam} isHome={true}/>

                    <View style={{flexDirection:'row', width:100, justifyContent:'space-between'}}>
                        <Text style={styles.score}>50</Text>
                        <Text style={styles.score}>25</Text>
                    </View>

                    <TeamItem teamName={awayTeam} isHome={false}/>
                </View>

                <GamePlayers players={homePlayerStats}/>

            </View>
        </SafeAreaView>
    )
}

const TeamItem = ({teamName, isHome}) => {
    if(isHome)
        return(
            <View style={styles.teamItem}>
                <Image 
                    style={{height:50, width:50, marginRight:5}}
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamName)}.png`}}
                />
                <View>
                    <Text style={{color:'white', fontFamily:'Roboto-MediumItalic', fontSize:20}}>
                        {teamName}
                    </Text>
                    <Text style={{color:'white'}}>
                        Home
                    </Text>
                </View>
            </View>
        )
    else
        return(
            <View style={styles.teamItem}>
                <View>
                    <Text style={{color:'white', fontFamily:'Roboto-MediumItalic', fontSize:20}}>
                        {teamName}
                    </Text>
                    <Text style={{color:'white'}}>
                        Away
                    </Text>
                </View>
                <Image 
                    style={{height:50, width:50, marginLeft:5}}
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamName)}.png`}}
                />
            </View>
        )
}

const styles = StyleSheet.create({
    header:{
        width:"100%", height:40, flexDirection:'row',
        justifyContent:'space-evenly', alignItems:'center',
    },
    teamItem: {
        justifyContent:'center', alignItems:'center', height:100, width:200,
        flexDirection:'row'
    },
    score:{
        fontFamily: "Roboto-Black", fontSize:25, color:'white'
    }
})