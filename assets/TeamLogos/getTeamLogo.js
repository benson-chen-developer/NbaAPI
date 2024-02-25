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

import teamsData from './logos.json';

export const getTeamLogo = (name) => {
    if(name === "Pistons"){
        return Pistons;
    } else if(name === "Rockets"){
        return Rockets;
    } else if(name === "Hornets"){
        return Hornets;
    } else if(name === "Nets"){
        return Nets;
    } else if(name === "Celtics"){
        return Celtics;
    } else if(name === "Hornets"){
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
    } else if(name === "Cavaliers"){
        return Cavaliers;
    } else if(name === "Knicks"){
        return Knicks;
    } else if(name === "76ers"){
        return Sixers;
    } else if(name === "Pacers"){
        return Pacers;
    } else if(name === "Bulls"){
        return Bulls;
    } else if(name === "Hawks"){
        return Hawks;
    } else if(name === "Raptors"){
        return Raptors;
    } else if(name === "Wizards"){
        return Wizards;
    }
}

// export const getTeamLogoCdn = (nameAbbreviated) => {
//     const teams = [
//         "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/orl.png&h=200&w=200",
//         "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&h=200&w=200",
//         "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sa.png&h=200&w=200"
//     ]

//     const matchingLogo = teams.find(url => {
//         const startIndex = url.indexOf('/500/') + '/500/'.length;
//         const endIndex = url.indexOf('.png');
//         const teamAbbreviation = url.substring(startIndex, endIndex);
//         return teamAbbreviation === nameAbbreviated.toLowerCase();
//     });

//     console.log("getTeamLogo", matchingLogo);

//     return matchingLogo;
// }

export const abbreviateName = (name) => {
    const n = name.toLowerCase();

    if(n === "lakers")
        return "lal"
    else if(n === "spurs")
        return "sa"
    else 
        return "";
}