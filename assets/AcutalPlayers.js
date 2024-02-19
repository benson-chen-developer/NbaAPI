/*
    Put a name here and I will tell you if this player actually plays and should be card
*/
export const IsAnActualPlayers = (name) => {
    // console.log(name)

    // Celtics
    if(name === "Jrue Holiday") return true;
    else if(name === "Derrick White") return true;
    else if(name === "Jaylen Brown") return true;
    // else if(name === "Payton Pritchard") return true;
    else if(name === "Jayson Tatum") return true;
    // else if(name === "Sam Hauser") return true;
    else if(name === "Kristaps Porzingis") return true;
    else if(name === "Al Hortford") return true;

    // Cavaliers
    else if(name === "Darius Garland") return true;
    else if(name === "Donovan Mitchell") return true;
    else if(name === "Max Strus") return true;
    else if(name === "Evan Mobley") return true;
    else if(name === "Jarrett Allen") return true;
    else if(name === "Caris LeVert") return true;

    // Bucks
    else if(name === "Damian Lillard") return true;
    else if(name === "Malik Beasly") return true;
    else if(name === "Khris Middleton") return true;
    else if(name === "Giannis Antetokounmpo") return true;
    else if(name === "Brook Lopez") return true;
    else if(name === "Bobby Portis") return true;

    //Knicks
    else if(name === "Jalen Brunson") return true;
    else if(name === "Donte DiVincenzo") return true;
    else if(name === "Josh Hart") return true;
    else if(name === "OG Anunoby") return true;
    else if(name === "Isaiah Hartenstein") return true;
    else if(name === "Bojan Bogdanovic") return true;
    else if(name === "Alec Burks") return true;

    //76ers
    else if(name === "Tyrese Maxey") return true;
    else if(name === "Tobias Harris") return true;
    else if(name === "Paul Reed") return true;
    else if(name === "Joel Embid") return true;
    else if(name === "Kelly Oubre Jr.") return true;
    else if(name === "De'Anthony Melton") return true;
    else if(name === "Buddy Hield") return true;

    //Pacers
    else if(name === "Tyrese Haliburton") return true;
    else if(name === "Andrew Nembhard") return true;
    else if(name === "Aaron Nesmith") return true;
    else if(name === "Pascal Siakam") return true;
    else if(name === "Myles Turner") return true;
    else if(name === "Bennedict Mathurin") return true;
    else if(name === "Obi Toppin") return true;
    else if(name === "Jalen Smith") return true;

    //Heat
    else if(name === "Terry Rozier") return true;
    else if(name === "Tyler Herro") return true;
    else if(name === "Jimmy Butler") return true;
    else if(name === "Caleb Martin") return true;
    else if(name === "Bam Adebayo") return true;
    else if(name === "Duncan Robinson") return true;
    else if(name === "Jaime Jaquez Jr.") return true;
    else if(name === "Kevin Love") return true;
    else if(name === "Josh Richardson") return true;

    //Magic
    else if(name === "Markelle Fultz") return true;
    else if(name === "Jalen Suggs") return true;
    else if(name === "Franz Wagner") return true;
    else if(name === "Paolo Banchero") return true;
    else if(name === "Wendell Carter Jr.") return true;
    else if(name === "Cole Anthony") return true;
    else if(name === "Moritz Wagner") return true;

    //Bulls
    else if(name === "Coby White") return true;
    else if(name === "Alex Caruso") return true;
    else if(name === "DeMar DeRozan") return true;
    else if(name === "Nikola Vucevic") return true;
    else if(name === "Patrixk Williams") return true;
    else if(name === "Ayo Dosunmu") return true;
    else if(name === "Andre Drummond") return true;

    //Hawks
    else if(name === "Trae Young") return true;
    else if(name === "Dejounte Murray") return true;
    else if(name === "Saddiq Bey") return true;
    else if(name === "Jalen Johnson") return true;
    else if(name === "Clint Capela") return true;
    else if(name === "Bogdan Bogdanovic") return true;
    else if(name === "De'Andre Hunter") return true;
    else if(name === "Onyeka Okongwu") return true;

    //Nets
    else if(name === "Ben Simmons") return true;
    else if(name === "Cam Thomas") return true;
    else if(name === "Mikal Bridges") return true;
    else if(name === "Cameron Johnson") return true;
    else if(name === "Nic Claxton") return true;
    else if(name === "Dennis Schroder") return true;
    else if(name === "Dorian Finney-Smith") return true;
    else if(name === "Day'Ron Sharpe") return true;

    //Raptors
    else if(name === "Immanuel Quickley") return true;
    else if(name === "Gary Trent Jr.") return true;
    else if(name === "RJ Barrett") return true;
    else if(name === "Scottie Barnes") return true;
    else if(name === "Bruce Brown") return true;
    else if(name === "Jakob Poeltl") return true;
    else if(name === "Kelly Olynyk") return true;

    //Hornets
    else if(name === "LaMelo Ball") return true;
    else if(name === "Cody Martin") return true;
    else if(name === "Brandon Miller") return true;
    else if(name === "Miles Bridges") return true;
    else if(name === "Nick Richards") return true;
    else if(name === "Kelly Olynyk") return true;
    else if(name === "Tre Mann") return true;
    else if(name === "Grant Williams") return true;

    //Wizards
    else if(name === "Tyus Jones") return true;
    else if(name === "Jordan Poole") return true;
    else if(name === "Deni Avdija") return true;
    else if(name === "Kyle Kuzma") return true;
    else if(name === "Marvin Bagley III") return true;
    else if(name === "Corey Kispert") return true;
    else if(name === "Bilal Coulibaly") return true;

    //Pistons
    else if(name === "Cade Cunningham") return true;
    else if(name === "Jaden Ivy") return true;
    else if(name === "Simone Fontecchio") return true;
    else if(name === "Isaiah Stewart") return true;
    else if(name === "Jalen Duren") return true;
    else if(name === "Ausar Thompson") return true;
    else if(name === "James Wiseman") return true;
    else if(name === "Marcus Sasser") return true;

    //Timberwolves
    else if(name === "Mike Conley") return true;
    else if(name === "Anthony Edwards") return true;
    else if(name === "Jaden McDaniels") return true;
    else if(name === "Karl-Anthony Towns") return true;
    else if(name === "Rudy Gobert") return true;
    else if(name === "Naz Reid") return true;
    else if(name === "Kyle Anderson") return true;
    else if(name === "Nickeil Alexander-Walker") return true;

    //Thunder
    else if(name === "Shai Gilgeous-Alexander") return true;
    else if(name === "Josh Giddey") return true;
    else if(name === "Luguentz Dort") return true;
    else if(name === "Jalen Williams") return true;
    else if(name === "Chet Holmgren") return true;
    else if(name === "Gordan Hayward") return true;
    else if(name === "Carson Wallace") return true;

    //Clippers
    else if(name === "James Harden") return true;
    else if(name === "Terance Mann") return true;
    else if(name === "Paul George") return true;
    else if(name === "Kawhi Leonard") return true;
    else if(name === "Ivica Zubac") return true;
    else if(name === "Russel Westbrook") return true;
    else if(name === "Mason Plumlee") return true;
    else if(name === "Norman Powell") return true;

    //Nuggets
    else if(name === "Jamal Murray") return true;
    else if(name === "Kentavious Caldwell-Pope") return true;
    else if(name === "Micheal Porter Jr.") return true;
    else if(name === "Aaron Gordon") return true;
    else if(name === "Nikola Jokic") return true;
    else if(name === "Reggie Jackson") return true;
    else if(name === "Christian Braun") return true;

    //Suns
    else if(name === "Devin Booker") return true;
    else if(name === "Bradley Beal") return true;
    else if(name === "Grayson Allen") return true;
    else if(name === "Kevin Durant") return true;
    else if(name === "Jusuf Nurkic") return true;
    else if(name === "Eric Gordon") return true;
    else if(name === "Royce O'Neale") return true;
    else if(name === "Drew Eubanks") return true;

    //Pelicans
    else if(name === "CJ McCollum") return true;
    else if(name === "Brandon Ingram") return true;
    else if(name === "Herbert Jones") return true;
    else if(name === "Zion Williamson") return true;
    else if(name === "Jonas Valanciunas") return true;
    else if(name === "Jordan Hawkins") return true;
    else if(name === "Trey Murphy III") return true;

    //Mavericks
    else if(name === "Luka Doncic") return true;
    else if(name === "Kyrie Irving") return true;
    else if(name === "Josh Green") return true;
    else if(name === "P.J. Washington") return true;
    else if(name === "Dereck Lively II") return true;
    else if(name === "Tim Hardaway Jr.") return true;
    else if(name === "Daniel Gafford") return true;
    else if(name === "Dante Exum") return true;
    else if(name === "Derrick Jones Jr.") return true;

    //Kings
    else if(name === "De'Aaron Fox") return true;
    else if(name === "Kevin Huerter") return true;
    else if(name === "Harrison Barnes") return true;
    else if(name === "Keegan Murray") return true;
    else if(name === "Domantas Sabonis") return true;
    else if(name === "Malik Monk") return true;
    else if(name === "Trey Lyles") return true;

    //Lakers
    else if(name === "D'Angelo Russel") return true;
    else if(name === "Austin Reaves") return true;
    else if(name === "LeBron James") return true;
    else if(name === "Rui Hachimura") return true;
    else if(name === "Anthony Davis") return true;
    else if(name === "Spencer Dinwiddie") return true;
    else if(name === "Taurean Prince") return true;

    //Warriors
    else if(name === "Stephen Curry") return true;
    else if(name === "Brandin Podziemski") return true;
    else if(name === "Andrew Wiggins") return true;
    else if(name === "Jonathan Kuminga") return true;
    else if(name === "Draymond Green") return true;
    else if(name === "Klay Thompson") return true;
    else if(name === "Dario Saric") return true;
    else if(name === "Kevin Looney") return true;

    //Jazz
    else if(name === "Keyonte George") return true;
    else if(name === "Collin Sexton") return true;
    else if(name === "Lauri Markkanen") return true;
    else if(name === "John Collins") return true;
    else if(name === "Walker Kessler") return true;
    else if(name === "Jordan Clarkson") return true;
    else if(name === "Kris Dunn") return true;

    //Rockets
    else if(name === "Fred VanVleet") return true;
    else if(name === "Jalen Green") return true;
    else if(name === "Dillon Brooks") return true;
    else if(name === "Jabari Smith Jr.") return true;
    else if(name === "Alperen Sengun") return true;
    else if(name === "Amen Thompson") return true;
    else if(name === "Aaron Holiday") return true;
    else if(name === "Cam Whitmore") return true;
    else if(name === "Tari Eason") return true;

    //Grizzlies
    else if(name === "Marcus Smart") return true;
    else if(name === "Vince Williams Jr.") return true;
    else if(name === "John Konchar") return true;
    else if(name === "Santi Aldama") return true;
    else if(name === "Jaren Jackson Jr,") return true;
    else if(name === "Ziaire Williams") return true;
    else if(name === "Ja Morant") return true;
    else if(name === "Desmond Bane") return true;
    else if(name === "Derrick Rose") return true;

    //Trail Blazers
    else if(name === "Scoot Henderson") return true;
    else if(name === "Anfernee Simons") return true;
    else if(name === "Jerami Grant") return true;
    else if(name === "Jabari Walker") return true;
    else if(name === "Deandre Ayton") return true;
    else if(name === "Malcolm Brogdon") return true;
    else if(name === "Tourmani Camara") return true;
    else if(name === "Duop Reath") return true;

    //Spurs
    else if(name === "Tre Jones") return true;
    else if(name === "Devin Vassell") return true;
    else if(name === "Julian Champagnie") return true;
    else if(name === "Jeremy Sochan") return true;
    else if(name === "Victor Wembanyama") return true;
    else if(name === "Zach Collins") return true;
    else if(name === "Keldon Johnson") return true;

    else return false;
}