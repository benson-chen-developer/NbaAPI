import { View, Text } from "react-native"
import { ThemeFonts } from "../../assets/Themes/ThemeFont"
import { TeamDepthPlayerCard } from "./TeamDepth"
import { TeamDepthStats } from "./TeamDepthStats"

export const TeamDepthBench = ({players, selectedStat}) => {
    return(
        <View style={{
            width:"100%", backgroundColor: '#36385b', justifyContent:'space-around', alignItems:'center'
        }}>
            <Text style={{
                width:"100%", color:'white', textAlign:'center', fontFamily:ThemeFonts,
                fontSize:40, margin:20
            }}>
                Bench
            </Text>

            <View style={{
                width:"100%", flexDirection:'row', justifyContent:'space-around', alignItems:'center'
            }}>
                {players.map((p, index) => (
                    <TeamDepthPlayerCard key={index} player={p} />
                ))}
            </View>

            <TeamDepthStats players={players} selectedStat={selectedStat}/>
        </View>
    )
}