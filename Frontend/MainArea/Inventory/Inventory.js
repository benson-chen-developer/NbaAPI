import { Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import PlayerCard from './PlayerCard';
import { getPlayerStatsToday } from '../../functions/AsyncStorage';
import { IsAnActualPlayers } from '../../../assets/AcutalPlayers';
import { InventoryTopBar } from './InventoryTopBar';
import { TeamPickerPopUp } from './TeamPickerPopUp';

export default function Inventory() {

    const {user, setUser, playerStats, setPlayerStats} = useMyContext();
    const [onScreenCards, setOnScreenCards] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('BOS');
    const [popUp, setPopUp] = useState(false);
    const [playerFilter, setPlayerFilter] = useState("all");
    
    const fetchPlayerStats = async () => {
        try {
            const playerStatsRes = await getPlayerStatsToday();
            setPlayerStats(playerStatsRes);
            // console.log("Inventory", playerStatsRes);
            return playerStatsRes;
        } catch (error) {
            console.error("Error fetching player stats:", error);
        }
    };

    const setOnScreenCardsViaCurrentTeam = (allPlayerStats) => {
        let setArr = [];

        allPlayerStats.forEach(playerStat => {
            if(playerStat["team"] === currentTeam && IsAnActualPlayers(playerStat["name"])){
                setArr.push(playerStat);
            }
        })

        setOnScreenCards(setArr);
    }

    useEffect(() => {
        fetchPlayerStats().then(playerStatsRes => {
            setOnScreenCardsViaCurrentTeam(playerStatsRes);
        })
    }, []);

    // useEffect(() => {
    //     if(playerFilter === "all"){
    //         const playersArray = Object.values(user.playersArray);
    //         const sortedPlayersArray = playersArray.sort((a, b) => b.shards - a.shards);
    //         setOnScreenCards(sortedPlayersArray);
    //     }
    // }, [playerFilter]);

    // useEffect(() => {
    //     console.log("inv", onScreenCards)
    // }, [onScreenCards]);

    return (
        <View style={{ 
            flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
        }}>
            <View style={{height:100}}/>

            <InventoryTopBar setPopUp={setPopUp}/>

            <ScrollView style={{ width: '90%' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {onScreenCards.map((player, index) => (
                        <PlayerCard key={index} player={player} />
                    ))}
                </View>
            </ScrollView>

            {popUp ?
                <TeamPickerPopUp 
                    currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} setPopUp={setPopUp}
                /> 
                    : 
                null
            }
        </View>
    );
}