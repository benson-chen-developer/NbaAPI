import { useEffect, useState } from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { getTeamLogo } from "../../../../assets/TeamLogos/getTeamLogo"
import { ThemeFonts } from "../../../../assets/Themes/ThemeFont";
import { FontAwesome } from '@expo/vector-icons';

export const TeamPickerPopUp = ({currentTeam, setCurrentTeam, setPopUp}) => {

    const [coastTeams, setCoastTeams] = useState([]);
    const [displayedTeams, setDisplayedTeams] = useState([]);

    const westTeams = [
        {name: 'Timberwolves', abbreviated: "MIN"},
        {name: 'Thunder', abbreviated: "OKC"},
        {name: 'Clippers', abbreviated: "LAC"},
        {name: 'Nuggets', abbreviated: "DEN"},
        {name: 'Suns', abbreviated: "PHO"},
        {name: 'Pelicans', abbreviated: "NO"},
        {name: 'Mavericks', abbreviated: "DAL"},
        {name: 'Kings', abbreviated: "SAC"},
        {name: 'Lakers', abbreviated: "LAL"},
        {name: 'Warriors', abbreviated: "GS"},
        {name: 'Jazz', abbreviated: "UTA"},
        {name: 'Rockets', abbreviated: "HOU"},
        {name: 'Grizzlies', abbreviated: "MEM"},
        {name: 'Trail Blazers', abbreviated: "POR"},
        {name: 'Spurs', abbreviated: "SA"},
        {name: 'empty', abbreviated: "DET"},
    ]
    const eastTeams = [
        {name: 'Celtics', abbreviated: "BOS"},
        {name: 'Cavaliers', abbreviated: "CLE"},
        {name: 'Bucks', abbreviated: "MIL"},
        {name: 'Knicks', abbreviated: "NY"},
        {name: '76ers', abbreviated: "PHI"},
        {name: 'Pacers', abbreviated: "IND"},
        {name: 'Heat', abbreviated: "MIA"},
        {name: 'Magic', abbreviated: "ORL"},
        {name: 'Bulls', abbreviated: "CHI"},
        {name: 'Hawks', abbreviated: "ATL"},
        {name: 'Nets', abbreviated: "BRK"},
        {name: 'Raptors', abbreviated: "TOR"},
        {name: 'Hornets', abbreviated: "CHA"},
        {name: 'Wizards', abbreviated: "WAS"},
        {name: 'Pistons', abbreviated: "DET"},
        {name: 'empty', abbreviated: "DET"},
    ]

    useEffect(() => {
        setCoastTeams(eastTeams)
    }, [])

    return(
        <>
        
        {/* First Row */}
        <View style={{width:"90%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', height:"100%", alignItems:'center'}}>
                <View style={{width:70, height:70, justifyContent:'center', alignItems:'center', backgroundColor: "#162438", borderRadius: 5}}>
                    <View style={{
                        width:70, height:70, justifyContent:'center', alignItems:'center',
                        position:'absolute', top: -4, left:-4, backgroundColor: "#283f60", borderRadius:5
                    }}>
                        <Image source={getTeamLogo(currentTeam.name)} style={{width:50, height:50}}/>
                    </View>
                </View>
                <Text style={{fontFamily: 'Roboto-BlackItalic', fontSize: 30, marginLeft: 15}}>
                    {currentTeam.name.toUpperCase()}
                </Text>
            </View>
            <View style={{height: "100%", alignItems:'flex-start'}}>
                <TouchableOpacity onPress={() => setPopUp("")}>
                    <FontAwesome name="close" size={35} color="black" />
                </TouchableOpacity>
            </View>
        </View>

        {/* Second Row (Btns) */}
        <View style={{width:"100%", marginTop:20, marginLeft:25, flexDirection:'row'}}>
            <TouchableOpacity 
                style={{width:100, height:50, backgroundColor:'red'}}
                onPress={() => setCoastTeams(eastTeams)}
            >
                <Text>East</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{width:100, height:50, backgroundColor:'red', marginLeft: 20}}
                onPress={() => setCoastTeams(westTeams)}
            >
                <Text>West</Text>
            </TouchableOpacity>
        </View>

        {/* Third Row (Grid) */}
        <View style={{width:"100%", marginTop:20, alignItems:'center'}}>
            <View style={{width:"90%", flexDirection:'row', justifyContent:'space-between'}}>
                {coastTeams.slice(0, 4).map((team, index) => 
                    <TeamSquare 
                        key={index} team={team} setPopUp={setPopUp}
                        setCurrentTeam={setCurrentTeam}
                    />
                )}
            </View>
        </View>
        <View style={{width:"100%", marginTop:20, alignItems:'center'}}>
            <View style={{width:"90%", flexDirection:'row', justifyContent:'space-between'}}>
                {coastTeams.slice(4, 8).map((team, index) => 
                    <TeamSquare 
                        key={index} team={team} setPopUp={setPopUp}
                        setCurrentTeam={setCurrentTeam}
                    />
                )}
            </View>
        </View>
        <View style={{width:"100%", marginTop:20, alignItems:'center'}}>
            <View style={{width:"90%", flexDirection:'row', justifyContent:'space-between'}}>
                {coastTeams.slice(8, 12).map((team, index) => 
                    <TeamSquare 
                        key={index} team={team} setPopUp={setPopUp}
                        setCurrentTeam={setCurrentTeam}
                    />
                )}
            </View>
        </View>
        <View style={{width:"100%", marginTop:20, alignItems:'center'}}>
            <View style={{width:"90%", flexDirection:'row', justifyContent:'space-between'}}>
                {coastTeams.slice(12, 16).map((team, index) => 
                    <TeamSquare 
                        key={index} team={team} setPopUp={setPopUp}
                        setCurrentTeam={setCurrentTeam}
                    />
                )}
            </View>
        </View>
        
        </>
    )
}

const TeamSquare = ({team, setCurrentTeam, setPopUp}) => {
    if(team.name === "empty"){
        return(
            <View style={{
                width:70, height:70, justifyContent:'center', alignItems:'center',
                backgroundColor: "white", borderRadius: 5
            }} />
        )
    }

    return(
        <TouchableOpacity style={{
            width:70, height:70, justifyContent:'center', alignItems:'center',
            backgroundColor: "#162438", borderRadius: 5
            // backgroundColor: "#283f60", borderRadius:5
        }} onPress={() => {
            setCurrentTeam(team);
            setPopUp("");
        }}>
            <View style={{
                width:70, height:70, justifyContent:'center', alignItems:'center',
                position:'absolute', top: -4, left:-4,
                // backgroundColor: "#162438", borderRadius: 5
                backgroundColor: "#283f60", borderRadius:5
            }}>
                <Image source={getTeamLogo(team.name)} style={{width:50, height:50}}/>
            </View>
        </TouchableOpacity>
    )
}