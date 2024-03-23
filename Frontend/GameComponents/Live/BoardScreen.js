import { useState } from "react";
import { View } from "react-native";
import { useMyContext } from "../../Context/MyContext";
import { GameMatrix } from "../Matrix/GameMatrix";
import { PopUpPickTile } from "../Matrix/PopUp/PopUpPickTile";
import { PopUpPlayer } from "../Matrix/PopUp/PopUpPlayer";
import { PopUpSwapTile } from "../Matrix/PopUp/PopUpSwapTile";
import { GamePlayers } from "../Shared/GamePlayers";


export const BoardScreen = ({game, allTiles, matrixInfo, setMatrixInfo}) => {

    const { user } = useMyContext();
    const [homePlayerDepth, setHomePlayerDepth] = useState(game.player1Id === user.id ? game.player1Depth : game.player2Depth)

    return(
        <>
            {/* Matrix */}
            <GameMatrix allTiles={allTiles} matrixInfo={matrixInfo} setMatrixInfo={setMatrixInfo}/>

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