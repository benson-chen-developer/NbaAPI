import { UpdateGame } from '../MutationFunctions/GameMutation';
import { ActionToSquareNumber, AddActionToPlayer } from './StatHelperFunctions';

/**
 * @param {gameAWS} game Its the game aws obj
 * @param {string} userId User's id
 * 
 *  1) Fetch Box Scores
 * 
 *  2) Update Players with the New Stats we got from all the actions that occured
 * 
 *  3)  The players got their stats updated so we can now  
        use the aviable stats and add it to the current squares on board
 */
export const getLatestActionsAndUpdateGame = async (game, userId) => {
    /* This is to set up our variables by checking which playerId is ours */
    const isPlayer1 = game.player1Id === userId;
    let playerDepth = [];
    let lastActionNumber;
    if (isPlayer1) {
        playerDepth = game.player1Depth.map(value => JSON.parse(value));
        lastActionNumber = game.player1LastActionNumber;
    } else {
        playerDepth = game.player1Depth.map(value => JSON.parse(value));
        lastActionNumber = game.player2LastActionNumber;
    }

    /* Fetching each individual action that occured in the game */
    try {

        /* 1) Fetch Box Scores */
        const actionsListRes = await fetchBoxScore(game.apiLink, lastActionNumber);

            /*
                First we check if the lastActionNumber matches the current one
                This means no change needed
            */
            const lastAction = actionsListRes[actionsListRes.length - 1];
            if (lastActionNumber === lastAction.actionNumber) {
                return {updatedGame: game};;
            }

        /*  2)
            Update Players with the New Stats we got from all the actions that occured
        */
            let updateInput = { id: game.id };
            updateInput[isPlayer1 ? "player1LastActionNumber" : "player2LastActionNumber"] = lastAction.actionNumber;

            const updatedPlayers = updatePlayerStats(actionsListRes, playerDepth);
            // console.log("GameLiveFunctions: Updated Players (Ava)", updatedPlayers);

            const updatedSelectedTile = updateSelectedTiles(isPlayer1, actionsListRes);
        
        /*  3)
            The players got their stats updated so we can now  
            use the aviable stats and add it to the current squares on board
        */
            if (isPlayer1)
                updateInput = { ...updateInput, player1Depth: updatedPlayers };
            else
                updateInput = { ...updateInput, player2Depth: updatedPlayers };

            /* Check if the last action is game ended */
            if (lastAction.description && lastAction.description === "Game End") {
                console.log("UserFunctions: Game Has Ended");
                updateInput = { ...updateInput, ended: true };
            }

        /* Update the game */
        const updatedGame = await UpdateGame(updateInput, "UserFunction.js");

        /* Here we return the actions for the user to view (Only latest 5) */
        const actionsListLastFive = actionsListRes.slice(-5);
        
        // console.log("GameLiveFunctions 2", actionsListLastFive)
        return {updatedGame: updatedGame, actionsListLastFive: actionsListLastFive};
    } catch (error) {
        console.error("Error in getLatestActionsAndUpdateGame: (Game didnt start)", error);

        return {updatedGame: game};;
    }
}

export const fetchBoxScore = async (api, lastActionNumber) => {
    if(api)
        try {
            const response = await fetch(api);
            const data = await response.json();

            let index = 0;
            while(data.game.actions[index].actionNumber < lastActionNumber){
                index++;
            }

            const currentData = data.game.actions.slice(index);

            // console.log("GameLiveFunction, data Res")
            // console.log(JSON.stringify(currentData, null, 2));

            return currentData;
        } catch (error) {
            console.error("(GameLiveFunction) Error fetching box score:", error);
            throw error; 
        }
}

/*
    players = [Player]

    Player = {
        "name": "L. James"
        "PTS": 0,
        "REB": 0,
        "AST": 0,
        "BLK": 0,
        "STL": 0,
        "3PM": 0,
        "3PA": 0
    }
*/
const updatePlayerStats = (data, players) => {
    /* First 3 index in players will be the active player and who we count stats for */
    if(data.length === 0){
        console.log("GameLiveFunctions: No new Changes");
        return players;
    }

    const activePlayers = players.splice(0,3);
    let updateThisPlayer;

    data.forEach(action => {
        if(action.playerName){
            let index = activePlayers.findIndex(player => player.name.toLowerCase() === action.playerNameI.toLowerCase());
            
            if(index !== -1){
                updateThisPlayer = addThisActionToPlayer(activePlayers[index], action.actionType);
                activePlayers[index] = updateThisPlayer;
            }
        }

        if(action.assistPlayerNameInitial){
            let index = activePlayers.findIndex(player => player.name.toLowerCase() === action.assistPlayerNameInitial.toLowerCase());
            
            if(index !== -1){
                updateThisPlayer = AddActionToPlayer(activePlayers[index], {actionType: 'assist'});
                activePlayers[index] = updateThisPlayer;
            }
        }
    })

    return activePlayers;
}


const updateSelectedTiles = (isPlayer1, actions) => {

    /* Splice the name so we have an array to add up the multi stat squares */
    const selectedTiles = [{"name": "PTS+REB+AST", "team1Complete": false, "team1Goal": 106, "team1Progress": 0, "team1Selected": true, "team2Complete": false, "team2Goal": 106, "team2Progress": 0, "team2Selected": false}, {"name": "AST", "team1Complete": false, "team1Goal": 36.9, "team1Progress": 0, "team1Selected": true, "team2Complete": false, "team2Goal": 36.9, "team2Progress": 0, "team2Selected": false}]
    selectedTiles.forEach(tile => {
        tile.name = tile.name.split("+");
    });

    actions.forEach(action => {
        selectedTiles.forEach(tile => {
            if(isPlayer1)
                tile.team1Progress += ActionToSquareNumber(action);
            else 
                tile.team2Progress += ActionToSquareNumber(action);
        })
    })

    console.log("updatePlayerStats", selectedTiles)
}

export const closeGame = (game, userId) => {
    
}