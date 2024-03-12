import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useMyContext } from "../../../Context/MyContext";
import { TeamDepthPlayerCard } from "./TeamDepthPlayerCard";
import { TeamDepthCarousel } from "./TeamDepthCarousel";
import { useState } from "react";

export const TeamDepthPopUp = ({popUpInfo, setPopUpInfo}) => {
    const {teamDepth} = popUpInfo;

    return(
        <>
                
            {/* First Row */}
            <View style={{width:"90%", marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{height: "100%", alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={() => setPopUpInfo(p => ({ ...p, popUpScreen: "Player" }))}>
                        <FontAwesome name="close" size={35} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{height: "100%", alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={() => setPopUpInfo(p => ({ ...p, popUpScreen: "" }))}>
                        <FontAwesome name="close" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {popUpInfo.player.depthPosition != -1 ?
                <AddPlayer teamDepth={teamDepth} setPopUpInfo={setPopUpInfo}/>
                    :
                <SwapPlayer teamDepth={teamDepth}/>
            }

        </>
    )
}

const SwapPlayer = () => {
    return(
        <View>
            <Text>hs</Text>
        </View>
    )
}

const AddPlayer = ({teamDepth, setPopUpInfo}) => {
    console.log("addplayer", teamDepth)

    const {setTeamDepthObjArray} = useMyContext();
    const [stats, setStats] = useState([
        {name: "PTS", selected: false}, 
        {name: "REB", selected: false}, 
        {name: "AST", selected: false}, 
        {name: "BLK", selected: false}, 
        {name: "STL", selected: false}, 
    ]);

    const onPress = (chosenIndex, newName) => {
        setTeamDepthObjArray(prevArray => 
            prevArray.map(p => {
                if (p.name === "Celtics") {
                    const updatedTeamDepth = p.teamDepth.map((name, index) =>
                        index === chosenIndex ? "New Name" : newName
                    );
                    return { ...p, teamDepth: updatedTeamDepth };
                }
                return p;
            })
        );

        setPopUpInfo(p => ({ ...p, popUpScreen: "" }));
    };

    return(
        <View style={{width:"100%", height:"100%", alignItems:'center'}}>

            <TeamDepthCarousel stats={stats} setStats={setStats}/>

            <View style={{width:"90%", marginBottom:20, marginTop:10}}>
                <TeamDepthPlayerCard func={null} />
            </View>

            <View style={{width:"100%", justifyContent:'space-evenly', flexDirection:'row'}}>
                {teamDepth.teamDepth.slice(0, 3).map((item, index) => (
                    <TeamDepthPlayerCard key={index} item={item} func={onPress} />
                ))}
            </View>

            <View style={{width:"100%", justifyContent:'space-evenly', flexDirection:'row', marginTop:20}}>
                {teamDepth.teamDepth.slice(3, 5).map((item, index) => (
                    <TeamDepthPlayerCard key={index} item={item} func={onPress} />
                ))}
            </View>

        </View>
    )
}