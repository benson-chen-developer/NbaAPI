import AlperenSengun from './AlperenSengun.png';
import MilesBridges from './MilesBridges.png';
import JalenGreen from './JalenGreen.png';
import BrandonMiller from './BrandonMiller.png';

export const getPlayerHeadShot = (name) => {
    if(name === "Alperen Sengun") return AlperenSengun;
    else if(name === "Miles Bridges") return MilesBridges;
    else if(name === "Jalen Green") return JalenGreen;
    else if(name === "Brandon Miller") return BrandonMiller;
}