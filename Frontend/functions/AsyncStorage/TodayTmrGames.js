import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTodayTmrGames = async (regrabInfo) => {
    if(regrabInfo){
        console.log("TodayTmrGames, We didn't Cached the Games");

        const gamesToday = await fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json")
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
    
                    const gamesTodayReturn = gamesTodayFetched.map(game => {
                        const gameDateTime = new Date(game.gameDateTimeEst);
                        gameDateTime.setMinutes(gameDateTime.getMinutes() + 10);
                        const newGameDateTime = gameDateTime.toISOString();
                        
                        return {
                            awayTeam: game.awayTeam,
                            homeTeam: game.homeTeam,
                            timeStart: newGameDateTime,
                            apiLink: `https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_${game.gameId}.json`
                        };
                    });
    
                return gamesTodayReturn;
            })
            .catch(err => {
                console.log("Error fetching NBA API:", err);
                return []; // Return empty array if there's an error
            });

        await AsyncStorage.setItem("todayTmrGames", JSON.stringify(gamesToday));

        return gamesToday;
    }
    else {
        console.log("TodayTmrGames, We Cached the Games");
        return JSON.parse(await AsyncStorage.getItem("todayTmrGames"));
    }
}