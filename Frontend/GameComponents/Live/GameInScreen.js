import { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native"
import { TestGameActions } from "../../../assets/TestData/TestGameActions";
import { useMyContext } from "../../Context/MyContext";
import { getAsyncPlayerMoves, setAsyncPlayerMoves } from "../../functions/AsyncStorage/PlayerMoves";
import { fetchBoxScore, getLatestActionsAndStats } from "../../functions/GameFunctions/GameLiveFunctions";
import { goThroughEachGameAction } from "../../functions/GameFunctions/GameLiveFunctions2";
import { updateTiles } from "../../functions/GameFunctions/MatrixUpdateFunctions";
import { GameNavBar } from "../Shared/GameNavBar";
import { GamePlayers } from "../Shared/GamePlayers";
import { Header } from "../Shared/Header";
import { BoardScreen } from "./BoardScreen";
import { GameScreen } from "./GameScreen";

export const GameInScreen = ({route}) => {
    
    const { user, playerMovesContext, setPlayerMovesContext } = useMyContext();
    const { game } = route.params;

    // const player1Team = game.player1Id === user.id ? JSON.parse(game.player1Depth) : JSON.parse(game.player2Depth);

    const [matrixInfo, setMatrixInfo] = useState({
        popUpMode: "none",
        navBar: 'board',
        isPlayer1: game.player1Id === user.id,
        gameId: game.id,
        pickedTile: null, // {"name": "AST", "team1": 36.9, "team1Progress": 0, "team2": 36.9, "team2Progess": 0}
        pickedPlayer: null,
        selectedTiles: [],
        oppSelectedTiles: [],
        teamDepth: [],
        teams: [game.teams[0], game.teams[1]],
        allPlayers: []
    });
    const playerMoves = playerMovesContext.find(playerMove => playerMove.gameId === game.id); 
    const isPlayer1 = game.player1Id === user.id;
    const ourTeamName = isPlayer1 ? game.player1Team : game.player2Team;
    const oppTeamName = isPlayer1 ? game.player2Team : game.player1Team;

    const [scores, setScores] = useState([0, 0]);
    const [actions, setActions] = useState([]);
    const [allTiles, setAllTiles] = useState([
        ...game.matrixRow1.map(JSON.parse), 
        ...game.matrixRow2.map(JSON.parse), 
        ...game.matrixRow3.map(JSON.parse), 
        ...game.matrixRow4.map(JSON.parse)
    ]);

    const newFunc = async () => {
        const actionsListRes = await fetchBoxScore(game.apiLink, isPlayer1 ? game.player1LastActionNumber : player2LastActionNumber);

        const res = await goThroughEachGameAction(
            game, allTiles,
            // actionsListRes, 
            TestGameActions,
            playerMoves.teamDepth
        )

        const resAllTiles = res.allTiles;
        const resPlayer1SelectedTiles = res.player1SelectedTiles;
        const resPlayer2SelectedTiles = res.player2SelectedTiles;
        const allPlayers = res.allPlayers;

        setAllTiles(resAllTiles);
        setMatrixInfo(p => ({
            ...p, 
            selectedTiles: isPlayer1 ? resPlayer1SelectedTiles : resPlayer2SelectedTiles,
            oppSelectedTiles: !isPlayer1 ? resPlayer1SelectedTiles : resPlayer2SelectedTiles,
            allPlayers: allPlayers
        }));
        // console.log("newAllTiles", JSON.stringify(allTiles, null, 2));
        // console.log("player1SelectedTiles", JSON.stringify(player1SelectedTiles, null, 2));
        // console.log("player2SelectedTiles", JSON.stringify(player2SelectedTiles, null, 2));
        
    }

    // useEffect(() => {
    //     // const intervalId = setInterval(async () => {
    //     const setInterval = async () => {
    //         let selectedTiles = playerMoves.selectedTiles;

    //         const updatedGameAndActions = await getLatestActionsAndStats(game, user.id)
    //         const {teamsGainedStats, actionsListLastFive, newScores} = updatedGameAndActions;

    //         setActions(actionsListLastFive);
    //         setScores(newScores);
            
    //         const updatedAllTiles = updateTiles(allTiles, teamsGainedStats, isPlayer1);
    //         setAllTiles(updatedAllTiles);

    //         updatedAllTiles.forEach(updatedTile => {
    //             selectedTiles.forEach((selectedTile, index) => {
    //                 const isSameIndexAndRow = updatedTile.index === selectedTile.index && updatedTile.row === selectedTile.row;

    //                 if(isSameIndexAndRow && updatedTile.team1Complete && isPlayer1){
    //                     selectedTiles.splice(index, 1);
    //                 }
    //                 else if(isSameIndexAndRow && updatedTile.team2Complete && !isPlayer1){
    //                     selectedTiles.splice(index, 1);
    //                 }
    //             })
    //         })

    //         setMatrixInfo(p => ({
    //             ...p, 
    //             selectedTiles: selectedTiles,
    //             teamDepth: playerMovesContext.teamDepth
    //         }));

    //         // setAsyncPlayerMove()
    //         /* Game Is Over */
    //         // if(actionsListLastFive[actionsListLastFive.length-1].description === "Game End"){
    //         //     console.log("GameHome: Game is Over");

    //         //     clearInterval(intervalId);
    //         // }
    //     // }, 5000);
    //     }

    //     new
    //     setInterval();
    //     // return () => clearInterval(intervalId);
    // }, []);

    useEffect(() => {
        newFunc();
    }, [])

    // useEffect(() => {
    //     // console.log("Change in SelectedTiles", matrixInfo.selectedTiles)

    //     let updatedAllTiles = allTiles;
    //     matrixInfo.selectedTiles.forEach(selectedTile => {
    //         const index = updatedAllTiles.findIndex((t) => t.index === selectedTile.index && t.row === selectedTile.row);
    //         updatedAllTiles[index] = {
    //             ...updatedAllTiles[index],
    //             team1Progress: isPlayer1 ? selectedTile.progress : updatedAllTiles[index].team1Progress,
    //             team2Progress: !isPlayer1 ? selectedTile.progress : updatedAllTiles[index].team2Progress,
    //             team1Complete: isPlayer1 ? selectedTile.complete : updatedAllTiles[index].complete,
    //             team2Complete: !isPlayer1 ? selectedTile.complete : updatedAllTiles[index].complete,
    //         }
    //     })
    //     setAllTiles(updatedAllTiles);

    //     // const updatedPlayerMoves = playerMovesContext.map(playerMove => {
    //     //     if (playerMove.gameId !== playerMoves.gameId) {
    //     //         return playerMove; 
    //     //     } else {
    //     //         return {...playerMove, selectedTiles: matrixInfo.selectedTiles};
    //     //     }
    //     // });

    //     // setPlayerMovesContext(updatedPlayerMoves);
    //     // setAsyncPlayerMoves(updatedPlayerMoves);
        
    // }, [matrixInfo.selectedTiles])

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111A2B', height:"100%", width:"100%"}}>
            <View style={{width:"100%", height:"100%", backgroundColor:"#111A2B"}}>
                
                {/* Header */}
                <Header 
                    allTiles={allTiles} isPlayer1={isPlayer1}
                    matrixInfo={matrixInfo}
                    game={game} scores={scores}
                />

                {/* Game Nav Bar */}
                <GameNavBar matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} />

                {/* Current Board (From Nav Bar) */}
                {matrixInfo.navBar === "board" ?
                    <BoardScreen 
                        game={game}
                        allTiles={allTiles} 
                        matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} 
                    /> : null
                }

                {matrixInfo.navBar === "game" ?
                    <GameScreen 
                        game={game} 
                        matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} 
                        actions={actions}
                    /> 
                        : 
                    null
                }

            </View>
        </SafeAreaView>
    )
}