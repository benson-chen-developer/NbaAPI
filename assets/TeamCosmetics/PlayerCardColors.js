export const getPlayerCardColors = (teamName) => {
    var retObj = {
        teamName: teamName, mainColor: "grey"
    }

    if(teamName === "Houston Rockets"){
        retObj.mainColor = "#CE1241";
    }

    return retObj;
}