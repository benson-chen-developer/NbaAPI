import { View, Image, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { ShortenPlayerName } from "../../../../assets/NameConversions";
import { useMyContext } from "../../../Context/MyContext";
import { setAsyncTeamDepthObjArray } from "../../../functions/AsyncStorage/TeamDepth";

export const TeamDepthPlayerCard = ({pickedName, playerName, teamName, setPopUpInfo}) => {
    // const {teamDepthObjArray, setTeamDepthObjArray} = useMyContext();

    const onPress = (cardName) => {
        let teamObj = teamDepthObjArray.find(team => team.name === teamName);
        const indexOfCardName = teamObj.teamDepth.indexOf(cardName);
        const indexPickedName = teamObj.teamDepth.indexOf(pickedName);

        if(indexPickedName !== -1){
            teamObj.teamDepth[indexOfCardName] = pickedName;
            teamObj.teamDepth[indexPickedName] = cardName;
        } else {
            teamObj.teamDepth[indexOfCardName] = pickedName;
        }

        const updatedTeamDepthObjArray = teamDepthObjArray.map(obj => {
            if(obj.name === teamObj.name) return teamObj;
            else return teamObj;
        })

        console.log("teamDepthObjArray", teamDepthObjArray)

        setAsyncTeamDepthObjArray(updatedTeamDepthObjArray).then(res => {
            // setTeamDepthObjArray(res);
            setPopUpInfo(p => ({ ...p, popUpScreen: "" }));
        })
    };

    const size = 70;

    if(onPress && pickedName!==playerName)
        return(
            <TouchableOpacity style={{
                width: 90, height: 110, borderRadius:5, borderWidth: 1,
                borderColor:"grey", justifyContent:'center', alignItems:'center'
            }} onPress={() => onPress(playerName)}>
                <Image 
                    style={{width:size, height:size}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />
                <Text>{ShortenPlayerName(playerName)}</Text>
            </TouchableOpacity>
        )

    else if(onPress && pickedName===playerName)
        return(
            <View style={{
                    width: 90, height: 110, borderRadius:5, borderWidth: 1,
                    borderColor:"grey", justifyContent:'center', alignItems:'center',
            }}>
                <Image 
                    style={{width:size, height:size}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />
                <Text>{ShortenPlayerName(playerName)}</Text>
                <View style={{position:'absolute', width:"100%", height:"100%", backgroundColor:'rgba(0,0,0,.25)'}}/>
            </View>
        )
        
    else if(!func)
        return(
            <View style={{
                width: 90, height: 110, borderRadius:5, borderWidth: 1,
                borderColor:"grey", justifyContent:'center', alignItems:'center'
            }}>
                <Image 
                    style={{width:size, height:size}}
                    source={{uri: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432816.png"}}
                />
                <Text>{ShortenPlayerName(playerName)}</Text>
            </View>
        )
}