export class InGamePlayer {
    constructor(name, PTS, REB, AST, BLK, STL, ThreePM, ThreePA) {
        this.name = name;
        this.PTS = PTS;
        this.REB = REB;
        this.AST = AST;
        this.BLK = BLK;
        this.STL = STL;
        this.ThreePM = ThreePM;
        this.ThreePA = ThreePA;

        this.availableStats = {}
        PTS;
        this.REBAvailable = REB;
        this.ASTAvailable = AST;
        this.BLKAvailable = BLK;
        this.STLAvailable = STL;
        this.ThreePMAvailable = ThreePM;
        this.ThreePAAvailable = ThreePA;
    }

    addStat(statName, statAmount) {
        if (statName === "PTS") {
            this.PTS += statAmount;
            this.PTSAvailable += statAmount;
        } else if (statName === "REB") {
            this.REB += statAmount;
            this.REBAvailable += statAmount;
        } else if (statName === "AST") {
            this.AST += statAmount;
            this.ASTAvailable += statAmount;
        } else if (statName === "BLK") {
            this.BLK += statAmount;
            this.BLKAvailable += statAmount;
        } else if (statName === "STL") {
            this.STL += statAmount;
            this.STLAvailable += statAmount;
        } else if (statName === "3PM") {
            this.ThreePM += statAmount;
            this.ThreePMAvailable += statAmount;
        } else if (statName === "3PA") {
            this.ThreePA += statAmount;
            this.ThreePAAvailable += statAmount;
        }
    }

    useStat(statName, statAmount){
        if (statName === "PTS") {
            this.PTSAvailable -= statAmount;
        } else if (statName === "REB") {
            this.REBAvailable -= statAmount;
        } else if (statName === "AST") {
            this.ASTAvailable -= statAmount;
        } else if (statName === "BLK") {
            this.BLKAvailable -= statAmount;
        } else if (statName === "STL") {
            this.STLAvailable -= statAmount;
        } else if (statName === "3PM") {
            this.ThreePMAvailable -= statAmount;
        } else if (statName === "3PA") {
            this.ThreePAAvailable -= statAmount;
        }
    }
}