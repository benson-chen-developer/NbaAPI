import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import { getFullNameOfStat } from "../../../../../assets/NameConversions";
import { abbreviateName } from "../../../../../assets/TeamLogos/getTeamLogo";
import { SwapTileFunc } from "../../../../functions/GameFunctions/PopUpFunctions/SwapFunc";
import { UpdateGame } from "../../../../functions/MutationFunctions/GameMutation";
import { ProgressWheel } from "../ProgressWheel";
import { SwapTiles } from "./SwapTiles";
import { TeamSwitchBtn } from "./TeamSwitchBtn";

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
    
    const {pickedTile, isPlayer1, oppTeamDepth, teamDepth, selectedTiles, oppSelectedTiles, allTiles} = matrixInfo;
    
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);
    const [teamsForSwitch, setTeamsForSwitch] = useState([{name: matrixInfo.teams[0], picked: true}]);
    const [swapTile, setSwapTile] = useState(selectedTiles.find(selectedTile => 
        selectedTile.swapTile?.index === pickedTile.index && selectedTile.swapTile?.row === pickedTile.row    
    ));

    const selected = selectedTiles.find(tile => tile.index === pickedTile.index && tile.row === pickedTile.row);
    const oppSelected = oppSelectedTiles.find(tile => tile.index === pickedTile.index && tile.row === pickedTile.row);

    const onPick = async () => {
        let completeTile = null;
        matrixInfo.selectedTiles.forEach((selectedTile) => {
            let tileIndex = ((selectedTile.row-1)*4)+selectedTile.index;

            if(allTiles[tileIndex].team1Complete || allTiles[tileIndex].team2Complete){
                completeTile = selectedTile;
            }
        })

        if(matrixInfo.selectedTiles.length < 3 || completeTile ){
            setLoading(true);
            try{
                const updatedSelectedTiles = await SwapTileFunc(pickedTile, completeTile, matrixInfo);

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
        } else {
            setMatrixInfo(p => ({
                ...p, 
                pickedTile: {...pickedTile},
                popUpMode: "swap"
            }))
        }
    }

    useEffect(() => {
        const allPlayers = [...oppTeamDepth, ...teamDepth];

        const playersArr = [];
        allPlayers.forEach((player) => {
            const tileIndex = player.tiles.findIndex((tile) => tile.row === pickedTile.row && tile.index === pickedTile.index);

            if(tileIndex !== -1){
                playersArr.push({
                    name: player.name,
                    number: player.tiles[tileIndex].progress,
                    // color: player.color
                })
            }
            setPlayers(playersArr);
        })

        /* Sets the current team based on
            - If you picked (then is you always else its other team if they picked)
        */
        let ourTeam = isPlayer1 ? matrixInfo.teams[0] : matrixInfo.teams[1];
        let oppTeam = !isPlayer1 ? matrixInfo.teams[0] : matrixInfo.teams[1];

        if(selected && oppSelected){
            setTeamsForSwitch([
                {name: ourTeam, picked: true}, {name: oppTeam, picked: false},
            ]);
        }
        else if(oppSelected){
            setTeamsForSwitch([ {name: oppTeam, picked: true} ]);
        }
        else if(selected){
            setTeamsForSwitch([ {name: ourTeam, picked: true} ]);
        }
    }, [])

    if(loading) return(
        <View style={{width:"90%", height:"70%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>
            <Text style={{color: 'white'}}>Loading</Text>
        </View>
    )

    if(players)
    return(
        <>
            <View style={{width:"100%", height:"100%", position:'absolute'}}>
                <View style={{width:"100%", height:"100%", position:'absolute', opacity:.5}}> 
                    <Image 
                        style={{width:100, height: 100, margin:20}}
                        source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamsForSwitch.find(t => t.picked).name)}.png`}}
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

            <TeamSwitchBtn 
                teams={teamsForSwitch} setTeams={setTeamsForSwitch}
            />

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
                    <View style={styles.main2} onPress={() => onPick()}>
                        <View style={styles.inner2}> 
                            <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold'}}>
                                Picked
                            </Text>
                        </View>
                    </View>
                        :
                    <TouchableOpacity style={styles.main} onPress={() => onPick()}>
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