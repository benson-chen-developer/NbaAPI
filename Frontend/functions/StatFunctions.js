
/**
 * @returns 
 * {"3PA": "37.2", "3PM": "13.5", "AST": "18.8", "BLK": "111.1", "FGA": "89.6", "FGM": "40.9", "FTA": "20.7", "FTM": "15.7", "PTS": "111.1", "REB": "26.3", "STL": "13.0", "name": "Bkn."}
 */
const loadTeamAverages = async () => {
    try {
        const teamAverages = [];
        const response = await fetch("https://cdn.nba.com/static/json/staticData/EliasGameStats/00/team_opp.txt");
        const data = await response.text();
        const lines = data.split('\n').slice(5, 35);

        lines.forEach(line => {
            const words = line.split(' ').filter(word => word !== "");
            const games = words[1];

            teamAverages.push({
                "name": teamNameConverter(words[0]),
                "FGM": (words[2]/games).toFixed(1),
                "FGA": (words[3]/games).toFixed(1),
                "3PM": (words[5]/games).toFixed(1),
                "3PA": (words[6]/games).toFixed(1),
                "FTM": (words[8]/games).toFixed(1),
                "FTA": (words[9]/games).toFixed(1),
                "REB": (words[13]/games).toFixed(1),
                "AST": (words[14]/games).toFixed(1),
                "STL": (words[17]/games).toFixed(1),
                "BLK": (words[19]/games).toFixed(1),
                "PTS": parseFloat(words[21]).toFixed(1),
            })
        });

        return teamAverages;
    } catch (error) {
        console.error("Error loading team averages:", error);
        return null;
    }
}

/**
 * 
 * @param {string} homeTeam //Heat
 * @param {string} awayTeam //Pacers
 * @returns 
 */
export const getAverages = async (homeTeam, awayTeam) => {
    const teamAverages = await loadTeamAverages();
    return [
        teamAverages.find(team => team.name === homeTeam),
        teamAverages.find(team => team.name === awayTeam)
    ]
}

const teamNameConverter = (name) => {
    if(name === "Ind."){
        // return {abbreviated: "IND", teamName: "Pacers"}
        return "Pacers";
    }
    else if(name === "Bos."){
        // return {abbreviated: "BOS", teamName: "Celtics"}
        return "Celtics";
    }
    else if(name === "OKC."){
        // return {abbreviated: "OKC", teamName: "Thunder"}
        return "Thunder";
    }
    else if(name === "Milw."){
        // return {abbreviated: "MIL", teamName: "Bucks"}
        return "Bucks";
    }
    else if(name === "Atl."){
        // return {abbreviated: "ATL", teamName: "Hawks"}
        return "Hawks";
    }
    else if(name === "Dall."){
        // return {abbreviated: "DAL", teamName: "Mavericks"}
        return "Mavericks";
    }
    else if(name === "G.S."){
        // return {abbreviated: "GSW", teamName: "Warriors"}
        return "Warriors";
    }
    else if(name === "Sac."){
        // return {abbreviated: "SAC", teamName: "Kings"}
        return "Kings";
    }
    else if(name === "LA-L"){
        // return {abbreviated: "LAL", teamName: "Lakers"}
        return "Lakers";
    }
    else if(name === "Phoe."){
        // return {abbreviated: "PHX", teamName: "Suns"}
        return "Suns";
    }
    else if(name === "Utah"){
        // return {abbreviated: "UTA", teamName: "Jazz"}
        return "Jazz";
    }
    else if(name === "LA-C"){
        // return {abbreviated: "LAC", teamName: "Clippers"}
        return "Clippers";
    }
    else if(name === "N.O."){
        // return {abbreviated: "NOP", teamName: "Pelicans"}
        return "Pelicans";
    }
    else if(name === "Den."){
        // return {abbreviated: "DEN", teamName: "Nuggets"}
        return "Nuggets";
    }
    else if(name === "Phil."){
        // return {abbreviated: "PHI", teamName: "76ers"}
        return "76ers";
    }
    else if(name === "Hou."){
        // return {abbreviated: "HOU", teamName: "Rockets"}
        return "Rockets";
    }
    else if(name === "Wash."){
        // return {abbreviated: "WAS", teamName: "Wizards"}
        return "Wizards";
    }
    else if(name === "Tor."){
        // return {abbreviated: "TOR", teamName: "Raptors"}
        return "Raptors";
    }
    else if(name === "Minn."){
        // return {abbreviated: "MIN", teamName: "Timberwolves"}
        return "Timberwolves";
    }
    else if(name === "Clev."){
        // return {abbreviated: "CLE", teamName: "Cavaliers"}
        return "Cavaliers";
    }
    else if(name === "Chi."){
        // return {abbreviated: "CHI", teamName: "Bulls"}
        return "Bulls";
    }
    else if(name === "S.A."){
        // return {abbreviated: "SA", teamName: "Spurs"}
        return "Spurs";
    }
    else if(name === "N.Y."){
        return "Knicks";
    }
    else if(name === "Det."){
        return "Pistons";
    }
    else if(name === "Bkn."){
        return "Nets";
    }
    else if(name === "Orl."){
        return "Magic";
    }
    else if(name === "Miami"){
        return "Heat";
    }
    else if(name === "Port."){
        return "Trail Blazers";
    }
    else if(name === "Cha."){
        return "Hornets";
    }
    else if(name === "Mem."){
        return "Grizzlies";
    }
}