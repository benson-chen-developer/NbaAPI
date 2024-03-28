import { generateClient } from "aws-amplify/api"
import { getGame } from "../../../src/graphql/queries"
import { UpdateGame } from "../MutationFunctions/GameMutation"

// type playerDepth = {
//     name: string,
//     team: string,
//     userId: string
// }

// type selectedTile = {
// {"complete": false, "goal": 14, "index": 0, "name": "AST", 
// "progress": 0, "row": 1, "swapTile": {"complete": false, "goal": 14, "index": 0, 
// "name": "PTS+REB", 
// "progress": 0, "row": 2, "team": "Pacers"}, "team": "Pacers"}
// }

// type TimeOut = {
//     actionNumber: number,
//     player1Depth: [playerDepth],
//     player2Depth: [playerDepth],
//     player1SelectedTiles: [selectedTile]
//     player2SelectedTiles: [selectedTile]
// }

/**
 * @param {string} gameId 
 * @param {TimeOut} timeOut 
 * @param {boolean} isPlayer1 
 */
export const updateAWSTimeOut = (
    updatedGameRet,
    selectedTiles, playerDepth, actionNumber, isPlayer1
) => {
    let updatedTimeoutArray = updatedGameRet.timeoutArray;
    updatedTimeoutArray = updatedTimeoutArray.map((game) => JSON.parse(game));

    const timeOutIndex = updatedTimeoutArray.findIndex(timeOut2 => {
        timeOut2.actionNumber === actionNumber
    });

    if(timeOutIndex !== -1){
        if(isPlayer1 && updatedTimeoutArray[timeOutIndex].player1Depth.length === 0){
            updatedTimeoutArray[timeOutIndex].player1Depth = playerDepth;
            updatedTimeoutArray[timeOutIndex].player1SelectedTiles = selectedTiles;
            return updatedTimeoutArray[timeOutIndex];
        }
        else if(!isPlayer1 && updatedTimeoutArray[timeOutIndex].player2Depth.length === 0){
            updatedTimeoutArray[timeOutIndex].player2Depth = playerDepth;
            updatedTimeoutArray[timeOutIndex].player2SelectedTiles = selectedTiles;
            return updatedTimeoutArray[timeOutIndex];
        }
    } else {
        if(isPlayer1){
            const ret = {
                player1Depth: playerDepth,
                player2Depth: [],
                player1SelectedTiles: selectedTiles,
                player2SelectedTiles: [],
                actionNumber: actionNumber
            }; 
            updatedTimeoutArray.push(ret);
            return ret;
        } else {
            const ret = {
                player1Depth: [],
                player2Depth: playerDepth,
                player1SelectedTiles: [],
                player2SelectedTiles: selectedTiles,
                actionNumber: actionNumber
            };
            updatedTimeoutArray.push(ret);
            return ret;
        }
    }

    // console.log("GameTimeout", updatedTimeoutArray);

    return updatedTimeoutArray;

        // const updatedGame = await client.graphql({
        //     query: updateGame,
        //     variables: {
        //         input: {...input}
        //     }
        // });

        // return updatedGame.data.updateGame;
}

export const swapTiles = (selectedTiles) => {
    selectedTiles.forEach((selectedTile, index) => {
        if(selectedTile.swapTile){
            selectedTiles[index] = {
                ...selectedTile.swapTile,
                swap: null
            }
        }
    }) 

    return selectedTiles;
}