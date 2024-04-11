import { useEffect, useState } from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { getFullNameOfStat } from "../../../../../assets/NameConversions"
import { SelectedTile, Tile } from "../../../../functions/GameFunctions/GameTypes";

interface Props {
    selectedTile: SelectedTile;
    pressFunc: (tile: SelectedTile) => void;
    isPlayer1: boolean;
    allTiles: [Tile];
}

export const  Card: React.FC<Props> = ({selectedTile, pressFunc, isPlayer1, allTiles}) => {

    const [thisTile, setThisTile] = useState<Tile>(selectedTile.swapTile ? allTiles[selectedTile.swapTile.tileIndex] : allTiles[selectedTile.tileIndex]);

    return(
        <TouchableOpacity style={selectedTile.swapTile ? styles.swap : styles.selected} onPress={() => pressFunc(selectedTile)}>
            <View style={{height:"95%", backgroundColor:'rgba(0, 0, 0, .25)'}}>
                {/* Stat Name and Goal Value */}
                <View style={{marginLeft:10, height:"50%", flexDirection:'row', alignItems:'flex-end'}}>
                    {/* Name with Shadow */}
                    <View>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:30}}>
                            {getFullNameOfStat(thisTile.name)}
                        </Text>
                    </View>

                    <View style={{marginLeft: 15}}>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:40}}>
                            {isPlayer1 ? thisTile.team1Progress : thisTile.team2Progress}
                        </Text>
                    </View>
                </View> 

                {/* Current Numbers */}
                <View style={{marginLeft:10, height:"30%", flexDirection:'row', alignItems:'flex-end'}}>
                    <View>
                        <Text style={{ color: "black", fontFamily:"Roboto-Bold", fontSize:15, position:'absolute', top:2, left:2}}>Current</Text>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:15}}>Current</Text>
                    </View>

                    <View style={{marginLeft: 15}}>
                        <Text style={{ color: "black", fontFamily:"Roboto-Bold", fontSize:20, position:'absolute', top:2, left:2}}>18</Text>
                        <Text style={{ color: "white", fontFamily:"Roboto-Bold", fontSize:20}}>18</Text>
                    </View>
                </View> 
            </View> 

            <View style={{height:"5%", backgroundColor:'black', width:"100%", borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
                <View style={{height:"100%", backgroundColor: selectedTile.swapTile ? "#f1c513" : '#2bd6b2', width:"50%"}}/>
            </View> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    selected : {
        width: "90%", height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#2bd6b2', borderWidth: 2,
        borderRadius: 5, marginBottom: 20,
        shadowColor: '#2bd6b2', // Specify the color of the shadow
        shadowOpacity: 0.5, // Specify the opacity of the shadow (iOS only)
        elevation: 4,
    },
    swap : {
        width: "90%", height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#f1c513', borderWidth: 2,
        borderRadius: 5, marginBottom: 20,
        shadowColor: '#f1c513', // Specify the color of the shadow
        shadowOpacity: 0.5, // Specify the opacity of the shadow (iOS only)
        elevation: 4,
    },
})