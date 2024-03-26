import { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native"
import { useMyContext } from "../../Context/MyContext";
import { getAsyncPlayerMoves, setAsyncPlayerMove } from "../../functions/AsyncStorage/PlayerMoves";
import { getLatestActionsAndStats } from "../../functions/GameFunctions/GameLiveFunctions";
import { updateTiles } from "../../functions/GameFunctions/MatrixUpdateFunctions";
import { GameNavBar } from "../Shared/GameNavBar";
import { GamePlayers } from "../Shared/GamePlayers";
import { Header } from "../Shared/Header";
import { BoardScreen } from "./BoardScreen";
import { GameScreen } from "./GameScreen";

export const GameInScreen = ({route}) => {
    
    const { user } = useMyContext();
    const { game } = route.params;

    // const player1Team = game.player1Id === user.id ? JSON.parse(game.player1Depth) : JSON.parse(game.player2Depth);

    const [matrixInfo, setMatrixInfo] = useState({
        popUpMode: "none",
        navBar: 'board',
        gameId: game.id,
        pickedTile: null, // {"name": "AST", "team1": 36.9, "team1Progress": 0, "team2": 36.9, "team2Progess": 0}
        pickedPlayer: null,
        selectedTiles: [],
        teamDepth: []
    });
    const isPlayer1 = game.player1Id === user.id;
    const [scores, setScores] = useState([0, 0]);
    const [actions, setActions] = useState([]);
    const [allTiles, setAllTiles] = useState([
        ...game.matrixRow1.map(JSON.parse), 
        ...game.matrixRow2.map(JSON.parse), 
        ...game.matrixRow3.map(JSON.parse), 
        ...game.matrixRow4.map(JSON.parse)
    ]);

    useEffect(() => {
        // const intervalId = setInterval(async () => {
        const setInterval = async () => {
            let selectedTiles; let currentPlayerMoves;
            
            await getAsyncPlayerMoves().then(playerMoves => {
                currentPlayerMoves = playerMoves.find(playerMove => playerMove.gameId === game.id);
                selectedTiles = currentPlayerMoves.selectedTiles;
            })

            const updatedGameAndActions = await getLatestActionsAndStats(game, user.id)
            const {teamsGainedStats, actionsListLastFive, newScores} = updatedGameAndActions;

            setActions(actionsListLastFive);
            setScores(newScores);
            
            const updatedAllTiles = updateTiles(allTiles, teamsGainedStats, isPlayer1);
            setAllTiles(updatedAllTiles);

            // console.log("updatedAllTiles", updatedAllTiles)
            updatedAllTiles.forEach(updatedTile => {
                selectedTiles.forEach((selectedTile, index) => {
                    const isSameIndexAndRow = updatedTile.index === selectedTile.index && updatedTile.row === selectedTile.row;

                    if(isSameIndexAndRow && updatedTile.team1Complete && isPlayer1){
                        selectedTiles.splice(index, 1);
                    }
                    else if(isSameIndexAndRow && updatedTile.team2Complete && !isPlayer1){
                        selectedTiles.splice(index, 1);
                    }
                })
            })

            setMatrixInfo(p => ({
                ...p, 
                selectedTiles: selectedTiles,
                teamDepth: currentPlayerMoves.teamDepth
            }));
            // setAsyncPlayerMove()
            /* Game Is Over */
            // if(actionsListLastFive[actionsListLastFive.length-1].description === "Game End"){
            //     console.log("GameHome: Game is Over");

            //     clearInterval(intervalId);
            // }
        // }, 5000);
        }

        setInterval();
        // return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        console.log("Change in SelectedTiles", matrixInfo.selectedTiles)
    }, [matrixInfo.selectedTiles])

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
                        game={game} isPlayer1={isPlayer1}
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