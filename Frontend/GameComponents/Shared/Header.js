import { View, Text, Image, StyleSheet } from "react-native"
import { abbreviateName } from "../../../assets/TeamLogos/getTeamLogo";

export const Header = ({homeTeamName, awayTeamName}) => {
    return(
        <View style={styles.header}>
            <TeamItem teamName={homeTeamName} isHome={true}/>

            <View style={{flexDirection:'row', width:100, justifyContent:'space-between'}}>
                <Text style={styles.score}>50</Text>
                <Text style={styles.score}>25</Text>
            </View>

            <TeamItem teamName={awayTeamName} isHome={false}/>
        </View>
    )
}

const TeamItem = ({teamName, isHome}) => {
    if(isHome)
        return(
            <View style={styles.teamItem}>
                <Image 
                    style={{height:50, width:50, marginRight:5}}
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamName)}.png`}}
                />
                <View>
                    <Text style={{color:'white', fontFamily:'Roboto-MediumItalic', fontSize:20}}>
                        {teamName}
                    </Text>
                    <Text style={{color:'white'}}>
                        Home
                    </Text>
                </View>
            </View>
        )
    else
        return(
            <View style={styles.teamItem}>
                <View>
                    <Text style={{color:'white', fontFamily:'Roboto-MediumItalic', fontSize:20}}>
                        {teamName}
                    </Text>
                    <Text style={{color:'white'}}>
                        Away
                    </Text>
                </View>
                <Image 
                    style={{height:50, width:50, marginLeft:5}}
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamName)}.png`}}
                />
            </View>
        )
}

const styles = StyleSheet.create({
    header:{
        width:"100%", height:40, flexDirection:'row',
        justifyContent:'space-evenly', alignItems:'center',
    },
    teamItem: {
        justifyContent:'center', alignItems:'center', height:100, width:200,
        flexDirection:'row'
    },
    score:{
        fontFamily: "Roboto-Black", fontSize:25, color:'white'
    }
})