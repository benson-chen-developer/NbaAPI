import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';
import { getTeamLogo } from '../../../assets/TeamLogos/getTeamLogo';

export default function LiveGameSlip({game}) {

    useEffect(() => {
    }, []);

    return(
        <View style={{
            width:"90%", height: 125, borderRadius: 5, backgroundColor:"white",
            margin: 15, flexDirection:'row', 
            justifyContent:'space-around', alignItems:'center'
        }}>
            <View>
                <Image source={getTeamLogo(game.team1)} style={styles.logo}/>
            </View>

            <Text style={{
                fontFamily: ThemeFonts, fontSize: 35
            }}>
                100 : 50
            </Text>

            <View>
                <Image source={getTeamLogo(game.team2)} style={styles.logo}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
      height: 80, width: 80
    },
  });