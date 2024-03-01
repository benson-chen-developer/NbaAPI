import { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { abbreviateName, getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo"
import { playBtnColor } from "../../../assets/Themes/ThemeColors"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont"
import { useMyContext } from "../../Context/MyContext"
import { startSearchForGame } from "../../functions/GameFunctions/GameStartFunctions"

export const GameCard = ({game}) => {

    const {user, setLoading, liveGames, setLiveGames} = useMyContext();
    const [pickedTeam, setPickedTeam] = useState(null);
    const [pickedTeamNames, setPickedTeamNames] = useState([]);

    const date = new Date(game.timeStart);
    const hours = date.getHours();
    const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes()

    useEffect(() => {
        const teamNames = [];

        liveGames.forEach((game) => {
            const playerTeamName = game.player1Id === user.id ? game.player1Team : game.player2Team;
            teamNames.push(playerTeamName);
        })

        setPickedTeamNames(teamNames);
    }, [])

    const pressPlay = async () => {
        if(liveGames.length >= user.maxLiveGames) return;

        setLoading(true);

        const ourDepth = [
            {name: "L. James","PTS": 0,"REB": 0,"AST": 0,"BLK": 0,"STL": 0,"3PM": 0,"3PA": 0},
            {name: "A. Davis","PTS": 0,"REB": 0,"AST": 0,"BLK": 0,"STL": 0,"3PM": 0,"3PA": 0},
            {name: "D. Russell","PTS": 0,"REB": 0,"AST": 0,"BLK": 0,"STL": 0,"3PM": 0,"3PA": 0},
        ]

        try{    
            const newGame = await startSearchForGame(user, pickedTeam, game, ourDepth);
            
            setLiveGames(p => [...p, newGame]);
            setPickedTeam(null);
            setLoading(false);
        } catch {
            setLoading(false);
            console.log("GameCard Error", err);
        }
    }

    return(
        <View style={{
            width: "95%", backgroundColor:'white',height:250, borderRadius: 10, marginTop: 30,
            shadowColor:'white', shadowOffset: { width: 5, height: 5 }, shadowRadius:5, elevation: 5,
        }}>

            <View style={{width:"100%", flexDirection:'row', alignItems:'center'}}>
                <TeamPicAndStats 
                    team={game.homeTeam} otherTeam={game.awayTeam}
                    isHome={true} pickedTeamNames={pickedTeamNames}
                    pickedTeam={pickedTeam} setPickedTeam={setPickedTeam} 
                />

                <View style={{alignItems:'center', width:"30%"}}>
                    <Text style={{fontFamily:"Roboto-Black", fontSize:25, color:'rgba(0,0,0,1)'}}>
                        {`${hours+5-12}:${minutes}`}
                    </Text>
                    <Text style={{fontFamily:"Roboto-Black", fontSize:20, marginLeft:5, color:'rgba(0,0,0,.5)'}}>PM EST</Text>
                </View>

                <TeamPicAndStats 
                    team={game.awayTeam} otherTeam={game.homeTeam}
                    isHome={false} pickedTeamNames={pickedTeamNames}
                    pickedTeam={pickedTeam} setPickedTeam={setPickedTeam}
                />
            </View>

            <View style={{width:"100%", height: 20, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                
                {pickedTeam && (pickedTeam === game.homeTeam.teamName || pickedTeam === game.awayTeam.teamName) && liveGames.length < user.maxLiveGames ?
                    <TouchableOpacity style={{
                        height:40, width:100, backgroundColor:playBtnColor(pickedTeam).shadow, borderRadius:10
                    }} onPress={() => pressPlay()}>
                        <View style={{
                            height: 38, width:"100%", backgroundColor: playBtnColor(pickedTeam).main, 
                            borderRadius:10, alignItems:'center', justifyContent:'center'
                        }}>
                            <Text style={{color:"white", fontFamily:ThemeFonts, fontSize:20}}>Play</Text>
                        </View>
                    </TouchableOpacity> 
                        :
                    null
                }

                {/* <Text style={{fontFamily:ThemeFonts, fontSize:20, color:'#292f29'}}>
                    {liveGames.length >= user.maxLiveGames ? 
                        "Max Games Played Today"
                            :
                        "Pick A Team To Play"
                    }
                </Text>  */}
            </View>

        </View>
    )
}

/**
 * @param {obj} team 
 *  {
 *      "losses": 49, "score": 0, "seed": 0, 
 *      "teamCity": "Detroit", "teamId": 1610612765, 
 *      "teamName": "Pistons", "teamSlug": "pistons", 
 *      "teamTricode": "DET", "wins": 9
 *  }
 */
const TeamPicAndStats = ({team, otherTeam, isHome, pickedTeam, setPickedTeam, pickedTeamNames}) => {
    const {user, liveGames} = useMyContext();

    const otherTeamIsPickedAlready = pickedTeamNames.find(teamName => teamName === otherTeam.teamName) && team.teamName !== pickedTeamNames.find(teamName => teamName === team.teamName);
    const maxLiveGamesReached = liveGames.length >= user.maxLiveGames;

    if(pickedTeamNames.find(teamName => teamName === team.teamName))
        return(
            <View style={{
                alignItems:'center', paddingTop:10, width: "35%", alignItems:'center', 
                justifyContent:'center', height: "100%", opacity: 1
            }}>

                <View style={{alignItems:'center'}}>
                    <Image 
                        source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(team.teamName)}.png`}}
                        style={{ width: 90,height: 90 }}
                    />
                    <Text style={{color:"black", fontFamily:ThemeFonts, fontSize:18}}>{team.teamName}</Text>
                </View>

                <Text style={{color:'grey'}}>
                    {isHome ? "Home" : "Away"}
                </Text>
            </View>
        )
    
    else if(otherTeamIsPickedAlready || maxLiveGamesReached)
        return(
            <View style={{
                alignItems:'center', paddingTop:10, width: "35%", alignItems:'center', 
                justifyContent:'center', height: "100%", opacity: .25
            }}>

                <View style={{alignItems:'center'}}>
                    <Image 
                        source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(team.teamName)}.png`}}
                        style={{ width: 60, height: 60 }}
                    />
                    <Text style={{color:"black", fontFamily:ThemeFonts, fontSize:18}}>{team.teamName}</Text>
                </View>

                <Text style={{color:'grey'}}>
                    {isHome ? "Home" : "Away"}
                </Text>
            </View>
        )

    else 
        return(
            <TouchableOpacity style={{
                alignItems:'center', paddingTop:10, width: "35%", alignItems:'center', 
                justifyContent:'center', height: "100%", 
                opacity: pickedTeam === team.teamName ? 1 : .25
            }} onPress={() => setPickedTeam(team.teamName)}>

                <View style={{alignItems:'center'}}>
                    <Image 
                        source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(team.teamName)}.png`}}
                        style={{
                            width: pickedTeam === team.teamName ? 90 : 60, 
                            height: pickedTeam === team.teamName ? 90 : 60, 
                    }}/>
                    <Text style={{color:"black", fontFamily:ThemeFonts, fontSize:18}}>{team.teamName}</Text>
                </View>

                <Text style={{color:'grey'}}>
                    {isHome ? "Home" : "Away"}
                </Text>
            </TouchableOpacity>
        )
}