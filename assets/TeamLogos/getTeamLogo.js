import Pistons from './Pistons.png';
import Rockets from './Rockets.png';
import Hornets from './Hornets.png';
import Nets from './Nets.png';
import Celtics from './Celtics.png';
import Thunder from './Thunder.png';
import Magic from './Magic.png';
import Heat from './Heat.png';
import Bucks from './Bucks.png';
import Suns from './Suns.png';
import Kings from './Kings.png';
import Timberwolves from './Timberwolves.png';
import TrailBlazers from './Trailblazers.png';
import Lakers from './Lakers.png';

export const getTeamLogo = (name) => {
    if(name === "Pistons"){
        return Pistons;
    } else if(name === "Houston Rockets"){
        return Rockets;
    } else if(name === "Charlotte Hornets"){
        return Hornets;
    } else if(name === "Nets"){
        return Nets;
    } else if(name === "Celtics"){
        return Celtics;
    } else if(name === "Charlotte Hornets"){
        return Hornets;
    } else if(name === "Thunder"){
        return Thunder;
    } else if(name === "Magic"){
        return Magic;
    } else if(name === "Bucks"){
        return Bucks;
    } else if(name === "Heat"){
        return Heat;
    } else if(name === "Suns"){
        return Suns;
    } else if(name === "Kings"){
        return Kings;
    } else if(name === "Timberwolves"){
        return Timberwolves;
    } else if(name === "Magic"){
        return Magic;
    } else if(name === "Trail Blazers"){
        return TrailBlazers;
    } else if(name === "Lakers"){
        return Lakers;
    }
}