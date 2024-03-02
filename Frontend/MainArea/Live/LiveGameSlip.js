import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';
import { getTeamLogo, getTeamLogoCdn } from '../../../assets/TeamLogos/getTeamLogo';
import { useNavigation } from '@react-navigation/native';

export default function LiveGameSlip({game}) {

    const navigation = useNavigation();

    const gameStarted = () => {
        const estTimeStart = new Date(game.timeStart);
        const currentTimeEST = new Date() - (5 * 60 * 60 * 1000);

        if (estTimeStart < new Date(currentTimeEST))
            return true;
        else
            return false
    }

    const bringToLiveGame = (game) => {
        // if(gameStarted())
        if(false)
            navigation.navigate("GameHome", { game: game })
        else
            navigation.navigate("GamePreScreen", { game: game })
    }

    useEffect(() => {
        // console.log("LiveGameSlip", JSON.stringify(game.teams[0], null, 2));
    }, []);

    return(
        <TouchableOpacity style={{
            width:"90%", height: 125, borderRadius: 5, backgroundColor:"white",
            margin: 15, flexDirection:'row', 
            justifyContent:'space-around', alignItems:'center'
        }} onPress={() => bringToLiveGame(game)}>
            <View>
                {/* <Image source={{uri: getTeamLogoCdn(game.teams[0].teamName)}} style={styles.logo}/> */}
            </View>

            <Text style={{
                fontFamily: ThemeFonts, fontSize: 35
            }}>
                100 : 50
            </Text>

            <View>
                {/* <Image source={{uri: getTeamLogoCdn(game.teams[1].teamName)}} style={styles.logo}/> */}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logo: {
      height: 80, width: 80
    },
  });