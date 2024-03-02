import { View } from "react-native"
import { PopUpPickTile } from "./PopUpPickTile";

export const MatrixPopUp = ({matrixInfo, setMatrixInfo}) => {

    const {popUpMode} = matrixInfo;

    return(
        <View style={{
            width:"100%", height:"100%", position:'absolute', 
            alignItems:'center', justifyContent:'center', backgroundColor: 'rgba(0,0,0,.5)'
        }}>
            {popUpMode === "default" ? 
                <PopUpPickTile matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo} /> : null
            }

            {/* {mode === "switch" ? 
                <SwitchSquaresMode 
                    setSelectedTiles={setSelectedTiles} popUpTile={popUpTile}
                    selectedTiles={selectedTiles} setPopUpTile={setPopUpTile}
                    item={item} ourPlayer={ourPlayer} index={index} row={row}
                    setMode={setMode}
                    setSwitchTile={setSwitchTile} switchTile={switchTile}
                /> : null
            }       */}
        </View>
    )
}