import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearGamesToday = async () => {
    const time = convertToEst(new Date());
    
    const timeStart = new Date(time - (24 * 60 * 60 * 1000)); //12 hrs ago
    console.log("clearGamesToday", timeStart)
    // console.log(twelveHoursAgo);
    
    await AsyncStorage.setItem('gamesToday', JSON.stringify([{
        timeStart: timeStart, homeTeam: "No Games", timeZone: 'EST'
    }]));
}

export const getGamesToday = async () => {
    try{
        let gamesToday = await AsyncStorage.getItem('gamesToday');
        gamesToday = JSON.parse(gamesToday);

        const firstGame = gamesToday[0];

        /* If the games are still today */
        if(firstGame.timeStart && !isYesterday(firstGame.timeZone, firstGame.timeStart)){
            console.log("AsynceStorage: We cached this:", gamesToday);
            return gamesToday;

        } else {
            const grabbedTodayGames =  await apiCall();
            console.log("AsynceStorage: grabbedTodayGames" , grabbedTodayGames);

            /* This is to check if there are any games today */
            if(grabbedTodayGames.length > 0){
                console.log("AsynceStorage: New Games");

                await AsyncStorage.setItem('gamesToday', JSON.stringify(grabbedTodayGames));
                return grabbedTodayGames;

            } else {
                console.log("AsynceStorage: No Games");
                
                const time = convertToEst(new Date());
                await AsyncStorage.setItem('gamesToday', JSON.stringify([{
                    timeStart: time, homeTeam: "No Games"
                }]));
                return [{timeStart: time}];
            }
        }
    } catch(err){
        console.log("AsynceStorage Error:", err);
    }
}

const convertToEst = (time) => {
    const timeMillis = time.getTime(); // Get milliseconds from the input time
    const estOffsetMillis = -5 * 60 * 60 * 1000; // -5 hours in milliseconds
    const estTimeMillis = timeMillis + estOffsetMillis;

    return new Date(estTimeMillis);
}

/*
    The time in timeToCheck should already be set to the correct time zone
*/
const isYesterday = (timeZone, timeToCheck) => {
    const date = new Date();
    let adjustedTimeCurrent;

    let timeToCheckObj = new Date(timeToCheck);

    if (timeZone === "EST") {
        adjustedTimeCurrent = new Date(date.getTime() - (5 * 60 * 60 * 1000));
        // console.log("isYest", adjustedTimeCurrent, "TimeZone:", timeZone);

        // Check if adjustedTimeCurrent is at least one day ahead of timeToCheck
        if (adjustedTimeCurrent.getDate() > timeToCheckObj.getDate() ||
            adjustedTimeCurrent.getMonth() > timeToCheckObj.getMonth() ||
            adjustedTimeCurrent.getFullYear() > timeToCheckObj.getFullYear()) {
            return true;
        }
    }
    return false;
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

/*

    In nba finshed games will have gameStatusText of "Final"

    Future = 7:30 pm ET

    Current = "4th Qtr             "
*/