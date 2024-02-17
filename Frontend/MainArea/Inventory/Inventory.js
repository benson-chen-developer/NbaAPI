import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import PlayerCard from './PlayerCard';
import { getPlayerStatsToday } from '../../functions/AsyncStorage';

export default function Inventory() {

    const {user, setUser} = useMyContext();
    const [onScreenCards, setOnScreenCards] = useState([]);
    const [playerFilter, setPlayerFilter] = useState("all");
    
    useEffect(() => {
        // const playersArray = Object.values(user.playersArray);
        const sortedPlayersArray = [...user.playersArray].sort((a, b) => b.shards - a.shards);

        // console.log("inventory",...user.playersArray)

        // console.log("Inventory",sortedPlayersArray)

        const fetchPlayerStats = async () => {
            try {
                const playerStatsRes = await getPlayerStatsToday();
                // console.log("Inventory", playerStatsRes);
            } catch (error) {
                console.error("Error fetching player stats:", error);
            }
        };
    
        fetchPlayerStats();

        setOnScreenCards(sortedPlayersArray);
    }, []);

    useEffect(() => {
        if(playerFilter === "all"){
            const playersArray = Object.values(user.playersArray);
            const sortedPlayersArray = playersArray.sort((a, b) => b.shards - a.shards);
            setOnScreenCards(sortedPlayersArray);
        }
    }, [playerFilter]);

    return (
        <View style={{ 
            flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
        }}>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {onScreenCards.map((player, index) => (
                    <PlayerCard index={index} player={JSON.parse(player)} />
                ))}
            </View>
        </View>
    );
}