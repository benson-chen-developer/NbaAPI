import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native"
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo"

export const GamesCarousel = ({games, setSelectedGame, selectedGame}) => {
    return(
        <View style={{width:"100%", alignItems:'center'}}>
            <ScrollView horizontal={true} style={{ width: "100%", height: 100, flexDirection: 'row' }}>
                {games.map((game, i) => (
                    <Game key={i} game={game} setSelectedGame={setSelectedGame} selectedGame={selectedGame}/> 
                ))}
            </ScrollView>
        </View>
    )
}

import { FontAwesome5 } from '@expo/vector-icons';
const Game = ({game, setSelectedGame, selectedGame}) => {
    const iconSize = 35;
    const date = new Date(game.timeStart);
    const hours = date.getHours();
    const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes()

    return(
        <TouchableOpacity style={{
            width: 150, height: 70, marginRight: 10, alignItems:'center',
            borderRadius: 8, flexDirection:'row', justifyContent:'space-around', 
            backgroundColor:'white', marginLeft: 10, marginTop:20
        }} onPress={() => setSelectedGame(game)}>

            <Image source={getTeamLogo(game.homeTeam.teamName)} style={{width:iconSize, height:iconSize}}/>
            <View style={{alignItems:'center'}}>
                <Text style={{fontFamily:"Roboto-Black", fontSize:17, color:'rgba(0,0,0,1)'}}>
                    {`${hours+5-12}:${minutes}`}
                </Text>
                <Text style={{fontFamily:"Roboto-Black", fontSize:13, marginLeft:5, color:'rgba(0,0,0,.5)'}}>
                    PM EST
                </Text>
            </View>
            <Image source={getTeamLogo(game.awayTeam.teamName)} style={{width:iconSize, height:iconSize}}/>
        
            {selectedGame.awayTeam.teamName === game.awayTeam.teamName && selectedGame.homeTeam.teamName === game.homeTeam.teamName ?
                <View style={{position:'absolute', top: -10, left: -10}}>
                    <FontAwesome5 name="basketball-ball" size={30} color="orange" />
                </View>
                    :
                null
            }
        </TouchableOpacity>
    )
}