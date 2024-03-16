import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *  Team Depth is array of obj
 *        obj is just {teamName: "Celtics", teamDepth: ["name", "name", "name", "name", "name"]}
*/

export const getAsyncTeamDepth = async () => {
    return JSON.parse(await AsyncStorage.getItem('teamDepthObjArray'));
}

export const setAsyncTeamDepth = async (oldPlayer, newPlayer) => {
    if(oldPlayer.name === newPlayer.name){
        console.log("setAsyncTeamDepth Err: Why are these the same player");
        return;
    }

    const teamDepthArray = JSON.parse(await AsyncStorage.getItem('teamDepthArray'));
    const currentTeamDepthArray = teamDepthArray.find((team) => team.abbreviated === oldPlayer.abbreviated).team;

    // console.log("TeamDepth.js, old and new player ", oldPlayer, newPlayer)

    let oldIndex = -1;
    let newIndex = -1;
    console.log("setAsyncTeamDepth, The old teamdepth", currentTeamDepthArray);

    for(let i=0; i<currentTeamDepthArray.length; i++){
        if(currentTeamDepthArray[i].name === oldPlayer.name) oldIndex = i;
        if(currentTeamDepthArray[i].name === newPlayer.name) newIndex = i;
    }

    if(oldIndex === -1){
        console.log("setAsyncTeamDepth Err: Why is the old player not even on the depth");
        return;
    }

    if(oldIndex > -1 && newIndex > -1){
        const oldPlayer = currentTeamDepthArray[oldIndex];
        currentTeamDepthArray[oldIndex] = newPlayer;
        currentTeamDepthArray[newIndex] = oldPlayer;
    } 

    for(let i=0; i<teamDepthArray.length; i++){
        if(teamDepthArray[i].abbreviated === currentTeamDepthArray.abbreviated)
            teamDepthArray[i] = currentTeamDepthArray;
    }

    // console.log("setAsyncTeamDepth, The new teamdepth", teamDepthArray.find((team) => team.abbreviated === oldPlayer.abbreviated).team);

    await AsyncStorage.setItem('teamDepthArray', JSON.stringify(teamDepthArray));

    return teamDepthArray;
}

export const newTeamDepthObjArray = async (newArr) => {
    const teamDepthObjArray = JSON.stringify(newArr);
    await AsyncStorage.setItem('teamDepthObjArray', teamDepthObjArray);
    const storedValue = await AsyncStorage.getItem('teamDepthObjArray');
    console.log("Stored teamDepthObjArray:", storedValue);

    return storedValue;
}

export const setAsyncTeamDepthObjArray = async (newArr) => {
    const teamDepthObjArray = JSON.stringify(newArr);
    await AsyncStorage.setItem('teamDepthObjArray', teamDepthObjArray);

    const storedValue = await AsyncStorage.getItem('teamDepthObjArray');

    return JSON.parse(storedValue);
}