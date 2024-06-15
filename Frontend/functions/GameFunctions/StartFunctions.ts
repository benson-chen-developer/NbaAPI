import { generateClient } from 'aws-amplify/api';
import {listGames, listUsers} from '../../../src/graphql/queries';
import {updateGame, createGame, updateUser, createUserGame} from '../../../src/graphql/mutations';
import { generateMatrix2 } from '../MatrixFunctions';
import { getAverages } from '../StatFunctions';
import { Game, UserDepthType } from '../../Global/Types/GameTypes';
import { User } from '../../Global/Types/ContextTypes';

const client = generateClient();

export const startSearchForGame = async (
    user: User, 
    selectedTeam: string, 
    homeTeam: string,
    awayTeam: string, 
    timeStart: string, 
    apiLink: string,
    playerDepth: UserDepthType[],
    sabotage: UserDepthType
): Promise<Game> => {
    const joiningPlayerId = user.id;

    try {
        const canJoinGames = await fetchGames(selectedTeam === homeTeam ? awayTeam : homeTeam);
        let game;

        if (canJoinGames.length > 0) {
            // game = await joinGame(canJoinGames[0], joiningPlayerId, selectedTeam);
        } else {
            game = await createGameFuncion(
                joiningPlayerId, 
                selectedTeam, 
                homeTeam, 
                awayTeam, 
                timeStart, 
                playerDepth, 
                apiLink,
                sabotage
            );
        }

        return game;
    } catch (error) {
        console.error("Error (startSearchForGame)", error);
        throw error;
    }
}

/* 
    Returns all the games in an array where the player2Id is not filled and the 
    game that player2 is playing is also the opposing team
*/
export const fetchGames = async (opposingTeam: string): Promise<any[]> => {
    try {
        const variables = {
            filter: {
                and: [{ player2Id: { eq: null } }, { player2Team: { eq: opposingTeam } }]
            }
        };
        const result = await client.graphql({
            query: listGames,
            variables: variables
        });

        const games = result.data.listGames.items;
        
        // console.log("FetchGames/GameStartFunctions", games);
        return games;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// export const joinGame = async (game, joiningPlayerId) => {
//     try {
//         const newGame = await client.graphql({
//             query: updateGame,
//             variables: {
//                 input: {
//                     id: game.id,
//                     player2Id: joiningPlayerId
//                 }
//             }
//         });

//         return newGame.data.updateGame;

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

export const createGameFuncion = async (
    joiningPlayerId: string, 
    selectedTeam:string, 
    homeTeam:string, 
    awayTeam:string, 
    timeStart: string, 
    playerDepth: UserDepthType[], 
    apiLink:string,
    sabotage: UserDepthType
) => {
    try {
        const matrix = generateMatrix2(playerDepth, selectedTeam);
        // console.log("GaneStartFunction", JSON.stringify(matrix, null, 2));

        const newGame = await client.graphql({
            query: createGame,
            variables: {
                input: {
                    player1Id: joiningPlayerId,
                    player2Id: null,
                    apiLink: apiLink,
                    player1Team: selectedTeam,
                    player2Team: selectedTeam === homeTeam ? awayTeam : homeTeam,
                    started: false,
                    ended: false,
                    player1LastActionNumber: -1,
                    player2LastActionNumber: -1,
                    player1Depth: playerDepth.map(player => JSON.stringify({
                        name: player.name,
                        level: player.level
                    })),
                    player2Depth: [],
                    matrix: matrix.map(tile => JSON.stringify(tile)),
                    timeStart: timeStart,
                    player1CheckedIn: false,
                    player2CheckedIn: false,
                    player1SelectedTiles: [-1, -1, -1],
                    player2SelectedTiles: [-1, -1, -1],
                    timeoutArray: JSON.stringify([
                        {
                            actionNumber: -1,
                            teams:{
                                name: selectedTeam, 
                                players: playerDepth.map(player => ({
                                    name: player.name,
                                    PTS: 0, REB: 0, AST: 0,
                                    STL: 0, BLK:0, "3PM": 0, "3PA": 0
                                }))
                            },
                            matrix: matrix.map(tile => JSON.stringify(tile)),
                            player1SelectedTiles: [-1, -1, -1],
                            player2SelectedTiles: [-1, -1, -1],
                        }
                    ]),
                    homeTeam: homeTeam,
                    awayTeam: awayTeam,
                    player1Sabotage: JSON.stringify({
                        name: sabotage.name,
                        level: sabotage.level
                    }),
                    player2Sabotage: null
                }
            }
        });
        

        // console.log("newGame", newGame.data.createGame.id)

        // const newUserGame = await client.graphql({
        //     query: createUserGame,
        //     variables: {
        //         input: {
        //             userId: joiningPlayerId,
        //             gameId: newGame.data.createGame.id,
        //         },
        //     }
        // });
        
        return newGame.data.createGame;
    } catch (error) {
        console.error("CreateGameFunction err", error);
    }
}

/*
    If game didn't start then you can just delete the game

    If the game did start then more will happen
*/
// export const leaveGame = async (game, joiningPlayerId) => {

//     if(game.started){
//         try {
//             const newGame = await client.graphql({
//                 query: updateMatrix,
//                 variables: {
//                   input: {
//                     id: game.id,
//                     player1Id: game.player1Id === joiningPlayerId ? "0" : game.player1Id,
//                     player2Id: game.player2Id === joiningPlayerId ? "0" : game.player2Id,
//                   }
//                 }
//             });
    
//             return {game: result.data.updateMatrix, isStarted: true};
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     } else {
//         try {
//             const gameDetails = {
//                 id: game.id
//             };
              
//             const deletedGame = await client.graphql({
//                 query: deleteMatrix,
//                 variables: { input: gameDetails }
//             });
    
//             return {isStarted: false};
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }

// }

// /*
//     Readys up the players

//     Check if the other player is ready and if he is then started = true
// */
// export const readyUp = async (game, joiningPlayerId) => { 

//     let updatedGame = {
//         player1Ready: joiningPlayerId === game.player1Id ? !game.player1Ready : game.player1Ready,
//         player2Ready: joiningPlayerId === game.player2Id ? !game.player2Ready : game.player2Ready,
//     }

//     const readyUpGame = await client.graphql({
//         query: updateMatrix,
//         variables: {
//           input: {
//             id: game.id,
//             player1Ready: updatedGame.player1Ready,
//             player2Ready: updatedGame.player2Ready,

//             started: (updatedGame.player1Ready && updatedGame.player2Ready) ? true : false
//           }
//         }
//     });
// }

// export const addGameToUser = async (userId, game) => {

//     // console.log("game", userId);

//     const variables = {
//         filter: {id: { eq: userId }}
//     };
//     const res = await client.graphql({
//         query: listUsers,
//         variables: variables
//     });
//     const oldUser = res.data.listUsers.items[0];

//     const newUser = await client.graphql({
//         query: updateUser,
//         variables: {
//           input: {
//             id: userId,
//             liveGames: [...oldUser.liveGames, game.id]
//           }
//         }
//     });

//     return newUser.data.updateUser;
// }

// export const getGameViaId = async (gameId) => {
//     try {
//         const variables = {
//             filter: { id: { eq: gameId } }
//         };
//         const result = await client.graphql({
//             query: listGames,
//             variables: variables
//         });

//         const games = result.data.listGames.items[0];
//         // console.log("FetchGames/GameStartFunctions", games);

//         return games;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }
