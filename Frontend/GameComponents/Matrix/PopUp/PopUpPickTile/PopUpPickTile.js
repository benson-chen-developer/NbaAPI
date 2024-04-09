import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import { getFullNameOfStat } from "../../../../../assets/NameConversions";
import { abbreviateName } from "../../../../../assets/TeamLogos/getTeamLogo";
import { UpdateGame } from "../../../../functions/MutationFunctions/GameMutation";
import { ProgressWheel } from "../ProgressWheel";
import { SwapTiles } from "./SwapTiles";

/**
 * 
 * @param {*} matrixInfo 
 * {"pickedTile": {
 *      "name": "PTS", "team1": 23, "team1Progress": 0, "team2": 23, "team2Progess": 0
 * },
 *  "popUpMode": "default", 
 * "selectedTiles": []}
 */
export const PopUpPickTile = ({matrixInfo, setMatrixInfo}) => {
    
    const {pickedTile, teams, isPlayer1, allPlayers, selectedTiles} = matrixInfo;
    console.log
    
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);
    const [swapTile, setSwapTile] = useState(selectedTiles.find(selectedTile => 
        selectedTile.swapTile?.index === pickedTile.index && selectedTile.swapTile?.row === pickedTile.row    
    ));

    const teamView = isPlayer1 ? teams[0] : teams[1];

    const onPress = () => {
        if(matrixInfo.selectedTiles.length < 3){
            setLoading(true);
            const updateGameInput = isPlayer1 ? 
                {player1SelectedTiles : [...p.selectedTiles, {index: pickedTile.index, row: pickedTile.row, swapTile: null}]} 
                    : 
                {player2SelectedTiles : [...p.selectedTiles, {index: pickedTile.index, row: pickedTile.row, swapTile: null}]};

            UpdateGame(updateGameInput).then(res => {
                setMatrixInfo(p => ({
                    ...p, 
                    selectedTiles: [...p.selectedTiles, {index: pickedTile.index, row: pickedTile.row, swapTile: null}], 
                    popUpMode: 'none'
                }));

                setLoading(false);
            }).catch((err) => {
                console.log("Err PopUpPickTile", err);

                setLoading(false);
            })
        }
        else
            setMatrixInfo(p => ({
                ...p, 
                pickedTile: {...pickedTile},
                popUpMode: "swap"
            }))
    }

    useEffect(() => {
        allPlayers.forEach((player) => {
            const playersArr = [];
            const tileIndex = player.tiles.findIndex((tile) => tile.row === pickedTile.row && tile.index === pickedTile.index);

            if(tileIndex !== -1){
                playersArr.push({
                    name: player.name,
                    number: player.tiles[tileIndex].progress,
                    color: player.color
                })
            }
            setPlayers(playersArr);
        })
    }, [])

    if(players)
    return(
        <>
            <View style={{width:"100%", height:"100%", position:'absolute'}}>
                <View style={{width:"100%", height:"100%", position:'absolute', opacity:.5}}> 
                    <Image 
                        style={{width:100, height: 100, margin:20}}
                        source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamView)}.png`}}
                    />
                </View>
            </View>

            {/* X Btn */}
            <TouchableOpacity   
                style={{height: 25, width:"80%", marginTop:30, marginBottom:10, alignItems:'flex-end', justifyContent:'center'}}
                onPress={() => setMatrixInfo(p => ({ ...p, popUpMode: "none" }))}
            >
                <Text style={{color:'white'}}>X</Text>
            </TouchableOpacity>

            {/* Stat Name */}
            <Text style={styles.statName}>
                {getFullNameOfStat(pickedTile.name)}
            </Text>

            <ProgressWheel 
                players={players}
            />

            <View style={{width:"100%", margin:20, flexDirection:'row', justifyContent:'space-evenly'}}>
                {players.slice(0,3).map((player, index) => {
                    return <PlayerBox 
                        key={index}
                        name={player.name} 
                        number={player.number}
                        color={player.color}
                    />
                })}
            </View>

            {!swapTile ? 
                <>
                {selectedTiles.find(tile => tile.index === pickedTile.index && tile.row === pickedTile.row) ?
                    <View style={styles.main2} onPress={() => onPress()}>
                        <View style={styles.inner2}> 
                            <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold'}}>
                                Picked
                            </Text>
                        </View>
                    </View>
                        :
                    <TouchableOpacity style={styles.main} onPress={() => onPress()}>
                        <View style={styles.inner}> 
                            <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold'}}>
                                Pick
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                </> 
                    :
                <View style={{height:30}} />
            }

            {swapTile ?
                <SwapTiles oldTile={swapTile} newTile={pickedTile} setMatrixInfo={setMatrixInfo}/> : null
            }

        </>
    )
}

const PlayerBox = ({name, number, color}) => {
    const width = 90; 

    return(
        <View style={{width:width, height:120}}>

            <View style={{width:width, height:90}}>

                <View style={{width:width, height:90, backgroundColor:color, position:'absolute',  borderRadius:15}}/>
                
                <View style={{width:width, height:85, justifyContent:'center', alignItems:'center', backgroundColor:'white', borderRadius:15}}>
                    <Image 
                        style={{height:60, width:width}}
                        source={{uri:"https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png"}}
                    />
                    <View style={{top:8 , left:7, width:18, height:18, borderRadius:20, backgroundColor:color, position:'absolute'}}/>
                </View>

            </View>

            <View style={{width:width, height: 30, alignItems:'flex-end', justifyContent:'center'}}>
                <Text style={{color:'white', fontSize:15}}>{name} ({number})</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width:100, height:50, alignItems:'center',
        backgroundColor: '#fa05c0', borderRadius: 10
    },
    inner:{
        width:"100%", height:"95%", justifyContent:'center', alignItems:'center',
        backgroundColor: '#db05fa', borderRadius: 10
    },
    main2: {
        width:100, height:50, alignItems:'center', opacity:.5,
        backgroundColor: '#fa05c0', borderRadius: 10
    },
    inner2:{
        width:"100%", height:"95%", justifyContent:'center', alignItems:'center',
        backgroundColor: '#db05fa', borderRadius: 10,  opacity:.5
    },
    statName: {
        color: "white", fontFamily: "Roboto-Bold", fontSize: 30
    }
})