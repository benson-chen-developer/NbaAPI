export type PlayerStats = {
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
    "name": string,
    "picId": string,
    "lastFive": {"PTS": number, "REB": number, "AST":number, "STL":number, "BLK": number, "team": string, date: string, "TO": number, "PF": number}[]
}

export type PlayerExtra = {
    name: string
    picId: string,
    level: number,
    team: string,
    backgroundColor: string
}