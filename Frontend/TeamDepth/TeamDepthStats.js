import { useState } from "react"
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { ThemeFonts } from "../../assets/Themes/ThemeFont";

export const TeamDepthStats = ({players, selectedStat}) => {

    return(
        <View style={{width:"100%",height:60, alignItems:'center', justifyContent:'center'}}>

            {/* Stats */}
            <View style={styles.statContainer}>
                {players.slice(0, 3).map((stat, index) => (
                    <View key={index}>
                        <Text style={styles.stat}>
                            {(stat[selectedStat] / stat['Games Played']).toFixed(1)}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statContainer: {
        flexDirection:'row', width:"100%", justifyContent:'space-around', height: 40,
        alignItems:'center'
    },
    stat:{
        fontFamily:ThemeFonts, fontSize:18, color:'white'
    }
})