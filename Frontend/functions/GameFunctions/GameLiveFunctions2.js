import { teamNameConversion } from "../../../assets/NameConversions";
import { swapTiles } from "./GameTimeOut";
import { convertActionToStatObj } from "./StatHelperFunctions";

import { generateClient } from "aws-amplify/api"
import { getGame } from "../../../src/graphql/queries";
import { updateTimeoutArray } from "./TimeOut";

export const goThroughEachGameAction2 = async (
    game, allTiles, actions, 
    player1SelectedTiles, player2SelectedTiles,
    player1Depth, player2Depth,
    isPlayer1,
) => {
    let allSelectedTiles = [...player1SelectedTiles, ...player2SelectedTiles]
    let allPlayers = [...player1Depth, ...player2Depth]

    const firstActionNumber = actions[0].actionNumber;
    allSelectedTiles = [...player1SelectedTiles, ...player2SelectedTiles];

    actions.forEach((action) => {
        console.log("GameliveFunction", action.actionNumber, action)
        console.log("//////")

        /* Time Out */
        if(action.actionType === "timeout"){
            const swapTiles = (selectedTiles) => {
                selectedTiles.forEach((selectedTile, index) => {
                    if(selectedTile.swapTile){
                        const swapTile = allTiles.find(t => t.row === selectedTile.swapTile.row && t.index === selectedTile.swapTile.index);
                        selectedTiles[index] = {
                            ...swapTile,
                            swapTile: null
                        }
                    }
                }) 

                return selectedTiles;
            }

            player1SelectedTiles = swapTiles(player1SelectedTiles);
            player2SelectedTiles = swapTiles(player2SelectedTiles);
            // const updatedTimeOut = updateAWSTimeOut(updatedGameRet, ourSelectedTiles, [], action.actionNumber, isPlayer1);
            // console.log("post swap", JSON.stringify(swapedSelectedTiles, null, 2));
        }

        /* PTS, REB, BLK, STL */
        if(action.playerNameI){
            const playerBelongsToPlayer1 = player1Depth.find(player => player.name === action.playerNameI);
            const playerBelongsToPlayer2 = player2Depth.find(player => player.name === action.playerNameI);
            const statObjArray = convertActionToStatObj(action);

            if(playerBelongsToPlayer1){
                player1SelectedTiles.forEach(selectedTile => {
                    const selectedTileStats = selectedTile.name.split("+");

                    selectedTileStats.forEach(selectedTileStat => {
                        const statObj = statObjArray.find(obj => obj.name === selectedTileStat);

                        if(statObj){
                            /* Add to Tile */
                            const currTile = allTiles[((selectedTile.row-1)*4)+selectedTile.index];
                            currTile.team1Progress += statObj.amount;
                            if(currTile.team1Progress >= currTile.team1Goal){
                                currTile.team1Complete = true;
                            }
                        
                            /* Add to Player Stat */
                            const playerIndex = player1Depth.findIndex(p => p.name === playerBelongsToPlayer1.name);
                            const playerTileIndex = player1Depth[playerIndex].tiles.findIndex(t => t.index === selectedTile.index && t.row === selectedTile.row);

                            if(playerTileIndex === -1){
                                player1Depth[playerIndex].tiles.push({
                                    index: selectedTile.index,
                                    row: selectedTile.row,
                                    progress: allTiles[((selectedTile.row-1)*4)+selectedTile.index].team1Progress
                                });
                            } else {
                                player1Depth[playerIndex].tiles[playerTileIndex].progress = allTiles[((selectedTile.row-1)*4)+selectedTile.index].team1Progress
                            }
                        }
                    })
                })
            }

            else if(playerBelongsToPlayer2){
                player2SelectedTiles.forEach(selectedTile => {
                    const selectedTileStats = selectedTile.name.split("+");

                    selectedTileStats.forEach(selectedTileStat => {
                        const statObj = statObjArray.find(obj => obj.name === selectedTileStat);
                        
                        if(statObj){
                            /* Add to Tile */
                            const currTile = allTiles[((selectedTile.row-1)*4)+selectedTile.index];
                            currTile.team2Progress += statObj.amount;
                            if(currTile.team2Progress >= currTile.team2Goal){
                                currTile.team2Complete = true;
                            }

                            /* Add to Player Stat */
                            const playerIndex = player2Depth.findIndex(p => p.name === playerBelongsToPlayer2.name);
                            const playerTileIndex = player2Depth[playerIndex].tiles.findIndex(t => t.index === selectedTile.index && t.row === selectedTile.row);

                            if(playerTileIndex === -1){
                                player2Depth[playerIndex].tiles.push({
                                    index: selectedTile.index,
                                    row: selectedTile.row,
                                    progress: allTiles[((selectedTile.row-1)*4)+selectedTile.index].team2Progress
                                });
                            } else {
                                player2Depth[playerIndex].tiles[playerTileIndex].progress = allTiles[((selectedTile.row-1)*4)+selectedTile.index].team2Progress
                            }
                        }
                    })
                })
            }
        }
    
        /* AST */
        else if(action.assistPlayerNameInitial){
            let playerIndex = allPlayers.findIndex(player => player.name.toLowerCase() === action.assistPlayerNameInitial.toLowerCase());
            
            if(playerIndex !== -1){
                const statObjArray = convertActionToStatObj({actionType: 'assist'});
    
                allSelectedTiles.forEach((selectedTile, index) => {
                    if(selectedTile.team === teamNameConversion(action.teamTricode)){
                        statObjArray.forEach(statObj => {
                            const names = selectedTile.name.split("+");
    
                            if(names.find(name => name === statObj.name)){
                                selectedTile.progress = statObj.amount + selectedTile.progress;
                                selectedTile.complete = selectedTile.progress >= selectedTile.goal;
                                allSelectedTiles[index] = selectedTile;

                                /* Adding to Player */
                                if(allPlayers[playerIndex].team === selectedTile.team){
                                    let tileIndex = allPlayers[playerIndex].tiles.findIndex((tile) => tile.index === selectedTile.index && tile.row === selectedTile.row);
                                    if(tileIndex !== -1){
                                        allPlayers[playerIndex].tiles[tileIndex] = selectedTile;
                                    } else {
                                        allPlayers[playerIndex].tiles.push(selectedTile);
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }

    });
    
    return {
        allTiles: allTiles, 
        player1SelectedTiles: player1SelectedTiles, 
        player2SelectedTiles: player2SelectedTiles,
        player1Depth, 
        player2Depth,
        allPlayers: allPlayers,
    };
}