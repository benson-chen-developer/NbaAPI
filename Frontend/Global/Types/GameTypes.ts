export type Game = {
    player1Id: string,
    player2Id: string,
    apiLink: string,
    player1Team: string,
    player2Team: string,
    homeTeam:string,
    awayTeam: string,
    player1LastActionNumber: number,
    player2LastActionNumber: number,
    matrix: any[],
    player1Depth: PlayerDepth[],
    player2Depth: PlayerDepth[],
    timeStart: string,
    ended: boolean,
    player1CheckedIn: boolean,
    player2CheckedIn: boolean,
    timeoutArray: TimeOut[],
    player1SelectedTiles: [number, number, number],
    player2SelectedTiles: [number, number, number],
    player1Sabotage: PlayerDepth,
    player2Sabotage: PlayerDepth,
}

export type UserDepthType = {
    name: string,
    PTS: number, 
    REB: number, 
    AST: number, 
    BLK: number, 
    STL: number, 
    "3PM": number, 
    "3PA": number,
    level: number
}

// export type SelectedTile = {
//     name: string,
//     goal: number,
//     progress: number,
//     swapTile: SelectedTile,
//     index: number,
//     row: number,
//     tileIndex: number,
//     team: string,
//     complete: boolean
// }

export type Tile = {
    team1: string,
    team2: string,
    row: number,
    index: number,
    tileIndex: number,
    team1Progress: number,
    team2Progress: number,
    team1Goal: number,
    team2Goal: number,
    team2Selected: boolean,
    team2Complete: boolean,
    team1Selected: boolean,
    team1Complete: boolean,
    name: string,
}

export type MatrixInfo = {
    popUpMode: string,
    navBar: 'board',
    isPlayer1: boolean
    gameId: string,
    pickedTile: {"name": string, "team1": number, "team1Progress": number, "team2":  number, "team2Progess": number}
    pickedPlayer: Player,
    selectedTiles: [number, number, number],
    oppSelectedTiles: [number, number, number],
    teamDepth: [Player],
    oppTeamDepth: [Player],
    teams: [string],
    allTiles: Tile[],
    lastActionNumber: number,
    isTimeOut: boolean
}

export type Player = {
    name: string,
    index: number,
    color: string,
    team: string,
    tiles: [{
        index: number, 
        row: number,
        tileIndex: number,
        progress: number
    }]
}

export type PlayerDepth = {
    name: string,
    level: number
}

export type TimeOut = {
    actionNumber: number,
    teams:{
        name: string, 
        players: {
            PTS: number, REB: number, AST: number,
            STL: number, BLK: number,
            "3PA": number, "3PM": number
        }[]
    }[],
    matrix: Tile[],
    player1SelectedTiles: [number, number, number],
    player2SelectedTiles: [number, number, number],
}