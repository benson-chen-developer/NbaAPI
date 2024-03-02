import { generateClient } from 'aws-amplify/api';
import { createUser, updateGame, updateUser } from '../../src/graphql/mutations';
import { userGamesByUserId, getUser, getGame, listUsers } from '../../src/graphql/queries';
import { fetchBoxScore, getLatestActionsAndUpdateGame, updatePlayerStats } from './GameFunctions/GameLiveFunctions';
import { UpdateGame } from './MutationFunctions/GameMutation';

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

export const getLiveGames = async (userId) => {

    const gameIdsRet = await client.graphql({
        query: userGamesByUserId,
        variables: {userId: userId}
    });

    const gameIds = gameIdsRet.data.userGamesByUserId.items;

    const games = [];

    for (const g of gameIds) {
        try {
            const game = await client.graphql({
                query: getGame,
                variables: { id: g.gameId }
            });
            
            games.push(game.data.getGame);
        } catch (error) {
            console.error("Error fetching game:", error);
        }
    }

    /* Filter Out The Finished Games from Live Ones */
    let filteredGames = games.filter(game => !game.ended);

    /* Update Games With Current Stats */
    for (let i = 0; i < filteredGames.length; i++) {
        const game = filteredGames[i];
        try {
            const updatedGame = await getLatestActionsAndUpdateGame(game, userId);
            filteredGames[i] = updatedGame;
        } catch (error) {
            console.error("Check if game ended err:", error);
        }
    }

    return games;
}