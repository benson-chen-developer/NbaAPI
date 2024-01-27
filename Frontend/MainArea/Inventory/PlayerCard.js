import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react'

// const photoPath = require('../../../assets/PlayerHeadshots/AlphrenSengun')
export default function PlayerCard({player}) {

    const photoPath = `../../../assets/PlayerHeadshots/${player.name}.png`;

    useEffect(() => {
        console.log("playercard", player)
    }, []);

    return(
        <View style={{
            width:"40%", height: "20%", 
            borderWidth: 2, borderColor: 'grey', borderRadius: 2,
        }}>
            {/* <Image source={photoPath} style={{height: 100, width:100}}/> */}
            <Image source={'./'} style={{height: 100, width:100}}/>
            <Text>{player.name}</Text>
        </View>
    )
}