import {View, Text, Image, StyleSheet} from 'react-native';
import { getFullNameOfStat } from '../../../assets/NameConversions';
import { getTeamLogo } from '../../../assets/TeamLogos/getTeamLogo';

export const UpperPart = ({game, selectedTiles}) => {
    // console.log(game.teams[0])

    return(
        <View style={{width: "100%", alignItems: 'space-between', height: 80, backgroundColor:'red', justifyContent:'center'}}>
            {selectedTiles.length === 3 ?

                <View style={{height: 50, width:"100%", flexDirection:'row'}}>
                    <Image source={getTeamLogo(game.teams[0])} style={styles.img}/>

                    <View style={{height:"100%", justifyContent:'center'}}>
                        <Text>DET vs CHA</Text>
                        <Text></Text>
                    </View>   

                    <Image source={getTeamLogo(game.teams[1])} style={styles.img}/>
                </View>

                    :

                <Text style={{color:'white', fontSize: 20}}>
                    Pick {3 - selectedTiles.length} Squares
                </Text>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    img: {height: 60, width: 60}
})