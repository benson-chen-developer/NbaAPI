import { generateClient } from 'aws-amplify/api';
import { updateUser } from '../../src/graphql/mutations';

const client = generateClient();

// fetchLiveGameFeed('https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_0022300632.json');
// export const fetchLiveGameFeed = async (gameApiCall) => {
//     try {
//         const response = await fetch(gameApiCall);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         console.log(data.game.actions)
//         // return data; // Return the fetched data
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error; // Rethrow the error to handle it in the calling code
//     }
// }

export const fetchLiveGameFeed = async (user) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const year = nextDate.getFullYear();
    const month = (nextDate.getMonth() + 1).toString().padStart(2, '0');
    const day = nextDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    if(user.todayGames.length > 0) {
        console.log("GamePlayFunction no api call to nbaai")
        return user.todayGames;
    }

    const url = `https://api-nba-v1.p.rapidapi.com/games?date=${formattedDate}`;
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': '4e403baff6mshadd2c7d21764f47p17f730jsn3d2342ebc0eb',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const responseParsed = JSON.parse(result);
        
        const newUser = await client.graphql({
            query: updateUser,
            variables: {
              input: {
                id: user.id,
                todayGames: responseParsed.response
              }
            }
        });

        console.log("teamselection", responseParsed.response)
        return responseParsed.response;
    } catch (error) {
        console.error(error);
    }
}