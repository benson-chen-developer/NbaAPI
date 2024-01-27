import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { useUser } from '../../Context/UserContext';
import PlayerCard from './PlayerCard';

export default function Inventory() {

    const {user, setUser} = useUser();
    const [onScreenCards, setOnScreenCards] = useState([]);
    const [playerFilter, setPlayerFilter] = useState("all");
    
    useEffect(() => {
        setOnScreenCards(user.playersArray);
    }, []);

    useEffect(() => {
        if(playerFilter === "all"){
            setOnScreenCards(user.playersArray);
        }
    }, [playerFilter]);

    return (
        <View style={{ 
            flex: 1, alignItems: 'center', justifyContent: 'center', width:"100%",
         }}>
            {onScreenCards.map((player, index) => (
                <PlayerCard key={index} player={JSON.parse(player)}/>
            ))}
        </View>
    );
}