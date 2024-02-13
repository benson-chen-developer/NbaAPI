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