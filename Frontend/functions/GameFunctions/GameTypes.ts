import { SelectedTile } from "./PopUpFunctions/SwapFunc"
import { Player } from "./TimeOut"

export type Tile = {
    index: number,
    row: number,
    name: string,
    progress: number,
    goal: number,
    team: string,
    swapTile: [SwapTile]
}

export type SwapTile = {
    index: number,
    row: number
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