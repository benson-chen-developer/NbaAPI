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

export const AddActionToTeamGainedStats = (teamGainedStats, action) => {
    const teamGainedStat = teamGainedStats.find(team => team.teamName === action.teamTricode);

    if(action.actionType === "3pt"){
        if(action.shotResult === "Made"){
            teamGainedStat["3PM"] += 1;
            teamGainedStat["PTS"] += 3;
            teamGainedStat["3PA"] += 1;
        } else {
            teamGainedStat["3PA"] += 1;
        }
    }
    else if(action.actionType === "2pt"){
        if(action.shotResult === "Made"){
            teamGainedStat["PTS"] += 2;
        }
    }
    else if(action.actionType === "rebound"){
        teamGainedStat["REB"] += 1;
    }
    else if(action.actionType === "block"){
        teamGainedStat["BLK"] += 1;
    }
    else if(action.actionType === "steal"){
        teamGainedStat["STL"] += 1;
    }
    else if(action.actionType === "assist"){
        teamGainedStat["AST"] += 1;
    }
    else if(action.actionType === "freethrow"){
        if(action.shotResult === "Made"){
            teamGainedStat["PTS"] += 1;
        }
    }

    teamGainedStats.forEach(teamStat => {
        if(teamStat.name === teamGainedStat.name){
            teamStat = teamGainedStat;
        }
    })
    
    return teamGainedStats;
}

export const convertActionToStatObj = (action) => {
    // console.log("convertActionToStatObj action", action)
    const retArr = [];

    if(action.actionType === "3pt"){
        if(action.shotResult === "Made"){
            retArr.push({"name": "3PM", "amount": 1});
            retArr.push({"name": "PTS", "amount": 3});
            retArr.push({"name": "3PA", "amount": 1});
        } else {
            retArr.push({"name": "3PA", "amount": 1});
        }
    }
    else if(action.actionType === "2pt"){
        if(action.shotResult === "Made"){
            retArr.push({"name": "PTS", "amount": 2});
        }
    }
    else if(action.actionType === "rebound"){
        retArr.push({"name": "REB", "amount": 1});
    }
    else if(action.actionType === "block"){
        retArr.push({"name": "BLK", "amount": 1});
    }
    else if(action.actionType === "steal"){
        retArr.push({"name": "STL", "amount": 1});
    }
    else if(action.actionType === "assist"){
        retArr.push({"name": "AST", "amount": 1});
    }
    else if(action.actionType === "freethrow"){
        if(action.shotResult === "Made"){
            retArr.push({"name": "PTS", "amount": 1});
        }
    }

    return retArr;
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