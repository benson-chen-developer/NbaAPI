/*
    These should be the types that the AWS Object returns
*/

export type User = {
    id: string,
    email: string
    score: number,
    userId: string,
    name: string,
    xp: number,
    maxLiveGames: number,
    mainTeam: string,
    coins: number,
    wins: number,
    loss: number,
    playersArray: {name: string, level: number}[],
}

export type TeamData = {
    id: string,
    name: string,
    players: any[]
    abbreviated: string
    mainColor: string
    secondColor: string
    textColor: string
    imgUrl: string
    city: string
}