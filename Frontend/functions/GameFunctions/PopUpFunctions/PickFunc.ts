import { generateClient } from "aws-amplify/api";
import { updateGame } from "../../../../src/graphql/mutations";
import { getGame } from "../../../../src/graphql/queries";
import { UpdateGame } from "../../MutationFunctions/GameMutation";
import { MatrixInfo, SwapTile } from "../GameTypes"
import { TimeOut } from "../TimeOut";

export type SelectedTile = {
    name: string,
    goal: number,
    progress: number,
    swapTile: SwapTile,
    index: number,
    row: number,
    team: string,
    complete: boolean
}

/*
    Should update AWS player1SelectedTiles and player1Depth
*/
export const PickTileFunc = async (
    newTile: SelectedTile, oldTile: {index: number, row: number}, matrixInfo: MatrixInfo
)  : Promise<[SelectedTile]> => {
    const {isPlayer1, teamDepth, oppTeamDepth, selectedTiles, oppSelectedTiles, allTiles, gameId} = matrixInfo;

    let indexOfOldTile = selectedTiles.findIndex(selectedTile => selectedTile.index === oldTile.index && selectedTile.row === oldTile.row);
    
    const client = generateClient();
    const gameRet: any = await client.graphql({ query: getGame, variables: { id: matrixInfo.gameId } });
    let timeoutArray: [TimeOut] = gameRet.data.getGame.timeoutArray.map(timeOut => JSON.parse(timeOut));
    let indexOfOurTimeout = timeoutArray.findIndex(timeOut => timeOut.actionNumber === matrixInfo.lastActionNumber);

    if(matrixInfo.isTimeOut){
        selectedTiles[indexOfOldTile] = newTile;
        selectedTiles[indexOfOldTile].swapTile = null;
    } else {
        selectedTiles[indexOfOldTile].swapTile = {index: newTile.index, row: newTile.row};
    }

    if(indexOfOurTimeout === -1){
        timeoutArray.push({
            actionNumber: matrixInfo.lastActionNumber,
            player1Depth: isPlayer1 ? teamDepth : oppTeamDepth,
            player2Depth: !isPlayer1 ? teamDepth : oppTeamDepth,
            player1SelectedTiles: isPlayer1 ? selectedTiles : oppSelectedTiles,
            player2SelectedTiles: !isPlayer1 ? selectedTiles : oppSelectedTiles,
            allTiles: allTiles
        })
    } else {
        if(isPlayer1)
            timeoutArray[indexOfOurTimeout].player1SelectedTiles = selectedTiles;
        else 
            timeoutArray[indexOfOurTimeout].player2SelectedTiles = selectedTiles;
    }

    await client.graphql({
        query: updateGame,
        variables: {
            input: {
                id: gameId,
                timeoutArray: matrixInfo.isTimeOut ? timeoutArray.map(obj => JSON.stringify(obj)) : gameRet.data.getGame.timeoutArray,
                player1SelectedTiles: isPlayer1 ? selectedTiles.map(obj => JSON.stringify(obj)) : gameRet.data.getGame.player1SelectedTiles,
                player2SelectedTiles: !isPlayer1 ? selectedTiles.map(obj => JSON.stringify(obj)) : gameRet.data.getGame.player2SelectedTiles
            }
        }
    });

    return selectedTiles;
}