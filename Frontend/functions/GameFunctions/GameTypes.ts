import { Player } from "./TimeOut"

export type SelectedTile = {
    name: string,
    goal: number,
    progress: number,
    swapTile: SelectedTile,
    index: number,
    row: number,
    tileIndex: number,
    team: string,
    complete: boolean
}

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
    selectedTiles: [SelectedTile],
    oppSelectedTiles: [SelectedTile],
    teamDepth: [Player],
    oppTeamDepth: [Player],
    teams: [string],
    allTiles: [Tile],
    lastActionNumber: number,
    isTimeOut: boolean
}