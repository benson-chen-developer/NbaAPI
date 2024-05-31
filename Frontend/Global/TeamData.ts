import { PlayerData } from "./Types/DataTypes"

export type TeamData = {
    name: string,
    players: PlayerData,
    abbreviated: string,
    mainColor: string,
    secondColor: string,
    textColor: string,
    imgUrl: string,
    city: string
}