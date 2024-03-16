import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useMyContext } from "../../../Context/MyContext";
import { TeamDepthPlayerCard } from "./TeamDepthPlayerCard";
import { TeamDepthCarousel } from "./TeamDepthCarousel";
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';

export const TeamDepthPopUp = ({popUpInfo, setPopUpInfo, allPlayers}) => {

    const {teamDepthObjArray} = useMyContext();

    const teamDepth = teamDepthObjArray.find(teamObj => teamObj.name === popUpInfo.teamDepth.name);

    return(
        <>
                
            {/* First Row */}
            <View style={{width:"90%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{height: "100%", alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={() => setPopUpInfo(p => ({ ...p, popUpScreen: "Player" }))}>
                        <MaterialIcons name="backspace" size={32} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{height: "100%", alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={() => setPopUpInfo(p => ({ ...p, popUpScreen: "" }))}>
                        <FontAwesome name="close" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <AddPlayer teamDepth={teamDepth} pickedName={popUpInfo.player.name} setPopUpInfo={setPopUpInfo}/>

        </>
    )
}

const AddPlayer = ({teamDepth, pickedName, setPopUpInfo}) => {
    const [stats, setStats] = useState([
        {name: "PTS", selected: false}, 
        {name: "REB", selected: false}, 
        {name: "AST", selected: false}, 
        {name: "BLK", selected: false}, 
        {name: "STL", selected: false}, 
    ]);

    return(
        <View style={{width:"100%", height:"100%", alignItems:'center'}}>

            <TeamDepthCarousel stats={stats} setStats={setStats}/>

            <View style={{width:"90%", marginBottom:20, marginTop:10}}>
                <TeamDepthPlayerCard teamName={teamDepth.name} playerName={pickedName} pickedName={pickedName} setPopUpInfo={setPopUpInfo}/>
            </View>

            <View style={{width:"100%", justifyContent:'space-evenly', flexDirection:'row'}}>
                {teamDepth.teamDepth.slice(0, 3).map((player, index) => (
                    <TeamDepthPlayerCard key={index} teamName={teamDepth.name} playerName={player} pickedName={pickedName} setPopUpInfo={setPopUpInfo}/>
                ))}
            </View>

            <View style={{width:"100%", justifyContent:'space-evenly', flexDirection:'row', marginTop:20}}>
                {teamDepth.teamDepth.slice(3, 5).map((player, index) => (
                    <TeamDepthPlayerCard key={index} teamName={teamDepth.name} playerName={player} pickedName={pickedName} setPopUpInfo={setPopUpInfo}/>
                ))}
            </View>

        </View>
    )
}