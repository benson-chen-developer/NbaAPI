import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateClient } from "aws-amplify/api";
import { listTeamData } from '../../../src/graphql/queries';

const client = generateClient();

export const getTeamDataAWS = async () => {
    const teamData = await client.graphql({
        query: listTeamData,
    });

    const ret = teamData.data.listTeamData.items;
    return ret;
}

/**
 * @param {[{name: "Celtics", abbreviated:'BOS', players: [string]}]} teams 
 *      - This arr holds all the players that we want to return
 * 
 * @return
 */
 export const getPlayerStatsToday = async (regrabInfo, teams) => {
    try{
        const playersToday = await AsyncStorage.getItem('playersToday');

        // if(regrabInfo){
        if(true){
            console.log("AsynceStorage: We didnt cached it (players)");

            try{
                const playerRes = await fetch("https://cdn.nba.com/static/json/staticData/EliasGameStats/00/all_players_season.txt")
                const playerResParsed = await playerRes.text();

                    const lines = playerResParsed.split("\n");
                    const linesToProcess = lines.slice(2); // Remove the first two line
                    const playersArrayRet = [];
                    const allPlayers = [];
                    teams.forEach(team => {
                        team.players.forEach(playerString => {
                            const playerObject = JSON.parse(playerString);
                            allPlayers.push(playerObject);
                        });
                    });
                    // console.log("allPlayers", allPlayers)
                    
                    linesToProcess.map(line => {
                        const playerNameAndStats = line.split(" ").filter(word => word.trim() !== "")
                        const playerName = `${playerNameAndStats[4] + playerNameAndStats[3]}`.replace(',', ' ').slice(0, -1);
                        
                        const foundPlayer = allPlayers.find(p => p.name === playerName);
                        if(foundPlayer)
                            playersArrayRet.push({
                                ["name"]: playerName,
                                ["FG"]: playerNameAndStats[9],
                                ["FGA"]: playerNameAndStats[10],
                                ["FG3"]: playerNameAndStats[12],
                                ["FG3A"]: playerNameAndStats[13],
                                ["FT"]: playerNameAndStats[15],
                                ["FTA"]: playerNameAndStats[16],
                                ["REB"]: playerNameAndStats[20],
                                ["AST"]: playerNameAndStats[21],
                                ["PF"]: playerNameAndStats[22],
                                ["STL"]: playerNameAndStats[24],
                                ["TO"]: playerNameAndStats[25],
                                ["BLK"]: playerNameAndStats[26],
                                ["PTS"]: playerNameAndStats[27],
                                ["PPG"]: playerNameAndStats[28],
                                ["Games Played"]: playerNameAndStats[6],
                                ["abbreviated"]: playerNameAndStats[1],
                                ["picId"]: foundPlayer.picId
                            });
                    });

                    //Remove the dupes and keep the middle (this is due to players playing on 2 teams)
                    for (let i=0; i<playersArrayRet.length; i++){
                        let lastPlayer = i > 0 ? playersArrayRet[i - 1] : null;

                        if(lastPlayer && playersArrayRet[i].name === lastPlayer.name){
                            playersArrayRet.splice(i-1, 1);
                            playersArrayRet.splice(i, 1);
                        }
                    }

                    // For some reason there is still a double of players where one only plays
                    // like 1 game so remove the lowest games played one
                    playersArrayRet.sort((a, b) => a["Games Played"] - b["Games Played"]);
                    const uniquePlayers = {};
                    playersArrayRet.forEach(player => {
                        const playerName = player.name;
                        const gamesPlayed = player["Games Played"];
                        if (!uniquePlayers[playerName] || gamesPlayed > uniquePlayers[playerName]["Games Played"]) {
                            uniquePlayers[playerName] = player;
                        }
                    });
                    const uniquePlayersArray = Object.values(uniquePlayers);


                    await AsyncStorage.setItem('playersToday', JSON.stringify(playersArrayRet));

                    // console.log("playersToday", playersToday)
                    return uniquePlayersArray;
            } catch(err) {
                console.log("AsyncStorage Error, players fetching", err)
                return [];
            }
        } else {
            console.log("AsynceStorage: We did cache (players):");
            return JSON.parse(playersToday);
        }
    } catch(err) {
        console.log("AsyncStorage Error, players", err)
    }
}