import { Dispatch, SetStateAction } from "react";
import { Image, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { abbreviateName } from "../../../assets/TeamLogos/getTeamLogo"
import {TeamData} from '../../Global/TeamData';

interface Props {
    teamName: string;
    setCurrentTeam: Dispatch<SetStateAction<string>>
}

export const Header: React.FC<Props> = ({ teamName, setCurrentTeam }) => {
    const teamColor = "#16a540";
    return(
        <View style={{width:"100%", height:100, flexDirection:'row', marginTop:20, marginBottom:10}}>
            <View style={{width:"30%", height:"100%", justifyContent:'flex-end', alignItems:'flex-end'}}>
                <View style={{width:90, height: 93, alignItems:'center', backgroundColor: teamColor, borderRadius:10}}>
                    <View style={{width: 90, height:90, backgroundColor:'white', borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            style={{width:"90%", height: "90%"}}
                            source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(teamName)}.png`}}
                        />
                    </View>
                </View>
            </View>

            <View style={{width:"70%", height:"100%"}}>
                <ScrollView 
                    style={{width:"100%", overflow: 'hidden', height:'100%', marginLeft:15}} 
                    contentContainerStyle={{alignItems:'flex-end'}}
                    horizontal={true}
                >
                    {TeamData.map((team, index) => (
                        <TouchableOpacity 
                            style={teamName === team.abbreviated ? styles.picked : styles.notPicked}
                            onPress={() => setCurrentTeam(team.abbreviated)}
                            key={index}
                        >
                            <Image style={{width:30, height:30}} source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${team.abbreviatedPic}.png`}}/>
                            <Text style={{
                                fontFamily:"Roboto-Bold", fontSize:20,
                                color: teamName === team.abbreviated ? 'black' : 'white'
                            }}>
                                {team.abbreviated}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    picked: {
        width: 90, height:45, backgroundColor:'white', flexDirection:'row',
        justifyContent:'space-evenly', alignItems:'center',
        borderRadius: 10, marginRight:10,
        borderColor:'black', borderWidth:2
    },
    notPicked: {
        width: 90, height:45, flexDirection:'row',
        justifyContent:'space-evenly', alignItems:'center', 
        borderRadius: 10, marginRight:10,
        backgroundColor:'black', borderColor:'white', borderWidth:2
    }
})