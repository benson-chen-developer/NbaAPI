export const updateTiles = (allTiles, teamsGainedStats) => {
    allTiles.forEach((tile, index) => {
        if(tile.team1Selected){
            allTiles[index] = updateTile(tile, teamsGainedStats, 0);
        }
        if(tile.team2Selected){
            allTiles[index] = updateTile(tile, teamsGainedStats, 1);
        }
    });

    return allTiles;
}

const updateTile = (tile, teamsGainedStats, teamIndex) => {
    const currentTeamGainedStats = teamsGainedStats[teamIndex];
    const stats = ["REB", "AST", "3PA", "3PM", "FGA", "FGM", "FTA", "FTM", "STL", "BLK"];
    const tileNameArr = tile.name.split("+");

    let newTile = tile;

    stats.forEach(stat => {
        if(currentTeamGainedStats[stat] > 0 && tileNameArr.find(tileStat => tileStat === stat)){
            // console.log("Tile", tile, "has gained ", currentTeamGainedStats[stat], stat);

            if(teamIndex === 0){
                newTile = {...newTile, team1Progress: newTile.team1Progress + currentTeamGainedStats[stat] };
            } else {
                newTile = {...newTile, team2Progress: newTile.team2Progress + currentTeamGainedStats[stat] };
            }         
        }
    })

    return newTile;
}