import { useEffect } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function MatrixTile({row, index, item, matrixInfo, setMatrixInfo}) {
    const tileStats = JSON.parse(item);
    // console.log(tileStats)

    const onPress = () => {
        setMatrixInfo(p => ({
            ...p, 
            pickedTile: {...tileStats, row, index},
            popUpMode: "default"
        }))
    }
    
    return (
        <TouchableOpacity 
            style={
                matrixInfo.selectedTiles.find(a => a.index === index && a.row === row)
                ? styles.selected : styles.notSelected
            }
            onPress={() => onPress()}
        >
            <Text style={{color:"white"}}>{tileStats.name}</Text>

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
        marginLeft: 3,
        borderRadius: 5
    },
    selected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#2bd6b2', borderWidth: 4,
        borderRadius: 5
    }
})