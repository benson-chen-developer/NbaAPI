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

export const teamNameConversion = ({}) => {

}