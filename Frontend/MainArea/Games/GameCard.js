import { useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo"
import { playBtnColor } from "../../../assets/Themes/ThemeColors"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont"
import { useMyContext } from "../../Context/MyContext"
import { startSearchForGame } from "../../functions/GameStartFunctions"

export const GameCard = ({game}) => {

    const {user, setUser, loading, setLoading, setLiveGames} = useMyContext();
    const [pickedTeam, setPickedTeam] = useState(null);

    // const isAlreadyPlaying = user.liveGames.find((liveGame) => liveGame.teams[0] === game.homeTeam.teamName || liveGame.teams[1] === game.awayTeam.teamName);

    // console.log(user.liveGames)

    const pressPlay = async () => {
        setLoading(true);

        try{
            const newGame = await startSearchForGame(user, pickedTeam, game.homeTeam.teamName, game.awayTeam.teamName);
            
            setLiveGames(p => [...p, newGame]);
            setLoading(false);
        } catch {
            setLoading(false);
            console.log("GameCard Error", err);
        }
    }

    return(
        <View style={{
            width: "95%", backgroundColor:'white',height:250, borderRadius: 10, marginTop: 30,
            shadowColor:'white', shadowOffset: { width: 5, height: 5 }, shadowRadius:5, elevation: 5,
        }}>

            <View style={{width:"100%", flexDirection:'row', alignItems:'center'}}>
                <TeamPicAndStats 
                    team={game.homeTeam} isHome={true}
                    pickedTeam={pickedTeam} setPickedTeam={setPickedTeam} 
                />

                <View style={{alignItems:'center', width:"30%"}}>
                    <Text style={{fontFamily:"Roboto-Black", fontSize:25, color:'rgba(0,0,0,1)'}}>7:30</Text>
                    <Text style={{fontFamily:"Roboto-Black", fontSize:20, marginLeft:5, color:'rgba(0,0,0,.5)'}}>PM EST</Text>
                </View>

                <TeamPicAndStats 
                    team={game.awayTeam} isHome={false}
                    pickedTeam={pickedTeam} setPickedTeam={setPickedTeam}
                />
            </View>

            <View style={{width:"100%", height: 20, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                
                {pickedTeam && (pickedTeam === game.homeTeam.teamName || pickedTeam === game.awayTeam.teamName)?
                    <TouchableOpacity style={{
                        height:40, width:100, backgroundColor:playBtnColor(pickedTeam).shadow, borderRadius:10
                    }} onPress={() => pressPlay()}>
                        <View style={{
                            height: 38, width:"100%", backgroundColor: playBtnColor(pickedTeam).main, 
                            borderRadius:10, alignItems:'center', justifyContent:'center'
                        }}>
                            <Text style={{color:"white", fontFamily:ThemeFonts, fontSize:20}}>Play</Text>
                        </View>
                    </TouchableOpacity> 
                        :
                    <Text style={{fontFamily:ThemeFonts, fontSize:20, color:'#292f29'}}>
                        Pick A Team To Play
                    </Text> 
                }
            </View>

        </View>
    )
}

const TeamPicAndStats = ({team, isHome, pickedTeam, setPickedTeam}) => {
    return(
        <TouchableOpacity style={{
            alignItems:'center', paddingTop:10, width: "35%", alignItems:'center', 
            justifyContent:'center', height: "100%", 
            opacity: pickedTeam === team.teamName ? 1 : .25
        }} onPress={() => setPickedTeam(team.teamName)}>

             <View style={{alignItems:'center'}}>
                <Image source={getTeamLogo(team.teamName)} style={{
                    width: pickedTeam === team.teamName ? 90 : 60, 
                    height: pickedTeam === team.teamName ? 90 : 60, 
                }}/>
                <Text style={{color:"black", fontFamily:ThemeFonts, fontSize:18}}>{team.teamName}</Text>
            </View>

            <Text style={{color:'grey'}}>
                {isHome ? "Home" : "Away"}
            </Text>
        </TouchableOpacity>
    )
}