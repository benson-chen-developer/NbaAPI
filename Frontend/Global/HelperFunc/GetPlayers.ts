import { TeamData } from "../Types/ContextTypes";
import { PlayerStats } from "../Types/PlayerTypes";

export const GetPlayerStatsOfTeam = (teamAbbreviated: string, allPlayers: PlayerStats[]): PlayerStats[] => {
    let players = [];
    console.log("allPlayers", allPlayers)
    allPlayers.forEach(p => {
        if(p.abbreviated === teamAbbreviated){
            players.push(p);
        }
    })

    return players;
}