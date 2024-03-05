import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { getFullNameOfStat } from "../../../../assets/NameConversions";
import { PopUpPlayerCard } from "./PopUpPlayerCard";
import { PopUpProgressbar } from "./PopUpProgressbar";

/**
 * 
 * @param {*} matrixInfo 
 * {"pickedTile": {
 *      "name": "PTS", "team1": 23, "team1Progress": 0, "team2": 23, "team2Progess": 0
 * },
 *  "popUpMode": "default", 
 * "selectedTiles": []}
 */
export const PopUpPickTile = ({matrixInfo, setMatrixInfo}) => {

    const colors = ["#f01133"]

    const {pickedTile} = matrixInfo;

    const onPress = () => {
        if(matrixInfo.selectedTiles.length < 3)
            setMatrixInfo(p => ({
                ...p, 
                selectedTiles: [...p.selectedTiles, pickedTile], 
                popUpMode: 'none'
            }));
        else
            setMatrixInfo(p => ({
                ...p, 
                pickedTile: {...pickedTile},
                popUpMode: "swap"
            }))
    }

    return(
        <>
            {/* X Btn */}
            <TouchableOpacity   
                style={{height: 25, width:"80%", marginTop:30, marginBottom:10, alignItems:'flex-end', justifyContent:'center'}}
                onPress={() => setMatrixInfo(p => ({ ...p, popUpMode: "none" }))}
            >
                <Text style={{color:'white'}}>X</Text>
            </TouchableOpacity>

            {/* Stat Name */}
            <Text style={styles.statName}>
                {getFullNameOfStat(pickedTile.name)}
            </Text>

            {/* Progress Bar */}
            <PopUpProgressbar pickedTile={pickedTile}/>

            {/* PlayerCards */}
            <PopUpPlayerCard />

            {/* Select Btn */}
            {matrixInfo.selectedTiles.find(tile => tile.index === pickedTile.index && tile.row === pickedTile.row) ?
                <View style={styles.main2} onPress={() => onPress()}>
                    <View style={styles.inner2}> 
                        <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold'}}>
                            Picked
                        </Text>
                    </View>
                </View>
                    :
                <TouchableOpacity style={styles.main} onPress={() => onPress()}>
                    <View style={styles.inner}> 
                        <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold'}}>
                            Pick
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        width:100, height:50, alignItems:'center',
        backgroundColor: '#fa05c0', borderRadius: 10
    },
    inner:{
        width:"100%", height:"95%", justifyContent:'center', alignItems:'center',
        backgroundColor: '#db05fa', borderRadius: 10
    },
    main2: {
        width:100, height:50, alignItems:'center', opacity:.5,
        backgroundColor: '#fa05c0', borderRadius: 10
    },
    inner2:{
        width:"100%", height:"95%", justifyContent:'center', alignItems:'center',
        backgroundColor: '#db05fa', borderRadius: 10,  opacity:.5
    },
    statName: {
        color: "white", fontFamily: "Roboto-Bold", fontSize: 30
    }
})