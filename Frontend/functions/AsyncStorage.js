import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @returns {bool} If it is true then regrab games and player stats
 */
export const AsyncDailyCheck = async () => {
    /*
        We reset the daily check at 1:15 AM EST each day
        
        How we do this is we get the current time and see if it is
        after the nextDailyResetTime. If it is we return true and 
        then set nextDailyResetTime to tmr's 1:15 AM EST date.
    */

    const nextDailyResetTime = JSON.parse(await AsyncStorage.getItem('nextDailyResetTime'));
    const timeNow = Date.now();

    // console.log("AsyncDailyCheck TimeNow", timeNow)
    // console.log("AsyncDailyCheck", nextDailyResetTime)

    if(timeNow > nextDailyResetTime){
        let nextDailyResetTime = new Date(); /* Should be 1:15AM EST in UTC time which is 6:15 */
        nextDailyResetTime.setUTCHours(6, 15, 0, 0);
        console.log("We have to change nextDailyResetTime", nextDailyResetTime);

        await AsyncStorage.setItem('nextDailyResetTime', JSON.stringify(nextDailyResetTime));

        return true;
    } else {
        return false;
    }
}