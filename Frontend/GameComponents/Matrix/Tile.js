import { useEffect } from "react"
import { Text, View, TouchableOpacity } from 'react-native';

export default function Tile({index, item, row, setPopUpTile, setSelectedTiles}) {

    useEffect(() => {

    },[])
    
    if(item) 
        return (
            <TouchableOpacity style={{
                width: 150, height:125, backgroundColor:'#273447', 
                marginLeft: 2, margin: 2,
                borderRadius: 5
            }} onPress={() => setPopUpTile({
                item: item,
                index: index,
                row: row
            })}>
                <Text style={{color:"white"}}>{item.name}</Text>

                {/* <ProgressBar item={item} /> */}
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