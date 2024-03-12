export const AddActionToPlayer = (player, action) => {
    if(action.actionType === "3pt"){
        if(action.shotResult === "Made"){
            player["3PM"] += 1;
            player["PTS"] += 3;
            player["3PA"] += 1;

            // player.availableaction.actionTypes["PTS"] += 3;
            // player.availableaction.actionTypes["3PM"] += 1;
        } else {
            player["3PA"] += 1;
        }
    }
    else if(action.actionType === "2pt"){
        if(action.shotResult === "Made"){
            player["PTS"] += 2;
            // player.availableaction.actionTypes["PTS"] += 2;
        }
    }
    else if(action.actionType === "rebound"){
        player["REB"] += 1;
        // player.availableaction.actionTypes["REB"] += 1;
    }
    else if(action.actionType === "block"){
        player["BLK"] += 1;
        // player.availableaction.actionTypes["BLK"] += 1;
    }
    else if(action.actionType === "steal"){
        player["STL"] += 1;
        // player.availableaction.actionTypes["STL"] += 1;
    }
    else if(action.actionType === "assist"){
        player["AST"] += 1;
        // player.availableaction.actionTypes["AST"] += 1;
    }
    else if(action.actionType === "freethrow"){
        if(action.shotResult === "Made"){
            player["PTS"] += 1;
        }
    }

    return player;
}

export const ActionToSquareNumber = (action) => {
    if(action.actionType === "3pt"){
        if(action.shotResult === "Made"){
            return 3;
        }
    }
    else if(action.actionType === "2pt"){
        if(action.shotResult === "Made"){
           return 2;
        }
    }
    else if(action.actionType === "rebound"){
        return 1;
    }
    else if(action.actionType === "block"){
        return 1;
    }
    else if(action.actionType === "steal"){
        return 1;
    }
    else if(action.actionType === "assist"){
        return 1;
    }
    else if(action.actionType === "freethrow"){
        if(action.shotResult === "Made"){
            return 1;
        }
    }

    else return 0;
}