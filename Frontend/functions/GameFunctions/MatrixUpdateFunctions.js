export const updateTiles = (allTiles, teamsGainedStats, isPlayer1) => {
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
        if(newTile.team1Complete || newTile.team2Complete){

        } else {
            if(currentTeamGainedStats[stat] > 0 && tileNameArr.find(tileStat => tileStat === stat)){
                // console.log("Tile", tile, "has gained ", currentTeamGainedStats[stat], stat);
                const newTeam1Complete = newTile.team1Progress + currentTeamGainedStats[stat] >= tile.team1Goal;
                const newTeam2Complete = newTile.team2Progress + currentTeamGainedStats[stat] >= tile.team2Goal;
    
                if(teamIndex === 0){
                    newTile = {
                        ...newTile, 
                        team1Progress: newTile.team1Progress + currentTeamGainedStats[stat],
                        team1Complete: newTeam1Complete
                    };
                } else {
                    newTile = {
                        ...newTile, 
                        team2Progress: newTile.team2Progress + currentTeamGainedStats[stat],
                        team2Complete: newTeam2Complete 
                    };
                }
            }
        }
    })

    return newTile;
}