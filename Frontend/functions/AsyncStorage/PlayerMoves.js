import AsyncStorage from "@react-native-async-storage/async-storage";

/*
    [{
        gameId: string,
        selectedTiles: [matrixSquareObj],
        teamDepth: [playerName]
    }]
 */

export const getAsyncPlayerMoves = async () => {
    const ret = await AsyncStorage.getItem("playerMoves");

    return JSON.parse(ret);
}

export const setAsyncPlayerMove = async (newPlayerMove) => {
    let currentPlayerMoves = JSON.parse(await AsyncStorage.getItem("playerMoves"));
    
    const currentPlayerMoveIndex = currentPlayerMoves.indexOf(playerMove => playerMove.gameId === newPlayerMove.gameId);
    
    if(currentPlayerMoveIndex !== -1){
        currentPlayerMoves[currentPlayerMoveIndex] = newPlayerMove;
    } else {
        currentPlayerMoves.push(newPlayerMove);
    }
    
    await AsyncStorage.setItem("playerMoves", JSON.stringify(currentPlayerMoves));
    
    return currentPlayerMoves;
}

export const setAsyncPlayerMoves = async (newThing) => {
    const ret = await AsyncStorage.setItem("playerMoves", JSON.stringify(newThing));
}