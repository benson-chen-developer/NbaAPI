import AsyncStorage from "@react-native-async-storage/async-storage";
import { teamNameConversion } from "../../../assets/NameConversions";

/**
 *  Team Depth is array of obj
 *        obj is just {teamName: "Celtics", abbreviated: "BOS", teamDepth: ["name", "name", "name", "name", "name"]}
*/
export const getAsyncTeamDepth = async () => {
    return JSON.parse(await AsyncStorage.getItem('teamDepthObjArray'));
}

export const setAsyncTeamDepthObjArray = async (newArr) => {
    const teamDepthObjArray = JSON.stringify(newArr);
    await AsyncStorage.setItem('teamDepthObjArray', teamDepthObjArray);

    const storedValue = await AsyncStorage.getItem('teamDepthObjArray');

    return JSON.parse(storedValue);
}

/**
 * @param {[obj]} playerStats 
 *      - {"AST": "223", "BLK": "29", "FG": "540", "FG3": "125", "FG3A": "353", "FGA": "1076", "FT": "183", "FTA": "260", "Games Played": "60", "PF": "159", "PPG": "23.1", "PTS": "1388", "REB": "333", "STL": "66", "TO": "137", "abbreviated": "BOS", "name": "Jaylen Brown"}
 */
export const autoCreateTeamDepth = async (playerStats) => {
    const newTeamDepthObjArray = [];

    playerStats.forEach(playerStat => {
        const foundTeamDepthObj = newTeamDepthObjArray.find(teamDepthObj => teamDepthObj.abbreviated === playerStat.abbreviated);
        
        if(!foundTeamDepthObj){
            newTeamDepthObjArray.push({name: teamNameConversion(playerStat.abbreviated), abbreviated: playerStat.abbreviated, teamDepth: [playerStat.name]});
        } else {
            if(foundTeamDepthObj.teamDepth.length < 5){
                foundTeamDepthObj.teamDepth.push(playerStat.name);
            }
        }
    });

    return newTeamDepthObjArray;
}