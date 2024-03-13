import { useState } from "react"
import { View } from "react-native"
import { PlayerCard } from "./PlayerCard"
import { StatsCarousel } from "./StatsCarousel"

export const Team = ({currentTeam, allPlayers, popUpInfo, setPopUpInfo}) => {
    const onPress = () => {}

    const playerStats = currentTeam.teamDepth.map(playerName => {
        return allPlayers.find(player => player.name === playerName);
    });

    console.log("Team", playerStats)
    console.log("Team", currentTeam.teamDepth)

    const [stats, setStats] = useState([
        {name: "PTS", selected: false}, 
        {name: "REB", selected: false}, 
        {name: "AST", selected: false}, 
        {name: "BLK", selected: false}, 
        {name: "STL", selected: false}, 
    ]);

    return(
        <View style={{width:"100%", height:"100%"}}>
            <StatsCarousel stats={stats} setStats={setStats}/>

            <View style={{width:"100%", justifyContent:'space-evenly', flexDirection:'row'}}>
                {currentTeam.teamDepth.slice(0, 3).map((item, index) => (
                    <PlayerCard key={index} player={item} func={onPress} />
                ))}
            </View>

            <View style={{width:"100%", justifyContent:'space-evenly', flexDirection:'row', marginTop:20}}>
                {currentTeam.teamDepth.slice(3, 5).map((item, index) => (
                    <PlayerCard key={index} player={item} func={onPress} />
                ))}
            </View>
        </View>
    )
}