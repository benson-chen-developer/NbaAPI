/*
    Put a name here and I will tell you if this player actually plays and should be card
*/
export const IsAnActualPlayers = (name) => {
    // console.log(name)

    // Celtics
    if(name === "Jrue Holiday") return true;
    else if(name === "Jrue Holiday") return true;
    else if(name === "Derrick White") return true;
    else if(name === "Jaylen Brown") return true;
    else if(name === "Payton Pritchard") return true;
    else if(name === "Jayson Tatum") return true;
    else if(name === "Sam Hauser") return true;
    else if(name === "Kristaps Porzingis") return true;
    else if(name === "Al Hortford") return true;

    // Cavaliers
    else if(name === "Darius Garland") return true;
    else if(name === "Donovan Mitchell") return true;
    else if(name === "Max Strus") return true;
    else if(name === "Evan Mobley") return true;
    else if(name === "Jarrett Allen") return true;
    else if(name === "Caris LeVert") return true;

    else return false;
}