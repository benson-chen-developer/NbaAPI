import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const getTodayTmrGames = async () => {
    return fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json")
        .then(res => res.json())
        .then(async data => {
            const gameDates = data.leagueSchedule.gameDates;
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;

            // console.log("AsyncStorage TodayTmrGames", JSON.stringify(data.leagueSchedule.gameDates, null, 2));

            const gamesTodayFetched = gameDates.find(game => 
                game.gameDate.split(' ')[0] === formattedDate)?.games || [];

            const gamesTodayReturn = gamesTodayFetched.map(game => ({
                awayTeam: game.awayTeam,
                homeTeam: game.homeTeam,
                timeStart: game.gameDateTimeEst,
                apiLink: `https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_${game.gameId}.json`
            }));

            return gamesTodayReturn;
        })
        .catch(err => {
            console.log("Error fetching NBA API:", err);
            return []; // Return empty array if there's an error
        });
}

/**
 * @returns {bool} If it is true then regrab games and player stats
 */
export const AsyncDailyCheck = async () => {
    /*
        We reset the daily check at 1:15 AM EST each day
        
        How we do this is we get the current time and see if it is
        after the nextDailyResetTime. If it is we return true and 
        then set nextDailyResetTime to tmr's 1:15 AM EST date.
    */

    const nextDailyResetTime = JSON.parse(await AsyncStorage.getItem('nextDailyResetTime'));
    const timeNow = Date.now();

    // console.log("AsyncDailyCheck TimeNow", timeNow)
    // console.log("AsyncDailyCheck", nextDailyResetTime)

    if(timeNow > nextDailyResetTime){
        let nextDailyResetTime = new Date(); /* Should be 1:15AM EST in UTC time which is 6:15 */
        nextDailyResetTime.setUTCHours(6, 15, 0, 0);
        console.log("We have to change nextDailyResetTime", nextDailyResetTime);

        await AsyncStorage.setItem('nextDailyResetTime', JSON.stringify(nextDailyResetTime));

        return true;
    } else {
        return false;
    }
}