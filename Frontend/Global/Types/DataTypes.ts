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