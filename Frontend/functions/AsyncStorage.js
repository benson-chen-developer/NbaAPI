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