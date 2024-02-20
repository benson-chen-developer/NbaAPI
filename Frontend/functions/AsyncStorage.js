import AsyncStorage from "@react-native-async-storage/async-storage";

export const getGamesToday = async () => {
    try{
        const gamesToday = await AsyncStorage.getItem('gamesToday');

        if(gamesToday === null){
            console.log("AsynceStorage: We didnt cached it");

            fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json")
                .then(res => res.json())
                .then(async data => {

                    const gameDates = data.leagueSchedule.gameDates;
                    // console.log("AsynceStorage: Called Nba API", JSON.stringify(gameDates, null, 2));

                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const year = currentDate.getFullYear();
                    const formattedDate = `${month}/${day}/${year}`;

                    
                    const gamesTodayFetched = gameDates.find(game => 
                        game.gameDate.split(' ')[0] === formattedDate).games;
                    
                    const gamesTodayReturn = [];

                    gamesTodayFetched.forEach(game => {
                        gamesTodayReturn.push({
                            awayTeam: game.awayTeam,
                            homeTeam: game.homeTeam,
                            // timeStart: game.
                        })
                        // console.log("AsynceStorage: Called Nba API", game.homeTeam, null, 2);
                    })
                    // console.log("AsynceStorage: Called Nba API", JSON.stringify(gamesTodayReturn), null, 2);

                    // await AsyncStorage.setItem('gamesToday', JSON.stringify(gamesTodayReturn));

                    return gamesTodayReturn;
                })
                .catch(err => {
                    console.log("AsynceStorage Error NBA API:", err)
                });

        } else {
            // console.log("AsynceStorage: We cached this:", JSON.parse(gamesToday), null, 2);

            return JSON.parse(gamesToday);
        }
    } catch(err){
        console.log("AsynceStorage Error:", err);
    }
}

export const getPlayerStatsToday = async () => {
    try{
        const playersToday = await AsyncStorage.getItem('playersToday');

        if(playersToday === null){
            console.log("AsynceStorage: We didnt cached it (players)");

            try{
                const playerRes = await fetch("https://cdn.nba.com/static/json/staticData/EliasGameStats/00/all_players_season.txt")
                const playerResParsed = await playerRes.text();

                    const lines = playerResParsed.split("\n");
                    const linesToProcess = lines.slice(2); // Remove the first two line
                    const playersArrayRet = [];
                    
                    linesToProcess.map(line => {
                        const playerNameAndStats = line.split(" ").filter(word => word.trim() !== "")
                        
                        playersArrayRet.push({
                            ["name"]: `${playerNameAndStats[4] + playerNameAndStats[3]}`.replace(',', ' ').slice(0, -1),
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
                            ["abbreviated"]: playerNameAndStats[1]
                        });
                    });
    
                    //Clean up the array
                    playersArrayRet.pop();
                    playersArrayRet.shift();
                    playersArrayRet.shift();

                    //Remove the dupes and keep the middle (this is due to players playing on 2 teams)
                    for (let i=0; i<playersArrayRet.length; i++){
                        let lastPlayer = i > 0 ? playersArrayRet[i - 1] : null;

                        if(lastPlayer && playersArrayRet[i].name === lastPlayer.name){
                            playersArrayRet.splice(i-1, 1);
                            playersArrayRet.splice(i, 1);
                        }
                    }

                    // console.log(JSON.stringify(playersArrayRet, null, 2));

                    await AsyncStorage.setItem('playersToday', JSON.stringify(playersArrayRet));

                    return playersArrayRet;
            } catch(err) {
                console.log("AsyncStorage Error, players fetching", err)
                return [];
            }
        } else {
            // console.log("AsynceStorage: We did cache (players):");

            return JSON.parse(playersToday);
        }
    } catch(err) {
        console.log("AsyncStorage Error, players", err)
    }
}

export const getAsyncTeamDepth = async () => {
    return JSON.parse(await AsyncStorage.getItem('teamDepthArray'));
}

export const setAsyncTeamDepth = async (oldPlayer, newPlayer) => {
    if(oldPlayer.name === newPlayer.name){
        console.log("setAsyncTeamDepth Err: Why are these the same player");
        return;
    }

    const teamDepthArray = JSON.parse(await AsyncStorage.getItem('teamDepthArray'));
    const currentTeamDepthArray = teamDepthArray.find((team) => team.abbreviated === oldPlayer.abbreviated).team;

    // console.log("TeamDepth.js, old and new player ", oldPlayer, newPlayer)

    let oldIndex = -1;
    let newIndex = -1;
    console.log("setAsyncTeamDepth, The old teamdepth", currentTeamDepthArray);

    for(let i=0; i<currentTeamDepthArray.length; i++){
        if(currentTeamDepthArray[i].name === oldPlayer.name) oldIndex = i;
        if(currentTeamDepthArray[i].name === newPlayer.name) newIndex = i;
    }

    if(oldIndex === -1){
        console.log("setAsyncTeamDepth Err: Why is the old player not even on the depth");
        return;
    }

    if(oldIndex > -1 && newIndex > -1){
        const oldPlayer = currentTeamDepthArray[oldIndex];
        currentTeamDepthArray[oldIndex] = newPlayer;
        currentTeamDepthArray[newIndex] = oldPlayer;
    } 

    for(let i=0; i<teamDepthArray.length; i++){
        if(teamDepthArray[i].abbreviated === currentTeamDepthArray.abbreviated)
            teamDepthArray[i] = currentTeamDepthArray;
    }

    // console.log("setAsyncTeamDepth, The new teamdepth", teamDepthArray.find((team) => team.abbreviated === oldPlayer.abbreviated).team);

    await AsyncStorage.setItem('teamDepthArray', JSON.stringify(teamDepthArray));

    return teamDepthArray;
}

// let teamDepthArray = [
    //     {name: "Celtics", abbreviated: 'BOS', team: [
    //         {"BLK":28,"FG":426,"FGA":865,"AST":187,"PPG":22,"STL":54,"FT":150,"PTS":1099,"REB":273,"FG3A":284,"Games Played":50,"FTA":209,"FG3":97,"PF":133,"name":"Jaylen Brown","TO":124,"abbreviated":"BOS"},
    //         {"BLK":"59","FG":"276","FGA":"597","AST":"241","PPG":"15.6","STL":"51","FT":"106","REB":"199","PTS":"794","FG3A":"343","Games Played":"51","FTA":"119","FG3":"136","PF":"110","name":"Derrick White","TO":"83","abbreviated":"BOS"},
    //         {"BLK":"31","FG":"481","FGA":"1012","AST":"249","PPG":"27.1","STL":"52","FT":"290","REB":"445","PTS":"1411","FG3A":"438","Games Played":"52","FTA":"352","FG3":"159","PF":"104","name":"Jayson Tatum","TO":"130","abbreviated":"BOS"},
    //         {"BLK":"74","FG":"272","FGA":"512","AST":"77","PPG":"20.2","STL":"24","FT":"191","REB":"277","PTS":"809","FG3A":"201","Games Played":"40","FTA":"226","FG3":"74","PF":"112","name":"Kristaps Porzingis","TO":"67","abbreviated":"BOS"},
    //         {"BLK":"46","FG":"134","FGA":"277","AST":"129","PPG":"8.0","STL":"25","FT":"17","REB":"302","PTS":"359","FG3A":"181","Games Played":"45","FTA":"20","FG3":"74","PF":"67","name":"Al Horford","TO":"33","abbreviated":"BOS"},
    //         {"BLK":"35","FG":"249","FGA":"526","AST":"239","PPG":"13.1","STL":"40","FT":"55","REB":"293","PTS":"656","FG3A":"234","Games Played":"50","FTA":"66","FG3":"103","PF":"83","name":"Jrue Holiday","TO":"93","abbreviated":"BOS"}
    //     ]}
    // ];
