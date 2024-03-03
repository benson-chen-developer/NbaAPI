import { useState } from "react";
import { View, SafeAreaView } from "react-native"
import { GameMatrix } from "../Matrix/GameMatrix";
import { PopUpPickTile } from "../Matrix/PopUp/PopUpPickTile";
import { PopUpSwapTile } from "../Matrix/PopUp/PopUpSwapTile";
import { Header } from "../Shared/Header";

export const GamePreScreen = ({route}) => {
    const { game } = route.params;

    const [matrixInfo, setMatrixInfo] = useState({
        popUpMode: "none",
        pickedTile: null, // {"name": "AST", "team1": 36.9, "team1Progress": 0, "team2": 36.9, "team2Progess": 0}
        selectedTiles: []
    });

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111A2B' }}>
            {/* Header */}
            <Header homeTeamName={game.teams[0]} awayTeamName={game.teams[1]} />

            <View style={{height:25}}/>

            {/* Matrix */}
            <GameMatrix game={game} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}/>

            {/* Pop Up */}
            {matrixInfo.popUpMode !== "none" ? 
                <View style={{
                    width:"100%", height:"100%", position:'absolute', 
                    alignItems:'center', justifyContent:'center', backgroundColor: 'rgba(0,0,0,.5)'
                }}>
                    {matrixInfo.popUpMode === "default" ? 
                        <PopUpPickTile matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} /> : null
                    }
        
                    {matrixInfo.popUpMode === "swap" ? 
                        <PopUpSwapTile 
                            matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}
                        /> : null
                    }      
                </View>
                    :  
                null
            }
        </SafeAreaView>
    )
}