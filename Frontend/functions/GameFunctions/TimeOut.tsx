import { generateClient } from "aws-amplify/api"
import { getBotGame, getGame } from "../../../src/graphql/queries"
import { Player, SelectedTile, Tile } from "./GameTypes"

export type TimeOut = {
    actionNumber: number,
    player1Depth: [Player],
    player2Depth: [Player],
    player1SelectedTiles: [SelectedTile],
    player2SelectedTiles: [SelectedTile],
    allTiles: [Tile]
}


const client = generateClient();

export const getTimeoutArray = async (gameId: string) : Promise<[TimeOut]> => {
    try {
        // const gameRet = await client.graphql({ query: getBotGame, variables: { id: gameId } }) as any;
        // const timeoutArray = gameRet.data.getBotGame.timeoutArray;
        const gameRet = await client.graphql({ query: getGame, variables: { id: gameId } }) as any;
        const timeoutArray = gameRet.data.getGame.timeoutArray;

        console.log("TimeoutArray", timeoutArray);

        return timeoutArray;
    } catch (error) {
        console.error('Error fetching timeout array:', error);
        throw error;
    }
}

export const updateTimeoutArray = async (
    gameId: string, 
    teamDepth: [Player], selectedTiles: [Tile], actionNumber: number,
    isPlayer1: boolean
) => {
    try {
        const timeoutArray = await getTimeoutArray(gameId);

        const foundTimeOut = timeoutArray.findIndex(timeOut => {
            timeOut.actionNumber === timeOut.actionNumber;
        });

        if(foundTimeOut !== -1){
            timeoutArray.forEach((timeOutLoop, index) => {
                if(timeOutLoop.actionNumber === actionNumber){
                    timeoutArray[index] = {
                        actionNumber: timeoutArray[index].actionNumber,
                        player1Depth: isPlayer1 ? teamDepth : timeoutArray[index].player1Depth,
                        player2Depth: !isPlayer1 ? teamDepth : timeoutArray[index].player2Depth,
                        player1SelectedTiles: isPlayer1 ? selectedTiles : timeoutArray[index].player1SelectedTiles,
                        player2SelectedTiles: !isPlayer1 ? selectedTiles : timeoutArray[index].player2SelectedTiles
                    }
                }
            })
        } else {
            timeoutArray.push({
                actionNumber: actionNumber,
                player1Depth: isPlayer1 ? teamDepth : null,
                player2Depth: !isPlayer1 ? teamDepth : null,
                player1SelectedTiles: isPlayer1 ? selectedTiles : null,
                player2SelectedTiles: !isPlayer1 ? selectedTiles : null
            });
        }

        console.log("timeoutArray3", timeoutArray)

        return timeoutArray;
    } catch (error) {
        console.error('Error updating timeout array:', error);
        throw error;
    }
}