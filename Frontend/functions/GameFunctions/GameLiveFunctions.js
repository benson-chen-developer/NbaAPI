import { UpdateGame } from '../MutationFunctions/GameMutation';

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
export const updatePlayerStats = (data, players) => {
    /* First 3 index in players will be the active player and who we count stats for */

    if(data.length === 0){
        console.log("GameLiveFunctions: No new Changes");
        return players;
    }

    const activePlayers = players.splice(0,3);

    data.forEach(action => {
        if(action.playerName){
            let index = activePlayers.findIndex(player => player.name.toLowerCase() === action.playerNameI.toLowerCase());
            
            let updateThisPlayer;

            if(index !== -1){
                updateThisPlayer = addThisActionToPlayer(activePlayers[index], action, activePlayers);
                activePlayers[index] = updateThisPlayer;
            }
        }

        if(action.assistPlayerNameInitial){
            let index = activePlayers.findIndex(player => player.name.toLowerCase() === action.assistPlayerNameInitial.toLowerCase());
            
            let updateThisPlayer;

            if(index !== -1){
                updateThisPlayer = addThisActionToPlayer(activePlayers[index], {actionType: 'assist'}, activePlayers);
                activePlayers[index] = updateThisPlayer;
            }
        }
    })

    return activePlayers;
}

/* 
    @parma player: should be L. James (First Intial then Full Last Name)
*/
const addThisActionToPlayer = (player, action) => {
    if(action.actionType === "3pt"){
        if(action.shotResult === "Made"){
            player["3PM"] += 1;
            player["PTS"] += 3;
            player["3PA"] += 1;
        } else {
            player["3PA"] += 1;
        }
    }
    else if(action.actionType === "2pt"){
        if(action.shotResult === "Made"){
            player["PTS"] += 2;
        }
    }
    else if(action.actionType === "rebound"){
        player["REB"] += 1;
    }
    else if(action.actionType === "block"){
        player["BLK"] += 1;
    }
    else if(action.actionType === "steal"){
        player["STL"] += 1;
    }
    else if(action.actionType === "assist"){
        player["AST"] += 1;
    }
    else if(action.actionType === "freethrow"){
        if(action.shotResult === "Made"){
            player["PTS"] += 1;
        }
    }

    return player;
}


/**
 * @param {gameAWS} game Its the game aws obj
 * @param {string} userId User's id
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
        const actionsListRes = await fetchBoxScore(game.apiLink, lastActionNumber);
        /*
            First we check if the lastActionNumber matches the current one
            This means no change needed
        */
        const lastAction = actionsListRes[actionsListRes.length - 1];
        if (lastActionNumber === lastAction.actionNumber) {
            return game;
        }

        /* 
            This is what fields we are updating
            LastActionNumber is updated by default
        */
        let updateInput = { id: game.id };
        updateInput[isPlayer1 ? "player1LastActionNumber" : "player2LastActionNumber"] = lastAction.actionNumber;

        /* We get the stats back so we update them now */
        const updatedPlayers = updatePlayerStats(actionsListRes, playerDepth);
        if (isPlayer1)
            updateInput = { ...updateInput, player1Depth: updatedPlayers.map(value => JSON.stringify(value)) };
        else
            updateInput = { ...updateInput, player2Depth: updatedPlayers.map(value => JSON.stringify(value)) };

        /* Check if the last action is game ended */
        if (lastAction.description && lastAction.description === "Game End") {
            console.log("UserFunctions: Game Has Ended");
            updateInput = { ...updateInput, ended: true };
        }

        /* Update the game */
        const updatedGame = await UpdateGame(updateInput, "UserFunction.js");
        
        return updatedGame;
    } catch (error) {
        console.error("Error in getLatestActionsAndUpdateGame: (Game didnt start)", error);

        return game;
    }
}