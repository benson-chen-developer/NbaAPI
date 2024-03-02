import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { getFullNameOfStat } from "../../../../assets/NameConversions";
import { PopUpPlayerCard } from "./PopUpPlayerCard";
import { PopUpProgressbar } from "./PopUpProgressbar";
import { SelectBtn } from "./SelectBtn";

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
        setMatrixInfo(p => ({
            ...p, 
            selectedTiles: [...p.selectedTiles, pickedTile], 
            popUpMode: 'none'
        }));
    }

    return(
        <View style={{width:"90%", height:"90%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>
            
            {/* X Btn */}
            <TouchableOpacity   
                style={{height: 25, width:"80%", marginTop:30, marginBottom:10, alignItems:'flex-end', justifyContent:'center'}}
                onPress={() => setMatrixInfo(p => ({ ...p, popUpMode: "none" }))}
            >
                <Text style={{color:'white'}}>X</Text>
            </TouchableOpacity>

            {/* Stat Name */}
            <Text style={style.statName}>
                {getFullNameOfStat(pickedTile.name)}
            </Text>

            {/* Progress Bar */}
            <PopUpProgressbar pickedTile={pickedTile}/>

            {/* PlayerCards */}
            <PopUpPlayerCard />

            <SelectBtn onPress={onPress}/>
        </View>
    )
}

const style = StyleSheet.create({
    statName: {
        color: "white", fontFamily: "Roboto-Bold", fontSize: 30
    }
})