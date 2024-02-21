import { useEffect } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Tile({index, item, row, setPopUpTile, selectedTiles, setSelectedTiles, game}) {
    const tileStats = JSON.parse(item);
    useEffect(() => {
        // console.log(item)
    },[])
    
    if(tileStats) 
        return (
            <TouchableOpacity 
                style={
                    selectedTiles.find(a => a.index === index && a.row === row)
                        ? styles.selected
                        : styles.notSelected
                }
                onPress={() => setPopUpTile({
                    gameId: game.id,
                    item: tileStats,
                    index: index,
                    row: row
                }
            )}>
                <Text style={{color:"white"}}>{tileStats.name}</Text>

                {/* <ProgressBar item={tileStats} /> */}
            </TouchableOpacity>
        )
        
    else
        return (
            <View style={{
                width: 150, height:125, backgroundColor:'#273447', 
                marginLeft: 2, margin: 2,
                borderRadius: 5
            }}>
            </View>
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
        marginLeft: 2, margin: 2,
        borderRadius: 5
    },
    selected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 2, margin: 2, borderColor: '#2bd6b2', borderWidth: 4,
        borderRadius: 5
    }
})