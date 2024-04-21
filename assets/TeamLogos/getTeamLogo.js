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
import Cavaliers from './Cavaliers.png';
import Knicks from './Knicks.png';
import Sixers from './Sixers.png';
import Pacers from './Pacers.png';
import Bulls from './Bulls.png';
import Hawks from './Hawks.png';
import Raptors from './Raptors.png';
import Wizards from './Wizards.png';
import allstar from './allstar.png';

export const getTeamLogo = (n) => {
    const name = n.toLowerCase();

    if(name === "pistons"){
        return Pistons;
    } else if(name === "rockets"){
        return Rockets;
    } else if(name === "hornets"){
        return Hornets;
    } else if(name === "nets"){
        return Nets;
    } else if(name === "celtics"){
        return Celtics;
    } else if(name === "hornets"){
        return Hornets;
    } else if(name === "thunder"){
        return Thunder;
    } else if(name === "magic"){
        return Magic;
    } else if(name === "bucks"){
        return Bucks;
    } else if(name === "heat"){
        return Heat;
    } else if(name === "suns"){
        return Suns;
    } else if(name === "kings"){
        return Kings;
    } else if(name === "timberwolves"){
        return Timberwolves;
    } else if(name === "magic"){
        return Magic;
    } else if(name === "trail Blazers"){
        return TrailBlazers;
    } else if(name === "lakers"){
        return Lakers;
    } else if(name === "cavaliers"){
        return Cavaliers;
    } else if(name === "knicks"){
        return Knicks;
    } else if(name === "76ers"){
        return Sixers;
    } else if(name === "pacers"){
        return Pacers;
    } else if(name === "bulls"){
        return Bulls;
    } else if(name === "hawks"){
        return Hawks;
    } else if(name === "raptors"){
        return Raptors;
    } else if(name === "wizards"){
        return Wizards;
    } 
    else if(name === "allstar"){
        return allstar;
    }
}

// `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${}.png&h=200&w=200`
export const abbreviateName = (name) => {
    const n = name.toLowerCase();

    if(n === "lakers")
        return "lal"
    else if(n === "spurs")
        return "sa"
    else if(n === "magic")
        return "orl"
    else if(n === "nets")
        return "bkn"
    else if(n === "cavaliers")
        return "cle"
    else if(n === "pacers")
        return "ind"
    else if(n === "mavericks")
        return "dal"
    else if(n === "boston" || "celtics")
        return "bos"
    else 
        return n;

}

export const abbreviateThreeLetterName = (name) => {
    const n = name.toLowerCase();

    if(n === "celtics")
      return "BOS"
    else 
        return "";

}

export const getTeamLogoCdn = (name) => {
    const n = name.toLowerCase();
    let abr;

    if(n === "lakers")
        abr =  "lal"
    else if(n === "spurs")
        abr = "sa"
    else if(n === "magic")
        abr = "orl"
    else if(n === "nets")
        abr = "bkn"
    else if(n === "cavaliers")
        abr = "cle"
    else if(n === "mavericks")
        abr = "dal"
    else if(n === "pacers")
        abr = "ind"
    else if(n === "pelicans")
        abr = "no"
    else 
        abr = "";

    return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abr}.png&h=200&w=200`;
}