import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { Tile } from "../../../functions/GameFunctions/GameTypes"
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Icons } from "./Icons";

interface Props {
    tileStats: Tile
}

export const CompleteTile: React.FC<Props> = ({tileStats}) => {
    return(
        <TouchableOpacity 
            style={tileStats.team1Complete ? styles.selected : styles.oppSelected}
            onPress={() => {}}
        >
            <View style={{margin:5, justifyContent: 'space-between', height:'90%'}}>
                <View style={{width:"100%", justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={styles.title}>{tileStats.name}</Text>

                    <Text style={{fontSize:16, fontFamily:'Roboto-Bold', color:"white"}}>
                        {tileStats.row}.{tileStats.index+1}
                    </Text>
                </View>

                <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between'}}>
                    <Icons stats={tileStats.name.split("+")}/>

                    <FontAwesome name="check-circle" size={24} color="white" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    selected : {
        width: 150, height:125, backgroundColor:'#2bd6b2', 
        marginLeft: 3, 
        // borderColor: '#2bd6b2', borderWidth: 4, 
        borderRadius: 5, marginBottom:3, justifyContent:'space-between'
    },
    oppSelected : {
        width: 150, height:125, backgroundColor:'#f2133b', 
        marginLeft: 3, borderRadius: 5, marginBottom:3, justifyContent:'space-between'
        // borderColor: '#f2133b', borderWidth: 4, 
    },
    title: {
        color:"white", fontFamily:'Roboto-Bold', fontSize:19
    },
    statText: {
        color:"white", fontFamily:'Roboto-Bold', fontSize: 18
    }
})