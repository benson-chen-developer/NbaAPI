import { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function MatrixTile({row, index, item, matrixInfo, setMatrixInfo, isPlayer1}) {
    const tileStats = item;
    const [isSelected, setIsSelected] = useState(false); 
    const [isSwaped, setIsSwapped] = useState(false);
    const [isOpp, setIsOpp] = useState(false);
    
    // console.log("tileStats. I am complete", tileStats)

    const onPress = () => {
        setMatrixInfo(p => ({
            ...p, 
            pickedTile: {...tileStats, row, index},
            popUpMode: "default"
        }))
    }

    useEffect(() => {
        let isSelected = matrixInfo.selectedTiles.find(selectedTile => 
            (selectedTile.index == tileStats.index && selectedTile.row == tileStats.row)
        )
        let isSwaped = matrixInfo.selectedTiles.find(selectedTile => 
            (selectedTile.swapTile?.index == tileStats.index && selectedTile.swapTile?.row == tileStats.row)
        )
        let isOpp = matrixInfo.oppSelectedTiles.find(oppSelectedTile => 
            (oppSelectedTile.index == tileStats.index && oppSelectedTile.row == tileStats.row)
        )

        if(isSelected) setIsSelected(true);
        if(isSwaped) setIsSwapped(true);
        if(isOpp) setIsOpp(true);
    }, [matrixInfo.selectedTiles])
    
    return (
        <TouchableOpacity 
            style={
                isSwaped && styles.swapped ||
                isSelected && styles.selected || 
                isOpp && styles.oppSelected || 
                styles.notSelected
            }
            onPress={() => onPress()}
        >
            <Text style={{color:"white"}}>{tileStats.name}</Text>

            <Text>{tileStats.team1Complete ? "team1 won" : null}</Text>
            <Text>{tileStats.team2Complete ? "team2 won" : null}</Text>
            {/* <ProgressBar item={tileStats} /> */}
        </TouchableOpacity>
    )
}

const ProgressBar = (item) => {
    return(
        <View style={{width:"95%", height: 5}}>
            {item?.p1Progress ? 
                <View style={{
                    width:`${item.p1Progress[0]/item.p1Progress[1]}%`,
                    height: "100%", backgroundColor: 
                    item.p1Id === "ben" ? 'green' : 'red'
                }}/> : null
            }
            <Text>{item.p1Id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    notSelected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3,marginBottom:3,
        borderRadius: 5
    },
    selected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#2bd6b2', borderWidth: 4,
        borderRadius: 5, marginBottom:3,
    },
    swapped : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#f1c513', borderWidth: 4,
        borderRadius: 5, marginBottom:3,
    },
    oppSelected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#f2133b', borderWidth: 4,
        borderRadius: 5, marginBottom:3,
    },
})