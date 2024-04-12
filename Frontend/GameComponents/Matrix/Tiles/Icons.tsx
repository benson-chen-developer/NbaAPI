import React from "react";
import { Entypo } from '@expo/vector-icons';
import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
    stats: string[];
}

export const Icons: React.FC<Props> = ({ stats }) => {
    return (
        <View style={{flexDirection:'row'}}>
            {stats.map((stat, index) => {
                return <Stat key={index} stat={stat}/>
            })}
        </View>
    );
};

const Stat = ({stat}) => {
    return(
        <View>
            {stat === "REB" ? <Entypo name="hand" size={20} color="white" style={{marginRight: 4}}/> : null}
            {stat === "AST" ? <FontAwesome5 name="hands-helping" size={20} color="white" style={{marginRight: 4}}/> : null}
            {stat === "PTS" ? <AntDesign name="star" size={20} color="white" style={{marginRight: 4}}/> : null}
            {stat === "BLK" ? <Ionicons name="shield" size={20} color="white" style={{marginRight: 4}}/> : null}
            {stat === "STL" ? <MaterialCommunityIcons name="ninja" size={20} color="white" style={{marginRight: 4}}/> : null}
        </View>
    )
}
