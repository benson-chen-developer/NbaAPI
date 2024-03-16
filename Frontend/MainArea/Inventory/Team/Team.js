import { useState } from "react"
import { View } from "react-native"
import { PlayerCard } from "./PlayerCard"
import { StatsCarousel } from "./StatsCarousel"

export const Team = ({currentTeam, allPlayers, popUpInfo, setPopUpInfo}) => {
    const onPress = (player) => {
        setPopUpInfo(p => ({ ...p, popUpScreen: "Player", player: player, teamDepth: currentTeam }))
    }

    const playerStats = currentTeam.teamDepth.map(playerName => {
        return allPlayers.find(player => player.name === playerName);
    });

    // console.log("Team", playerStats)

    const stats = ["PTS", "REB", "AST", "BLK", "STL"];
    const [selectedStat, setSelectedStat] = useState("PTS");

    return(
        <View style={{width:"100%", height:"100%"}}>
            <StatsCarousel stats={stats} selectedStat={selectedStat} setSelectedStat={setSelectedStat}/>

            <View style={{width:"100%", height:"100%"}}>
                <View style={{width:"100%", height:"30%", justifyContent:'space-evenly', alignItems:"center", flexDirection:'row'}}>
                    {playerStats.slice(0, 3).map((item, index) => (
                        <PlayerCard key={index} selectedStat={selectedStat} player={item} func={onPress} />
                    ))}
                </View>

                <View style={{width:"100%", height:"30%", justifyContent:'space-evenly', flexDirection:'row', marginTop:20}}>
                    {playerStats.slice(3, 5).map((item, index) => (
                        <PlayerCard key={index} selectedStat={selectedStat} player={item} func={onPress} />
                    ))}
                </View>
            </View>
        </View>
    )
}