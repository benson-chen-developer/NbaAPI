import AsyncStorage from "@react-native-async-storage/async-storage";

/*
    [
        {
            gameId: THIS IS THE ID OF THE CORRESPONDING GAME IN AWS
            selected: [{row: "matrixRow1", index: 1}]
        }
    ]
*/

export const getAsyncPreGameBoards = async (gameId) => {
    const preGameBoards = JSON.parse(await AsyncStorage.getItem('preGameBoards'));

    const gameBoard = preGameBoards.find((board) => board.gameId = gameId);

    console.log("getAsyncPreGameBoards", gameBoard);

    return gameBoard;
}

//newSelected is an array of the new selected board
export const setAsyncPreGameBoards = async (gameId, newSelected) => {
    const preGameBoards = JSON.parse(await AsyncStorage.getItem('preGameBoards'));

    let gameBoardIndex = preGameBoards.findIndex((board) => board.gameId === gameId);

    if(gameBoardIndex === -1){
        preGameBoards.push({gameId: gameId, selected: []})
    } else {
        preGameBoards[gameBoardIndex].selected = [...newSelected];
    }

    console.log("getAsyncPreGameBoards", preGameBoards);

    await AsyncStorage.setItem('preGameBoards', JSON.stringify(preGameBoards));

    return preGameBoards;
}

export const clearAsyncPreGameBoards = async () => {
    await AsyncStorage.setItem('preGameBoards', JSON.stringify([
        {gameId: "a33df4ee-019d-4bca-8da4-b1f713ea1b5a", selected: []}
    ]));
}