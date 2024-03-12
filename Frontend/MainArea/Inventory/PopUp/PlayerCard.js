import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react'
import { getPlayerCardColors } from '../../../../assets/TeamCosmetics/PlayerCardColors';
import { getPlayerHeadShot } from '../../../../assets/PlayerHeadshots/getPlayerHeadShot';

const innerCardColor = "#121320";
const cardBorderColor = "#2C2C39";
const levelBarColor = "#14cc14";
const levelBarDarkColor = "#111111";
const playerNameColor = "#FFFFFF";

export default function PlayerCard({player, currentTeam, popUpInfo, setPopUpInfo}) {
    const [playerNameBackGroundColor, setPlayerNameBackGroundColor] = useState("#111111");
    const [playerBarProgress, setPlayerBarProgress] = useState("0%");
    const [playerBarUpperNumber, setPlayerBarUpperNumber] = useState("");

    useEffect(() => {
        let ret = playerLevelProgressFunction(player.shards);
        setPlayerNameBackGroundColor(ret.playerNameBackGroundColor);
        setPlayerBarProgress(ret.playerBarProgress);
        setPlayerBarUpperNumber(ret.playerBarUpperNumber);

        // console.log("playercard", player)
    }, []);

    return(
        <TouchableOpacity style={{
            width:"46%", height: 250, alignItems:'center', backgroundColor:innerCardColor,
            borderWidth: 2, borderColor: cardBorderColor, borderRadius: 10,
            justifyContent: 'space-between', marginBottom: 20
        }} onPress={() => {
            setPopUpInfo(p => ({ ...p, popUpScreen: "Player", player: player, teamDepth: currentTeam }));
        }}>
            {/* Picture */}
            <Image 
                source={getPlayerHeadShot(player.name)} 
                style={{
                    height: 100, width:"95%", marginTop: 20
                }}
            />

            {/* Name */}
            <View style={{
                width:"100%", height: 40, backgroundColor: playerNameBackGroundColor,
                justifyContent:'center', alignItems:'center',
            }}>
                <Text style={{
                    fontFamily:'Roboto-Medium', color:playerNameColor,
                    fontSize:18
                }}>
                    {player.name}
                </Text>
            </View>
            
            {/* Level Bar */}
            <View style={{
                width: "100%", height: 26, justifyContent:'center',
                borderRadius: 10, backgroundColor: levelBarDarkColor
            }}>
                <View style={{
                    width: playerBarProgress, height:"100%", backgroundColor: levelBarColor,
                    borderTopRightRadius: playerBarUpperNumber === "" ? 0 : 5,
                    borderBottomRightRadius: playerBarUpperNumber === "" ? 0 : 5
                }}>
                </View>
                <Text style={{
                    position:'absolute', color:"white", fontSize: 18,
                    marginLeft: 10, fontFamily:'Roboto-Medium',
                }}>
                    {player.shards}
                    {playerBarUpperNumber}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const playerLevelProgressFunction = (shards) => {
    var playerNameBackGroundColor;
    var playerBarProgress;
    var playerBarUpperNumber;

    if(shards < 100) {
        playerNameBackGroundColor = "#111111";
        playerBarUpperNumber = 100;
    }
    else if (shards >= 100 && shards < 250){
        playerNameBackGroundColor  = "#EE8154";
        playerBarUpperNumber = 250;
    }
    else if (shards >= 250 && shards < 500) {
        playerNameBackGroundColor  = "#DFDEDE";
        playerBarUpperNumber = 500;
    } 
    else if (shards >= 500 && shards < 1000) {
        playerNameBackGroundColor  = "#E7C92D";
        playerBarUpperNumber = 1000;
    }
    else {
        playerNameBackGroundColor  = "#01BB97";
        playerBarUpperNumber = 1000;
    }

    playerBarProgress = `${shards / playerBarUpperNumber * 100}%`;
    
    if(shards < 1000){
        playerBarUpperNumber = ` / ${playerBarUpperNumber}`;
    } else {
        playerBarUpperNumber = ""
    }
    
    return {
        playerNameBackGroundColor, playerBarProgress, playerBarUpperNumber
    }
}