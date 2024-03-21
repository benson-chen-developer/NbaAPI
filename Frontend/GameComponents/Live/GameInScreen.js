import { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native"
import { useMyContext } from "../../Context/MyContext";
import { getLatestActionsAndUpdateGame } from "../../functions/GameFunctions/GameLiveFunctions";
import { GameNavBar } from "../Shared/GameNavBar";
import { GamePlayers } from "../Shared/GamePlayers";
import { Header } from "../Shared/Header";
import { BoardScreen } from "./BoardScreen";
import { GameScreen } from "./GameScreen";

export const GameInScreen = ({route}) => {
    
    const { user, playerMovesAsync } = useMyContext();
    const { game } = route.params;

    // const player1Team = game.player1Id === user.id ? JSON.parse(game.player1Depth) : JSON.parse(game.player2Depth);

    const [matrixInfo, setMatrixInfo] = useState({
        popUpMode: "none",
        navBar: 'board',
        gameId: game.id,
        pickedTile: null, // {"name": "AST", "team1": 36.9, "team1Progress": 0, "team2": 36.9, "team2Progess": 0}
        pickedPlayer: null,
        selectedTiles: [...playerMovesAsync.find(playerGame => playerGame.gameId === game.id).selectedTiles]
    });
    const [scores, setScores] = useState([0, 0]);
    const [actions, setActions] = useState([
        {
            "actionNumber": 8,
            "clock": "PT11M40.00S",
            "timeActual": "2024-03-02T03:41:06.8Z",
            "period": 1,
            "periodType": "REGULAR",
            "teamId": 1610612746,
            "teamTricode": "LAC",
            "actionType": "2pt",
            "subType": "Layup",
            "descriptor": "driving",
            "qualifiers": [
                "pointsinthepaint"
            ],
            "personId": 202331,
            "x": 91.77069645203679,
            "y": 51.470588235294116,
            "area": "Restricted Area",
            "areaDetail": "0-8 Center",
            "side": "right",
            "shotDistance": 2.6,
            "possession": 1610612746,
            "scoreHome": "2",
            "scoreAway": "0",
            "edited": "2024-03-02T03:41:11Z",
            "orderNumber": 80000,
            "isTargetScoreLastPeriod": false,
            "xLegacy": 7,
            "yLegacy": 25,
            "isFieldGoal": 1,
            "shotResult": "Made",
            "pointsTotal": 2,
            "description": "P. George driving Layup (2 PTS) (J. Harden 1 AST)",
            "playerName": "George",
            "playerNameI": "P. George",
            "personIdsFilter": [
                202331,
                201935
            ],
            "assistPlayerNameInitial": "J. Harden",
            "assistPersonId": 201935,
            "assistTotal": 1
        },
    ]);
    const [selectedTiles, setSelectedTiles] = useState([
        ...playerMovesAsync.find(playerGame => playerGame.gameId === game.id).selectedTiles
    ])

    useEffect(() => {
        // const intervalId = setInterval(async () => {
        const setInterval = async () => {
            const updatedGameAndActions = await getLatestActionsAndUpdateGame(game, user.id)
            
            const teamsGainedStats = updatedGameAndActions.teamsGainedStats;
            const actionsListLastFive = updatedGameAndActions.actionsListLastFive;
            const newScores = updatedGameAndActions.scores;

            // setHomePlayerDepth(updatedHomePlayerDepth);
            console.log("teamsGainestats", teamsGainedStats)

            setActions(actionsListLastFive);
            setScores(newScores);

            /* Game Is Over */
            if(actionsListLastFive[actionsListLastFive.length-1].description === "Game End"){
                console.log("GameHome: Game is Over");

                clearInterval(intervalId);
            }
        // }, 5000);
        }
        setInterval();
        // return () => clearInterval(intervalId);
    }, []);

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111A2B', height:"100%", width:"100%"}}>
            <View style={{width:"100%", height:"100%", backgroundColor:"#111A2B"}}>
                
                {/* Header */}
                <Header game={game} scores={scores}/>

                {/* Game Nav Bar */}
                <GameNavBar matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} />

                {/* Current Board (From Nav Bar) */}
                {matrixInfo.navBar === "board" ?
                    <BoardScreen game={game} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} /> : null
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