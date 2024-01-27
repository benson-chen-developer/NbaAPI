import { generateClient } from 'aws-amplify/api';
import { createMatrix, updateMatrix, deleteMatrix } from '../../src/graphql/mutations';
import { listMatrices } from '../../src/graphql/queries';

const client = generateClient();

/* Return an updated game

    game: game to be updated
    joiningPlayerId: the id for the player to join

    How this function works is we first look for all the games and sort it in order of 
    first created and no two filled player ids.
*/
export const startSearchForGame = async (joiningPlayerId, selectedTeam) => {
    try {
        let canJoinGames = await fetchMatrixes(selectedTeam);

        if (canJoinGames.length > 0) {
            return await joinGame(canJoinGames[0], joiningPlayerId, selectedTeam);
        } else {
            return await createGame(joiningPlayerId, selectedTeam);
        }
    } catch (error) {
        console.error("Error fetching matrixes:", error);
        throw error;
    }
}

/* 
    Returns all the matrixes in an array where the player2Id is not filled and the 
    game that player2 is playing is also the opposing team
*/
export const fetchMatrixes = async (selectedTeam) => {
    try {
        const variables = {
            filter: {
                and: [{ player2Id: { eq: null } }, { team1: { ne: selectedTeam } }]
            }
        };
        const result = await client.graphql({
            query: listMatrices,
            variables: variables
        });

        console.log("All The Games (fetchMatrisses)", result.data.listMatrices.items)
        return result.data.listMatrices.items;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const joinGame = async (game, joiningPlayerId, joiningTeam) => {
    try {
        const newGame = await client.graphql({
            query: updateMatrix,
            variables: {
                input: {
                    id: game.id,
                    team2: joiningTeam,
                    player2Id: joiningPlayerId
                }
            }
        });

        return newGame.data.updateMatrix;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export const createGame = async (joiningPlayerId, joiningTeam) => {
    try {
        const newGame = await client.graphql({
            query: createMatrix,
            variables: {
                input: {
                    "player1Id": joiningPlayerId,
                    "player2Id": null,
                    "Matrix": "Lorem ipsum dolor sit amet",
                    "started": false,
                    "player1Ready": false,
                    "player2Ready": false,
                    "team1": joiningTeam,
                    "team2": null,
                    "player1Cards": [],
                    "player2Cards": []
                }
            }
        });

        // console.log("createmax", newGame.data.createMatrix)

        return newGame.data.createMatrix;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/*
    If game didn't start then you can just delete the game

    If the game did start then more will happen
*/
export const leaveGame = async (game, joiningPlayerId) => {

    if(game.started){
        try {
            const newGame = await client.graphql({
                query: updateMatrix,
                variables: {
                  input: {
                    id: game.id,
                    player1Id: game.player1Id === joiningPlayerId ? "0" : game.player1Id,
                    player2Id: game.player2Id === joiningPlayerId ? "0" : game.player2Id,
                  }
                }
            });
    
            return {game: result.data.updateMatrix, isStarted: true};
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } else {
        try {
            const gameDetails = {
                id: game.id
            };
              
            const deletedGame = await client.graphql({
                query: deleteMatrix,
                variables: { input: gameDetails }
            });
    
            return {isStarted: false};
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

}

/*
    Readys up the players

    Check if the other player is ready and if he is then started = true
*/
export const readyUp = async (game, joiningPlayerId) => { 

    let updatedGame = {
        player1Ready: joiningPlayerId === game.player1Id ? !game.player1Ready : game.player1Ready,
        player2Ready: joiningPlayerId === game.player2Id ? !game.player2Ready : game.player2Ready,
    }

    const readyUpGame = await client.graphql({
        query: updateMatrix,
        variables: {
          input: {
            id: game.id,
            player1Ready: updatedGame.player1Ready,
            player2Ready: updatedGame.player2Ready,

            started: (updatedGame.player1Ready && updatedGame.player2Ready) ? true : false
          }
        }
    });
}
