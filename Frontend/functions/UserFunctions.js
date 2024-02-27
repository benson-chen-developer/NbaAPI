import { generateClient } from 'aws-amplify/api';
import { createUser, updateUser } from '../../src/graphql/mutations';
import { gamesByUserID, getGame, getUser, listGames, listUsers } from '../../src/graphql/queries';

const client = generateClient();

export const createUserFunction = async (userId, email) => { 
    const newUser = await client.graphql({
        query: createUser,
        variables: {
            input: {
                email: email,
                userId: userId,
                "score": 0,
                "currentGames": []
            }
        }
    });

    return newUser;
}

const createTeamDepth = () => {
    let retArr = [];

    retArr.push({name: 'Celtics', players: [
        {"AST": "187", "BLK": "28", "FG": "426", "FG3": "97", "FG3A": "284", "FGA": "865", "FT": "150", "FTA": "209", "Games Played": "50", "PF": "133", "PPG": "22.0", "PTS": "1099", "REB": "273", "STL": "54", "TO": "124", "abbreviated": "BOS", "name": "Jaylen Brown"}
    ]})
}

export const setPlayerTeamDepth = (newPlayer, oldPlayer, user) => {
    const oldPlayerIndex = user.teamDepth.findIndex(player => player.name === oldPlayer.name);
    const newPlayerIndex = user.teamDepth.findIndex(player => player.name === newPlayer.name);

    if (oldPlayerIndex !== -1 && newPlayerIndex !== -1) {
        const updatedTeamDepth = [...teamDepth];

        // Swap the positions of the old player and new player
        [updatedTeamDepth[oldPlayerIndex], updatedTeamDepth[newPlayerIndex]] = 
        [updatedTeamDepth[newPlayerIndex], updatedTeamDepth[oldPlayerIndex]];

        // setTeamDepth(updatedTeamDepth);
        console.log("Old Team Depth", user.teamDepth)
        console.log("New Team Depth", updatedTeamDepth)
    }

}

export const getCurrentUserWithAuth = async (user) => {
    const result = await client.graphql({
        query: getUser,
        variables: { id: '39485f21-c5c4-42bf-a224-ce1aa3db9f81' }
      });

    // console.log("userFunction user (getUser):", JSON.stringify(result.data.getUser, null, 2));
    return result.data.getUser
}

// export const getLiveGames = async (user) => {
//     const games = await client.graphql({
//         query: gamesByUserID,
//         variables: {userID: user.id}
//     });

//     const ret = games.data.gamesByUserID.items;
//     // console.log("getLiveGames", ret)

//     return ret;
// }

export const getLiveGamesViaUserId = async (userID) => {
    const games = await client.graphql({
        query: gamesByUserID,
        variables: {userID: userID}
    });

    const ret = games.data.gamesByUserID.items;
    // console.log("getLiveGames", ret)

    return ret;
}