import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native"
import { ThemeFonts } from "../../assets/Themes/ThemeFont";
import { getPlayerHeadShot } from "../../assets/PlayerHeadshots/getPlayerHeadShot";
import {useMyContext} from '../Context/MyContext'
import { TeamDepthStatBtns } from "./TeamDepthStatBtns";
import { TeamDepthBench } from "./TeamDepthBench";
import { TeamDepthStarters } from "./TeamDepthStarters";
import { TeamDepthPickedPlayer } from "./TeamDepthPickedPlayer";
import { setPlayerTeamDepth } from "../functions/UserFunctions";

export const TeamDepth = ({ route }) => {

    const { currentPlayer, prevScreen } = route.params;
    const {user, playerStats} = useMyContext();

    const [selectedStat, setSelectedStat] = useState("PTS");
    const [teamDepth, setTeamDepth] = useState([]);

    useEffect(() => {
        let ret = [];
        user.teamDepth.forEach(i => {
            // console.log("Teamdept",  JSON.parse(i))
            if(JSON.parse(i).abbreviated === "BOS"){
                ret.push(JSON.parse(i))
            }
        })

        setTeamDepth(ret);
    }, [])

    // useEffect(() => {
    //     console.log("Teamdept",  teamDepth)
    //     // console.log("Teamdept", JSON.stringify(playerStats.filter(player => player.abbreviated === 'BOS'), null, 2));
    // }, [teamDepth])
    
    if(teamDepth.length > 0)
    return(
        <View style={{flex:1, height:"100%", width:"100%"}}>
            <View style={{flex:1, height:40, width:"100%", alignItems:'center'}}>
                <Text>Celtics</Text>
            </View>

            <TeamDepthPickedPlayer 
                player={currentPlayer} selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />

            <TeamDepthStarters currentPlayer={currentPlayer} players={teamDepth.slice(0, 3)} selectedStat={selectedStat}/>

            <TeamDepthBench players={teamDepth.slice(3, 5)} selectedStat={selectedStat}/>
        </View>
    )
}

export const TeamDepthPlayerCard = ({player, currentPlayer}) => {
    const {user} = useMyContext();
    const firstName = player.name.split(' ')[0];
    const lastName = player.name.split(' ')[1];

    return(
        <TouchableOpacity style={{
            height:130, width: "30%", backgroundColor:'#515482', borderRadius:10,
            justifyContent:'center', alignItems:'center'
        }} onPress={() => {
            setPlayerTeamDepth(player, currentPlayer, user);
        }}>
            {player.name === "" ?
                <Text style={{fontFamily:ThemeFonts, fontSize:24, color:'white'}}>
                    Empty
                </Text>
                    :
                <View style={{
                    width:"100%", height:"100%", alignItems:'center', justifyContent:'center'
                }}>
                    <Image source={getPlayerHeadShot("Jalen Green")} style={{
                        height:70, width:70
                    }}/>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <Text style={{fontFamily:ThemeFonts, fontSize:15, color:'white', marginRight:3}}>
                            {firstName[0]}. 
                        </Text>
                        <Text style={{fontFamily: ThemeFonts, fontSize: 15, color: 'white'}}>
                            {lastName.length > 10 ? `${lastName.substring(0, 10)}.` : lastName}
                        </Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}