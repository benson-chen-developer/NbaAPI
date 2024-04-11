import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native"
import { SwapTileFunc } from "../../../../functions/GameFunctions/PopUpFunctions/SwapFunc";
import { Card } from "./Card";

export const PopUpSwapTile = ({matrixInfo, setMatrixInfo}) => {
    const {pickedTile, selectedTiles} = matrixInfo;

    const [loading, setLoading] = useState(false);

    /*
    //     We display the selected tiles and the swap tiles 
    //     (not the selected tiles that are going to be swaped)
    // */
    // useEffect(() => {
    //     const arr = [];

    //     selectedTiles.forEach((selectedTile) => {
    //         if(selectedTile.swapTile){
    //             let allTileIndex = ((selectedTile.swapTile.row-1)*4) + selectedTile.swapTile.index;
    //             arr.push(allTiles[allTileIndex]);
    //         } else {
    //             let allTileIndex = ((selectedTile.row-1)*4) + selectedTile.index;
    //             arr.push(allTiles[allTileIndex]);
    //         }
    //     })

    //     setDisplayedTiles(arr);
    // }, [])

    const onPressPickFunc = async (oldTile) => {
        setLoading(true);
        try{
            const updatedSelectedTiles = await SwapTileFunc(pickedTile, oldTile, matrixInfo);

            setMatrixInfo(p => {
                return {
                    ...p,
                    popUpMode: "none",
                    selectedTiles: updatedSelectedTiles
                };
            });
            setLoading(false);
        } catch(err) {
            console.log("Pop Up Swap tile something wrong", err);
            setLoading(false);
        }
    }
    
    if(loading) return(
        <View style={{width:"90%", height:"70%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>
            <Text style={{color: 'white'}}>Loading</Text>
        </View>
    )

    return(
        <View style={{width:"90%", height:"70%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>
            
            {/* X Btn */}
            <TouchableOpacity   
                style={{height: 25, width:"80%", marginTop:30, marginBottom:10, alignItems:'flex-end', justifyContent:'center'}}
                onPress={() => setMatrixInfo(p => ({ ...p, popUpMode: "none" }))}
            >
                <Text style={{color:'white'}}>X</Text>
            </TouchableOpacity>

            <View style={{height:"90%", justifyContent:'space-between', width:"100%", alignItems:'center'}}>
                {/* Current Selected Tiles */}
                <View style={{width:"100%", alignItems:'center'}}>
                    {selectedTiles.map((selectedTile, index) => (
                        <Card 
                            key={index} 
                            selectedTile={selectedTile} 
                            allTiles={matrixInfo.allTiles}
                            isPlayer1={matrixInfo.isPlayer1}
                            pressFunc={onPressPickFunc}
                        />
                    ))}
                </View>

                {/* Tile to Swap */}
                {/* <Card tile={pickedTile} isPicked={true} pressFunc={() => {}}/> */}
            </View>

        </View>
    )
}