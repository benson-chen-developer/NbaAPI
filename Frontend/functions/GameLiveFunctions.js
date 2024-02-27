export const fetchBoxScore = async (api, lastActionNumber) => {
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

    const activePlayers = players.splice(0,3);

    data.forEach(action => {
        if(action.playerName){
            let index = activePlayers.findIndex(player => player.name.toLowerCase() === action.playerNameI.toLowerCase());
            
            let updateThisPlayer;

            if(index !== -1){
                updateThisPlayer = addThisActionToPlayer(activePlayers[index], action, activePlayers);
                activePlayers[index] = updateThisPlayer;
            }
            // console.log(updateThisPlayer)
        }
    })

    return activePlayers;
}

/* 
    @parma player: should be L. James (First Intial then Full Last Name)
*/
const addThisActionToPlayer = (player, action, activePlayers) => {
    if(action.actionType === "3pt"){
        if(action.shotResult === "Made"){
            player["3PM"] += 1;
            player["PTS"] += 3;
            player["3PA"] += 1;
        } else {
            player["3PA"] += 1;
        }
        if(action.assistPlayerNameInitial){
            if(activePlayers.find(player => player.name.toLowerCase() === action.assistPlayerNameInitial.toLowerCase()))
                addThisActionToPlayer(action.assistPlayerNameInitial, {actionType: "assist"}, activePlayers)
        }
    }
    else if(action.actionType === "2pt"){
        if(action.shotResult === "Made"){
            player["PTS"] += 2;
        }
        if(action.assistPlayerNameInitial){
            if(activePlayers.find(player => player.name.toLowerCase() === action.assistPlayerNameInitial.toLowerCase()))
                addThisActionToPlayer(action.assistPlayerNameInitial, {actionType: "assist"}, activePlayers)
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