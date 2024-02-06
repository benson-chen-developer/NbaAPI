import { useEffect } from "react"
import { Text, View, TouchableOpacity } from 'react-native';

export default function TilePopUp({index, item, row, setPopUpTile}) {

    useEffect(() => {

    },[])
    
    if(item) 
        return (
            <View style={{
                flex: 1, width:"100%", height:"100%", backgroundColor:'#273447', 
                position:'absolute',
            }}>
                <Text style={{color:"white"}}>{item.name}</Text>

                {/* <ProgressBar item={item} /> */}
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