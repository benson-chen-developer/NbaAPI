import { useEffect } from "react"
import { Text, View, TouchableOpacity } from 'react-native';

export default function Tile({item}) {

    useEffect(() => {
        // console.log(item)
    },[])
    
    return (
        <View>
            <Text>{item.name}</Text>
        </View>
    )
}