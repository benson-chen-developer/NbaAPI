export type UserDate = {
    id: string,
    userId: string,
    mainTeam: string,
    maxLiveGames: number,
    name: string,
    xp: number,
    score: number,
    playersArray: [any],
}

export type PlayerData = {
    "PTS": number,
    "REB": number,
    "AST": number,
    "STL": number,
    "BLK": number,
    "FG": number,
    "FGA": number,
    "FG3": number,
    "FG3A": number, 
    "FT": number,
    "FTA": number,
    "Games Played": number
    "PF": number,
    "TO": number,
    "abbreviated": string,
    "name": string
}

export type PlayerLevels = {
    levels: {
        "bronze": {teamShards: number, allStarShards: number, hallOfFameShards: number},
        "silver": {teamShards: number, allStarShards: number, hallOfFameShards: number},
        "gold": {teamShards: number, allStarShards: number, hallOfFameShards: number},
        "diamond": {teamShards: number, allStarShards: number, hallOfFameShards: number}
    },
    currentLevel: string,
    currentTeamShards: number,
    currentAllStarShards: number,
    currentHallOfFameShards: number,
}