import { useState } from "react";
import { View } from "react-native"
import { GameMatrix } from "../Matrix/GameMatrix";
import { MatrixPopUp } from "../Matrix/PopUp/MatrixPopUp";

export const GamePreScreen = ({route}) => {

    const { game } = route.params;

    const [matrixInfo, setMatrixInfo] = useState({
        popUpMode: "none",
        pickedTile: null, // {"name": "AST", "team1": 36.9, "team1Progress": 0, "team2": 36.9, "team2Progess": 0}
        selectedTiles: []
    });

    return(
        <View style={{
            height:"100%",width:"100%", backgroundColor:'#111A2B'
        }}>
            <GameMatrix game={game} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}/>

            {matrixInfo.popUpMode !== "none" ? 
                <MatrixPopUp 
                    matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}
                /> 
                    :  
                null
            }
        </View>
    )
}