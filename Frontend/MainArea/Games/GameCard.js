import { View, Text, Image } from "react-native"
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo"
import { ThemeFonts } from "../../../assets/Themes/ThemeFont"

export const GameCard = ({game}) => {
    return(
        <View style={{width: "95%", backgroundColor:'white', borderRadius: 10}}>

            <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{alignItems:'center', marginLeft:10, marginTop:10}}>
                    <TeamPicAndName team={game.homeTeam} />
                    <Text style={{color:'grey'}}>Home</Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:"Roboto-Black", fontSize:25, color:'rgba(0,0,0,1)'}}>7:30</Text>
                    <Text style={{fontFamily:"Roboto-Black", fontSize:20, marginLeft:5, color:'rgba(0,0,0,.5)'}}>PM EST</Text>
                </View>

                <View style={{alignItems:'center', marginRight:10, marginTop:10}}>
                    <TeamPicAndName team={game.awayTeam} />
                    <Text style={{color:'grey'}}>Away</Text>
                </View>
            </View>

        </View>
    )
}

const TeamPicAndName = ({team}) => {
    return(
        <View style={{alignItems:'center'}}>
            <Image source={getTeamLogo(team.teamName)} style={{
                width:60, height:60
            }}/>
            <Text style={{color:"black", fontFamily:ThemeFonts, fontSize:18}}>{team.teamName}</Text>
        </View>
    )
}