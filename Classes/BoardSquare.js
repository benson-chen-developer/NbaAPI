export class BoardSquare {
    constructor(name, team1Progress, team1Goal, team2Progress, team2Goal) {
        this.name = name;

        this.team1Progress = team1Progress;
        this.team1Goal = team1Goal;
        this.team1Selected = false;
        this.team1Complete = false;

        this.team2Progress = team2Progress;
        this.team2Goal = team2Goal;
        this.team2Selected = false;
        this.team2Complete = false;
    }

}