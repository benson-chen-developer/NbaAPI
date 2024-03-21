export const getFullNameOfStat = (sortName) => {
    if(sortName === "AST") return "Assists";
    else if(sortName === "PTS") return "Points";
    else if(sortName === "REB") return "Rebounds";
    else if(sortName === "PTS+REB") return "Points + Rebounds";
    else if(sortName === "PTS+AST") return "Points + Assists";
    else if(sortName === "PTS+REB+AST") return "Points + Assists + Rebounds";
    else if(sortName === "BLK") return "Blocks";
    else if(sortName === "STL") return "Steals";
    else if(sortName === "BLK+STL") return "Blocks + Steals";
    else if(sortName === "FGM") return "Field Goals Made";
    else if(sortName === "FGA") return "Field Goals Attempted";
    else if(sortName === "3PM") return "3 Pointers Made";
    else if(sortName === "3PA") return "3 Pointers Attempted";
    else if(sortName === "FTA") return "Free Throws Attempted";
    else if(sortName === "FTM") return "Free Throws Made";
    else if(sortName === "FTA") return "Free Throws Attempted";
    else "Err"
}

/**
 * Turns Lebron James to L. James
 * @param {string} name 
 * @returns {string}
 */
export const ShortenPlayerName = (name) => {
    const arr = name.split(" ");

    const firstName = arr[0];
    if (arr.length === 1) {
        return `${firstName.charAt(0)}.`;
    }

    const lastName = arr[arr.length - 1];
    const shortenedLastName = lastName.length > 9 ? `${lastName.slice(0, 9)}.` : lastName;

    return `${firstName.charAt(0)}. ${shortenedLastName}`;
}


/*
    If toShort is true then turn the name to short otherwise return long one
*/
export const teamNameConversion = (name) => {
    if(name === "BOS") return "Celtics";
    else if(name === "LAL") return "Lakers";
    else if(name === "IND") return "Pacers";
    else if(name === "CLE") return "Cavaliers";

    if(name === "Pacers") return "IND";
    else if(name === "Cavaliers") return "CLE";

    return "none";
}