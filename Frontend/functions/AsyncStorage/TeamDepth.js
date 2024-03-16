import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *  Team Depth is array of obj
 *        obj is just {teamName: "Celtics", teamDepth: ["name", "name", "name", "name", "name"]}
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