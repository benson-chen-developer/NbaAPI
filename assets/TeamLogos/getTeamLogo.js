import Pistons from './Pistons.png';
import Rockets from './Rockets.png';
import Hornets from './Hornets.png';

export const getTeamLogo = (name) => {
    if(name === "Detroit Pistons"){
        return Pistons;
    } else if(name === "Houston Rockets"){
        return Rockets;
    } else if(name === "Charlotte Hornets"){
        return Hornets;
    }
}