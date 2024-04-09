import { generateClient } from "aws-amplify/api";
import { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Button, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { TestGameActions } from "../../../assets/TestData/TestGameActions";
import { getGame } from "../../../src/graphql/queries";
import { useMyContext } from "../../Context/MyContext";
import { getAsyncPlayerMoves, setAsyncPlayerMoves } from "../../functions/AsyncStorage/PlayerMoves";
import { fetchBoxScore, getLatestActionsAndStats } from "../../functions/GameFunctions/GameLiveFunctions";
import { goThroughEachGameAction, goThroughEachGameAction2 } from "../../functions/GameFunctions/GameLiveFunctions2";
import { updateTiles } from "../../functions/GameFunctions/MatrixUpdateFunctions";
import { getTimeoutArray, updateTimeoutArray } from "../../functions/GameFunctions/TimeOut";
import { LoadingScreen } from "../../LoadingScreen";
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
        oppTeamDepth: [],
        teams: [game.teams[0], game.teams[1]],
        allTiles: [],
        lastActionNumber: -1,
        isTimeOut: false
    });
    const client = generateClient(); 

    const [scores, setScores] = useState([0, 0]);
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [testInput, setTestInput] = useState('1');
    const handleTextChange = (inputText) => {
        setTestInput(inputText);
    };

    const setAllValues = async (
        player1SelectedTiles, player2SelectedTiles, 
        player1Depth, player2Depth
    ) => {
        let lastActionNumber = matrixInfo.lastActionNumber;
        let isPlayer1 = matrixInfo.isPlayer1;
        let actionsList = TestGameActions.slice(0, parseInt(testInput));

        /*
            If our lastActionNumber is -1 that means we closed the app and lost all knowledge
            thus we should get the lastest timeout to remember our info

            If it is not -1 then we are still rocking on so we should just update normally
        */
        let timeoutArray = []; 
        // if(lastActionNumber === -1){
        //     const gameRet = await client.graphql({ query: getGame,variables: { id: game.id } });
        //     let gameParsed = gameRet.data.getGame;
        //     timeoutArray = gameParsed.timeoutArray.map(timeOut => JSON.parse(timeOut));
        //     let mostRecentTimeout = timeoutArray[0];

        //     timeoutArray.forEach(timeOut => {
        //         if(timeOut.actionNumber <= actionsList[0].actionNumber && timeOut.actionNumber > mostRecentTimeout.actionNumber){
        //             mostRecentTimeout = timeOut;
        //         }
        //     })

        //     lastActionNumber = mostRecentTimeout.lastAction;
        //     player1SelectedTiles = mostRecentTimeout.player1SelectedTiles;
        //     player2SelectedTiles = mostRecentTimeout.player2SelectedTiles;
        //     player1Depth = mostRecentTimeout.player1Depth;
        //     player2Depth = mostRecentTimeout.player2Depth;
        // }
        
        /* If the latest action number is the same as our last then just return */
        const currentActionsList = actionsList.slice(lastActionNumber, actionsList.length);
        if(currentActionsList.length === 0){
            return {...matrixInfo};
        }

        const res = await goThroughEachGameAction2(
            game, matrixInfo.allTiles, currentActionsList,
            player1SelectedTiles, player2SelectedTiles,
            player1Depth, player2Depth,
            isPlayer1
        )
        
        const resAllTiles = res.allTiles;
        const allPlayers = res.allPlayers;
        
        const lastAction = currentActionsList[currentActionsList.length-1];

        return {
            ...matrixInfo,
            allPlayers: allPlayers,
            allTiles: resAllTiles,
            lastActionNumber: lastAction.actionNumber,
            isTimeOut: lastAction.actionType === "timeout"
        }
    }

    useEffect(() => {
        const fetchOurSelectedTiles = async () => {
            setLoading(true);
    
            try {
                const gameRet = await client.graphql({ query: getGame, variables: { id: game.id } });
                let gameParsed = gameRet.data.getGame;

                const lastActionNumber = matrixInfo.isPlayer1 ? game.player1LastActionNumber : game.player2LastActionNumber;

                const selectedTiles = matrixInfo.isPlayer1 ?
                    gameParsed.player1SelectedTiles.map(tile => JSON.parse(tile)) :
                    gameParsed.player2SelectedTiles.map(tile => JSON.parse(tile));

                const timeoutArray = gameParsed.timeoutArray.map(timeOut => JSON.parse(timeOut));
                let mostRecentTimeout = timeoutArray[0];
                timeoutArray.forEach(timeOut => {
                    if(timeOut.actionNumber <= lastActionNumber && timeOut.actionNumber > mostRecentTimeout.actionNumber){
                        mostRecentTimeout = timeOut;
                    }
                })
                const oppSelectedTiles = matrixInfo.isPlayer1 ?
                    mostRecentTimeout.player2SelectedTiles:
                    mostRecentTimeout.player1SelectedTiles;
                    
                setMatrixInfo(p => ({
                    ...p,
                    selectedTiles: selectedTiles,
                    allTiles: mostRecentTimeout.allTiles,
                    oppSelectedTiles: oppSelectedTiles,
                    lastActionNumber: mostRecentTimeout.actionNumber,
                    teamDepth: matrixInfo.isPlayer1 ? mostRecentTimeout.player1Depth : mostRecentTimeout.player2Depth,
                    oppTeamDepth: !matrixInfo.isPlayer1 ? mostRecentTimeout.player1Depth : mostRecentTimeout.player2Depth
                }));
            } catch (error) {
                console.error("Error fetchOurSelectedTiles:", error);
            }
    
            setLoading(false);
        };
    
        fetchOurSelectedTiles();
    }, []);
    

    useEffect(() => {
        // if(matrixInfo.isTimeOut){
        //     console.log("Gameinscren, is timeout")
            
        //     const newSelectedTiles = matrixInfo.selectedTiles;
        //     console.log("selectedTiles timeout", newSelectedTiles)
            
        //     newSelectedTiles.forEach((selectedTile, index) => {
        //         if(selectedTile.swapTile){
        //             const swapTile = allTiles.find(tile => tile.row === selectedTile.swapTile.row && tile.index === selectedTile.swapTile.index);
        //             swapTile.swapTile = null;
        //             console.log("swapTile", swapTile)
        //             newSelectedTiles[index] = swapTile;
        //         }
        //     })

        //     console.log("selectedTiles updated", newSelectedTiles)
        //     setMatrixInfo(p => ({
        //         ...p, 
        //         selectedTiles: newSelectedTiles,
        //         // teamDepth: playerMovesContext.teamDepth
        //     }));
        // }
    }, [matrixInfo.isTimeOut])

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
        // console.log("matrixInfo.selectedTiles", matrixInfo.selectedTiles)
        // console.log("On Matrix Change", JSON.stringify(matrixInfo, null, 2));
        // console.log("")

    }, [matrixInfo])

    if(loading) return (
        <LoadingScreen />
    )

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111A2B', height:"100%", width:"100%"}}>
            <View style={{width:"100%", height:"100%", backgroundColor:"#111A2B"}}>
                {/* Header */}
                <Header 
                    allTiles={matrixInfo.allTiles} isPlayer1={matrixInfo.is}
                    matrixInfo={matrixInfo}
                    game={game} scores={scores}
                />
                 <TextInput
                    style={{width:100, height:50, borderWidth: 5, borderColor: 'white', color:'white'}}
                    onChangeText={handleTextChange}
                    value={testInput}
                />
                <TouchableOpacity onPress={async () => {
                    let player1SelectedTiles = matrixInfo.isPlayer1 ? matrixInfo.selectedTiles : matrixInfo.oppSelectedTiles;
                    let player2SelectedTiles = !matrixInfo.isPlayer1 ? matrixInfo.selectedTiles : matrixInfo.oppSelectedTiles;
                    let player1Depth = matrixInfo.isPlayer1 ? matrixInfo.teamDepth : matrixInfo.oppTeamDepth;
                    let player2Depth = !matrixInfo.isPlayer1 ? matrixInfo.teamDepth : matrixInfo.oppTeamDepth;

                    const updatedMatrixInfo = await setAllValues(
                        player1SelectedTiles, player2SelectedTiles,
                        player1Depth, player2Depth
                    );

                    // console.log("updatedMatrixInfo", JSON.stringify(updatedMatrixInfo.allTiles, null, 2));
                    
                    setMatrixInfo(p => ({
                        ...p,
                        allTiles: updatedMatrixInfo.allTiles,
                        lastActionNumber: updatedMatrixInfo.lastActionNumber
                    }));
                    // console.log("updatedMatrixInfo", updatedMatrixInfo.selectedTiles)
                    // console.log("Matrix info updated!");
                }}>
                    <Text style={{color:'white'}}>setAllValues</Text>
                </TouchableOpacity>

                {/* Game Nav Bar */}
                <GameNavBar matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} />

                {/* Current Board (From Nav Bar) */}
                {matrixInfo.navBar === "board" ?
                    <BoardScreen 
                        game={game}
                        allTiles={matrixInfo.allTiles} 
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