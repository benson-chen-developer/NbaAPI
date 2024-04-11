import { teamNameConversion } from '../../../assets/NameConversions';
import { UpdateGame } from '../MutationFunctions/GameMutation';
import { ActionToSquareNumber, AddActionToPlayer, AddActionToTeamGainedStats } from './StatHelperFunctions';

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
// export const getLatestActionsAndUpdateGame = async (game, userId) => {
//     let teamsGainedStats = [
//         {
//             "teamName": teamNameConversion(game.teams[0]),
//             "PTS": 0,
//             "REB": 0,
//             "AST": 0,
//             "3PA": 0,
//             "3PM": 0,
//             "FGA": 0,
//             "FGM": 0,
//             "FTA": 0,
//             "FTM": 0,
//             "STL": 0,
//             "BLK": 0,
//         },
//         {
//             "teamName": teamNameConversion(game.teams[1]),
//             "PTS": 0,
//             "REB": 0,
//             "AST": 0,
//             "3PA": 0,
//             "3PM": 0,
//             "FGA": 0,
//             "FGM": 0,
//             "FTA": 0,
//             "FTM": 0,
//             "STL": 0,
//             "BLK": 0,
//         }
//     ]

//     /* This is to set up our variables by checking which playerId is ours */
//     const isPlayer1 = game.player1Id === userId;
//     let playerDepth = [];
//     let lastActionNumber;
//     if (isPlayer1) {
//         playerDepth = game.player1Depth.map(value => JSON.parse(value));
//         lastActionNumber = game.player1LastActionNumber;
//     } else {
//         playerDepth = game.player1Depth.map(value => JSON.parse(value));
//         lastActionNumber = game.player2LastActionNumber;
//     }
//     /* Fetching each individual action that occured in the game */
//     try {

//         /* 1) Fetch Box Scores */
//         const actionsListRes = await fetchBoxScore(game.apiLink, lastActionNumber);

//             /*
//                 First we check if the lastActionNumber matches the current one
//                 This means no change needed
//             */
//             const lastAction = actionsListRes[actionsListRes.length - 1];
//             if (lastActionNumber === lastAction.actionNumber) {
//                 return {
//                     teamsGainedStats: teamsGainedStats, 
//                     actionsListLastFive: [lastAction], 
//                     scores: [lastAction.scoreHome, lastAction.scoreAway]
//                 };
//             }

//         /*  2)
//             Update Players with the New Stats we got from all the actions that occured
//         */
//             let updateInput = { id: game.id };
//             updateInput[isPlayer1 ? "player1LastActionNumber" : "player2LastActionNumber"] = lastAction.actionNumber;

//             const updatedPlayers = updatePlayerStats(actionsListRes, playerDepth);
//             // console.log("GameLiveFunctions: Updated Players (Ava)", updatedPlayers);

//             // const updatedSelectedTile = updateSelectedTiles(isPlayer1, actionsListRes);
//             teamsGainedStats = setTeamsGainedStats(actionsListRes, [{name: "P. Siakam"}], [], teamsGainedStats)
        
//         /*  3)
//             The players got their stats updated so we can now  
//             use the aviable stats and add it to the current squares on board
//         */
//             if (isPlayer1)
//                 updateInput = { ...updateInput, player1Depth: updatedPlayers };
//             else
//                 updateInput = { ...updateInput, player2Depth: updatedPlayers };

//             /* Check if the last action is game ended */
//             if (lastAction.description && lastAction.description === "Game End") {
//                 console.log("UserFunctions: Game Has Ended");
//                 updateInput = { ...updateInput, ended: true };
//             }

//         /* Update the game */
//         // const updatedGame = await UpdateGame(updateInput, "UserFunction.js");

//         /* Here we return the actions for the user to view (Only latest 5) */
//         const actionsListLastFive = actionsListRes.slice(-5);
        
//         // console.log("GameLiveFunctions 2", actionsListLastFive)
//         return {
//             teamsGainedStats: teamsGainedStats, 
//             actionsListLastFive: actionsListLastFive, 
//             scores: [lastAction.scoreHome, lastAction.scoreAway]
//         };
//     } catch (error) {
//         console.error("Error in getLatestActionsAndUpdateGame: (Game didnt start)", error);

//         return {updatedGame: game};
//     }
// }

export const getLatestActionsAndStats = async (game, userId) => {
    let teamsGainedStats = [
        {
            "teamName": teamNameConversion(game.teams[0]),
            "PTS": 0,
            "REB": 0,
            "AST": 0,
            "3PA": 0,
            "3PM": 0,
            "FGA": 0,
            "FGM": 0,
            "FTA": 0,
            "FTM": 0,
            "STL": 0,
            "BLK": 0,
        },
        {
            "teamName": teamNameConversion(game.teams[1]),
            "PTS": 0,
            "REB": 0,
            "AST": 0,
            "3PA": 0,
            "3PM": 0,
            "FGA": 0,
            "FGM": 0,
            "FTA": 0,
            "FTM": 0,
            "STL": 0,
            "BLK": 0,
        }
    ]
    const player1Depth = game.player1Depth.map(player => JSON.parse(player));
    const player2Depth = game.player2Depth.map(player => JSON.parse(player));

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
            This means no change needed (same last action)
        */
        const lastAction = actionsListRes[actionsListRes.length - 1];
        if (lastActionNumber === lastAction.actionNumber) {
            return {
                teamsGainedStats: teamsGainedStats, 
                actionsListLastFive: [lastAction], 
                scores: [lastAction.scoreHome, lastAction.scoreAway]
            };
        }

        const homeDepth = player1Depth.find(player => player.teamName === game.teams[0]) ? player1Depth : player2Depth;
        const awayDepth = player1Depth.find(player => player.teamName === game.teams[1]) ? player1Depth : player2Depth;

        teamsGainedStats = setTeamsGainedStats(actionsListRes, homeDepth, awayDepth, teamsGainedStats)
        
        /* Here we return the actions for the user to view (Only latest 5) */
        const actionsListLastFive = actionsListRes.slice(-5);
        // console.log("GameLiveFunctions 2", actionsListLastFive)
        
        return {
            teamsGainedStats: teamsGainedStats, 
            actionsListLastFive: actionsListLastFive, 
            newScores: [lastAction.scoreHome, lastAction.scoreAway]
        };
    } catch (error) {
        console.error("Error in getLatestActionsAndUpdateGame: (Game didnt start)", error);

        return {updatedGame: game, actionsListLastFive: [], newScores: [0, 0]};
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

const setTeamsGainedStats = (actionsList, homePlayers, awayPlayers, teamsGainedStats) => {
    const allPlayers = [...homePlayers.slice(0, 3), ...awayPlayers.slice(0, 3)];

    actionsList.forEach(action => {

        /* P.Siakum not Siakum */
        if(action.playerNameI){
            let index = allPlayers.findIndex(player => player.name.toLowerCase() === action.playerNameI.toLowerCase());
            
            if(index !== -1){
                teamsGainedStats = AddActionToTeamGainedStats(teamsGainedStats, action);
            }
        }

        if(action.assistPlayerNameInitial){
            let index = allPlayers.findIndex(player => player.name.toLowerCase() === action.assistPlayerNameInitial.toLowerCase());
            
            if(index !== -1){
                teamsGainedStats = AddActionToTeamGainedStats(teamsGainedStats, {actionType: 'assist'});
            }
        }
    })

    return teamsGainedStats;
}