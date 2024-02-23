import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearGamesToday = async () => {
    await AsyncStorage.setItem('gamesToday', JSON.stringify([{
        timeStart: Date.now(), homeTeam: "No Games"
    }]));
}

export const getGamesToday = async () => {
    try{
        let gamesToday = await AsyncStorage.getItem('gamesToday');
        gamesToday = JSON.parse(gamesToday);

        /* If the games are still today */
        if(gamesToday[0].timeStart && gamesToday[0].timeStart < Date.now()){
            console.log("AsynceStorage: We cached this:", gamesToday, null, 2);
            return gamesToday;

        } else {
            const grabbedTodayGames =  await apiCall();
            console.log("AsynceStorage: grabbedTodayGames" , grabbedTodayGames);

            if(grabbedTodayGames.length > 0){
                console.log("AsynceStorage: New Games");

                await AsyncStorage.setItem('gamesToday', gamesTodayReturn);
                return grabbedTodayGames;

            } else {
                console.log("AsynceStorage: No Games");
                
                await AsyncStorage.setItem('gamesToday', JSON.stringify([{
                    timeStart: Date.now(), homeTeam: "No Games"
                }]));
                return [{timeStart: Date.now()}];
            }
        }
    } catch(err){
        console.log("AsynceStorage Error:", err);
    }
}

const apiCall = async () => {
    return fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json")
        .then(res => res.json())
        .then(async data => {

            const gameDates = data.leagueSchedule.gameDates;
            // console.log("AsynceStorage: Called Nba API", JSON.stringify(gameDates[0], null, 2));

            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            
            let gamesTodayFetched = gameDates.find(game => game.gameDate.split(' ')[0] === formattedDate)
            if(gamesTodayFetched) gamesTodayFetched = gamesTodayFetched.games;

            const gamesTodayReturn = [];
            
            if(gamesTodayFetched){
                gamesTodayFetched.forEach(game => {
                    gamesTodayReturn.push({
                        awayTeam: game.awayTeam,
                        homeTeam: game.homeTeam,
                        timeStart: game.gameDateUTC
                    })
                    // console.log("AsynceStorage: Called Nba API", game.homeTeam, null, 2);
                })
            }
            // console.log("AsynceStorage: Called Nba API", JSON.stringify(gamesTodayReturn), null, 2);

            return gamesTodayReturn;
        })
        .catch(err => {
            console.log("AsynceStorage Error NBA API:", err)
        });
}