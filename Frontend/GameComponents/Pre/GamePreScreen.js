import { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableHighlight } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMyContext } from "../../Context/MyContext";
import { GameNavBar } from ".././Shared/GameNavBar";
import { GamePlayers } from "../Shared/GamePlayers";
import { GameMatrix } from "../Matrix/GameMatrix";
import { PopUpPickTile } from "../Matrix/PopUp/PopUpPickTile";
import { PopUpPlayer } from "../Matrix/PopUp/PopUpPlayer";
import { PopUpSwapTile } from "../Matrix/PopUp/PopUpSwapTile";
import { Header } from "../Shared/Header";

export const GamePreScreen = ({route}) => {
    const { game } = route.params;

    const [matrixInfo, setMatrixInfo] = useState({
        popUpMode: "none",
        navBar: 'board',
        pickedTile: null, // {"name": "AST", "team1": 36.9, "team1Progress": 0, "team2": 36.9, "team2Progess": 0}
        pickedPlayer: null,
        selectedTiles: []
    });

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111A2B', height:"100%", width:"100%"}}>
            {/* Header */}
            <Header game={game} selectedTiles={matrixInfo.selectedTiles}/>

            {/* Game Nav Bar */}
            <GameNavBar matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} />

            {matrixInfo.navBar === "board" ?
                <BoardScreen game={game} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} /> : null
            }

            {matrixInfo.navBar === "game" ?
                <GameScreen game={game} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} /> : null
            }

        </SafeAreaView>
    )
}

const BoardScreen = ({game, matrixInfo, setMatrixInfo}) => {

    const { user } = useMyContext();

    const [homePlayerDepth, setHomePlayerDepth] = useState(game.player1Id === user.id ? game.player1Depth : game.player2Depth)

    return(
        <>
            {/* Matrix */}
            <GameMatrix game={game} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}/>

            {/* Players */}
            {homePlayerDepth.length > 0 ?
                <GamePlayers 
                    matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}
                    players={homePlayerDepth.map(player => JSON.parse(player))}
                />
                    :
                null
            }

            {/* Pop Up */}
            {matrixInfo.popUpMode !== "none" ? 
                <View style={{
                    top: 0, bottom: 0, left: 0, right: 0,
                    position:'absolute', alignItems:'center', justifyContent:'center', 
                    backgroundColor: 'rgba(0,0,0,.5)'
                }}>

                    <View style={{width:"90%", height:"70%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>
                        {matrixInfo.popUpMode === "default" ? 
                            <PopUpPickTile matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} /> : null
                        }
            
                        {matrixInfo.popUpMode === "swap" ? 
                            <PopUpSwapTile 
                                matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}
                            /> : null
                        }   

                        {matrixInfo.popUpMode === "player" ? 
                            <PopUpPlayer 
                                matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}
                                playerDepth={homePlayerDepth.map(p => JSON.parse(p))}
                            /> : null
                        }    
                    </View>

                    {/* <TouchableOpacity style={{background:'red',height:"100%", width:"100%", position:'absolute'}} onPress={() => setMatrixInfo(p => ({ ...p, popUpMode: "none" }))}/> */}
                
                </View>
                    :  
                null
            }
        </>
    )
}

const GameScreen = ({game, matrixInfo, setMatrixInfo}) => {
    return(
        <>

        </>
    )
}