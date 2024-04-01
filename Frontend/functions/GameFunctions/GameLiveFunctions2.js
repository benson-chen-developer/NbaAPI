import { teamNameConversion } from "../../../assets/NameConversions";
import { swapTiles, updateAWSTimeOut } from "./GameTimeOut";
import { convertActionToStatObj } from "./StatHelperFunctions";

import { generateClient } from "aws-amplify/api"
import { getGame } from "../../../src/graphql/queries";

export const goThroughEachGameAction = async (
    game, allTiles,
    actions, 
    allPlayers
) => {
    const client = generateClient();
    let allSelectedTiles = [];

    const gameRet = await client.graphql({ query: getGame,variables: { id: game.id } });
    let gameParsed = gameRet.data.getGame;
    let timeoutArray = gameParsed.timeoutArray.map(timeOut => JSON.parse(timeOut));
    
    const firstActionNumber = actions[0].actionNumber;
    let mostRecentTimeout = timeoutArray[0];

    /* Find the most recent timeout */
    timeoutArray.forEach(timeOut => {
        if(timeOut.actionNumber <= firstActionNumber && timeOut.actionNumber > mostRecentTimeout.actionNumber){
            mostRecentTimeout = timeOut;
        }
    })
    let player1SelectedTiles = mostRecentTimeout.player1SelectedTiles; 
    let player2SelectedTiles = mostRecentTimeout.player2SelectedTiles;

    /* Loop through the actions list */
    actions.forEach((action) => {
        allSelectedTiles = [...player1SelectedTiles, ...player2SelectedTiles];

        /* Time Out */
        if(action.actionType === "timeout"){
            player1SelectedTiles = swapTiles(player1SelectedTiles);
            player2SelectedTiles = swapTiles(player2SelectedTiles);
            // const updatedTimeOut = updateAWSTimeOut(updatedGameRet, ourSelectedTiles, [], action.actionNumber, isPlayer1);
            // console.log("post swap", JSON.stringify(swapedSelectedTiles, null, 2));
        }

        /* PTS, REB, BLK, STL */
        else if(action.playerNameI){
            let playerIndex = allPlayers.findIndex(player => player.name.toLowerCase() === action.playerNameI.toLowerCase());

            if(playerIndex !== -1){
                const statObjArray = convertActionToStatObj(action);
    
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

        /* Update the board with all the new shit */
        allSelectedTiles.forEach((selectedTile) => {
            const currentIndex = (selectedTile.row-1)*4 + selectedTile.index;

            if(game.teams[0] === selectedTile.team){
                allTiles[currentIndex].team1Progress = selectedTile.progress;
                allTiles[currentIndex].team1Complete = selectedTile.complete;
            } else {
                allTiles[currentIndex].team2Progress = selectedTile.progress;
                allTiles[currentIndex].team2Complete = selectedTile.complete;
            }
        })

        // console.log("playerMoves", JSON.stringify(allPlayers, null, 2));
    });

    return {
        allTiles: allTiles, 
        player1SelectedTiles: player1SelectedTiles, 
        player2SelectedTiles: player2SelectedTiles,
        allPlayers: allPlayers
    };
}