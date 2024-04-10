import { useEffect } from "react"
import { View, TouchableOpacity, Text } from "react-native"

export const TeamSwitchBtn = ({teams, setTeams}) => {

    if(teams.length === 1) return(
        <View>
            <Text style={{color:"white"}}>
                {teams.find(t => t.picked).name}
            </Text>
        </View>
    )
    
    else return(
        <TouchableOpacity onPress={() => {
            setTeams(p => p.map(t => ({ ...t, picked: !t.picked })));
        }}>
            <Text style={{color:"white"}}>
                {teams.find(t => t.picked).name}
            </Text>
        </TouchableOpacity>
    )
}