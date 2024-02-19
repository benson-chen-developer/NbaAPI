import { View, Text } from "react-native"
import { ThemeFonts } from "../../assets/Themes/ThemeFont"
import { TeamDepthPlayerCard } from "./TeamDepth"
import { TeamDepthStatBtns } from "./TeamDepthStatBtns"
import { TeamDepthStats } from "./TeamDepthStats"

export const TeamDepthPickedPlayer = ({player, selectedStat, setSelectedStat}) => {
    return(
        <View style={{
            width:"100%", backgroundColor: '#36385b', justifyContent:'space-around', alignItems:'center'
        }}>
            <Text style={{
                width:"100%", color:'white', textAlign:'center', fontFamily:ThemeFonts,
                fontSize:40, margin:20
            }}>
                Picked
            </Text>

            <View style={{
                width:"100%", flexDirection:'row', justifyContent:'space-around', alignItems:'center'
            }}>
                <View style={{width:"40%", alignItems:'center'}}>
                    <TeamDepthPlayerCard player={player} />

                    <TeamDepthStats players={[player]} selectedStat={selectedStat}/>
                </View>

                <TeamDepthStatBtns 
                    selectedStat={selectedStat} setSelectedStat={setSelectedStat}
                />
            </View>

        </View>
    )
}