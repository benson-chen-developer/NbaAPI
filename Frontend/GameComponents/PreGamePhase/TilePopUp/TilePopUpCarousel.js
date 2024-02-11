import { View, Image, Text, ScrollView } from "react-native"
import { getPlayerHeadShot } from "../../../../assets/PlayerHeadshots/getPlayerHeadShot"
import { ThemeFonts } from "../../../../assets/Themes/ThemeFont"

export const TilePopUpCarousel = ({statName, ourPlayer}) => {
    return(
        <View style={{
            width: "95%", height: "30%", justifyContent:'center',
        }}>
            <View style={{
                height: "80%", width: "100%", backgroundColor:'rgba(0,0,0,.5)',
                borderRadius: 5
            }}/>
            
            <ScrollView style={{height: "90%", position:'absolute'}} horizontal={true}>
                {ourPlayer.playerCards.map((player, index) => {
                    return <PlayerCard key={index} statName={statName} player={player}/>
                })}
            </ScrollView>

        </View>
    )
}


/*
    player = {
        {
            name: string,
        }
    }
*/
const PlayerCard = ({statName, player}) => {
    return(
        <View style={{
            height: "100%", width: 150, backgroundColor: 'red', borderRadius: 5,
            justifyContent:'center', alignItems:'center'
        }}>
            <Image source={getPlayerHeadShot(player.name)} style={{
                height:75, width: 75
            }}/>

            <Text style={{
                marginTop:8, fontFamily: ThemeFonts, color:'white', fontSize: 17
            }}>
                {player.name}
            </Text>

            <Text style={{
                marginTop:8, fontFamily: ThemeFonts, color:'white', fontSize: 17
            }}>
                Q1 Avg {getQuarterAverage(1, player.averagePerGame, statName)}
            </Text>
        </View>
    )
}

const getQuarterAverage = (quarter, averagePerGame, statName) => {
    const allStats = statName.split("+");
    let total = 0;

    allStats.forEach(stat => {
        total += averagePerGame[stat][quarter]
    });

    return total;
}