import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { getFullNameOfStat } from "../../../../assets/NameConversions";
import { useMyContext } from "../../../Context/MyContext";
import { setAsyncPlayerMoves } from "../../../functions/AsyncStorage/PlayerMoves";

export const PopUpSwapTile = ({matrixInfo, setMatrixInfo}) => {
    const { playerMovesAsync, setPlayerMovesAsync } = useMyContext();
    const {pickedTile, selectedTiles} = matrixInfo;
    console.log("selectedTiles PopUpsawp", selectedTiles)

    const swapThis = async ( oldTile ) => {
        const newSelectedTiles = matrixInfo.selectedTiles.map(tile => {
            if (tile.index === oldTile.index && tile.row === oldTile.row) {
                return pickedTile;
            }
            return tile;
        })
        const newPlayerMovesAsync = playerMovesAsync;
        newPlayerMovesAsync.forEach(game => {
            if(game.gameId === matrixInfo.gameId) game.selectedTiles = [...newSelectedTiles];
        })

        // console.log("newSelectedTiles", newSelectedTiles)
        // console.log("newSelectedTiles 2", newPlayerMovesAsync)
        setPlayerMovesAsync(newPlayerMovesAsync);
        await setAsyncPlayerMoves(newPlayerMovesAsync);
        setMatrixInfo(p => {
            return {
                ...p,
                popUpMode: "none",
                selectedTiles: [...newSelectedTiles]
            };
        });
    };
    

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
                    {selectedTiles.map((tile, index) => (
                        <Card tile={tile} key={index} isPicked={false} pressFunc={swapThis}/>
                    ))}
                </View>

                {/* Tile to Swap */}
                <Card tile={pickedTile} isPicked={true} pressFunc={() => {}}/>
            </View>

        </View>
    )
}

const Card = ({tile, isPicked, pressFunc}) => {
    return(
        <TouchableOpacity style={isPicked ? styles.swap : styles.selected} onPress={() => pressFunc(tile)}>
            <View style={{height:"95%", backgroundColor:'rgba(0, 0, 0, .25)'}}>
                {/* Stat Name and Goal Value */}
                <View style={{marginLeft:10, height:"50%", flexDirection:'row', alignItems:'flex-end'}}>
                    <View>
                        <Text style={{ color: "black", fontFamily:"Roboto-Bold", fontSize:30, position:'absolute', top:2, left:2}}>{getFullNameOfStat(tile.name)}</Text>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:30}}>{getFullNameOfStat(tile.name)}</Text>
                    </View>

                    <View style={{marginLeft: 15}}>
                        <Text style={{ color: "black", fontFamily:"Roboto-Bold", fontSize:40, position:'absolute', top:4, left:4}}>36</Text>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:40}}>36</Text>
                    </View>
                </View> 

                {/* Current Numbers */}
                <View style={{marginLeft:10, height:"30%", flexDirection:'row', alignItems:'flex-end'}}>
                    <View>
                        <Text style={{ color: "black", fontFamily:"Roboto-Bold", fontSize:15, position:'absolute', top:2, left:2}}>Current</Text>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:15}}>Current</Text>
                    </View>

                    <View style={{marginLeft: 15}}>
                        <Text style={{ color: "black", fontFamily:"Roboto-Bold", fontSize:20, position:'absolute', top:2, left:2}}>18</Text>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:20}}>18</Text>
                    </View>
                </View> 
            </View> 

            <View style={{height:"5%", backgroundColor:'black', width:"100%", borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
                <View style={{height:"100%", backgroundColor: '#2bd6b2', width:"50%"}}/>
            </View> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    selected : {
        width: "90%", height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#2bd6b2', borderWidth: 2,
        borderRadius: 5, marginBottom: 20,
        shadowColor: '#2bd6b2', // Specify the color of the shadow
        shadowOpacity: 0.5, // Specify the opacity of the shadow (iOS only)
        elevation: 4,
    },
    swap : {
        width: "90%", height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: 'grey', borderWidth: 2,
        borderRadius: 5, marginBottom: 20
    },
})