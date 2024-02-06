import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';
import { getTeamLogo } from '../../../assets/TeamLogos/getTeamLogo';

export default function LiveGameSlip({setSelectedLiveGameId, game}) {

    useEffect(() => {
        // console.log("LiveGameSlip", game)
    }, []);

    return(
        <TouchableOpacity style={{
            width:"90%", height: 125, borderRadius: 5, backgroundColor:"white",
            margin: 15, flexDirection:'row', 
            justifyContent:'space-around', alignItems:'center'
        }} onPress={() => setSelectedLiveGameId(game.gameId)}>
            <View>
                <Image source={getTeamLogo(game.player1Team)} style={styles.logo}/>
            </View>

            <Text style={{
                fontFamily: ThemeFonts, fontSize: 35
            }}>
                100 : 50
            </Text>

            <View>
                <Image source={getTeamLogo(game.player2Team)} style={styles.logo}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logo: {
      height: 80, width: 80
    },
  });