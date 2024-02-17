import { Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import PlayerCard from './PlayerCard';
import { getPlayerStatsToday } from '../../functions/AsyncStorage';
import { IsAnActualPlayers } from '../../../assets/AcutalPlayers';
import { InventoryTopBar } from './InventoryTopBar';
import { TeamPickerPopUp } from './TeamPickerPopUp';
import { PlayerPopUp } from './PlayerPopUp';

export default function Inventory() {

    const {user, setUser, playerStats, setPlayerStats} = useMyContext();
    const [onScreenCards, setOnScreenCards] = useState([]);
    const [currentTeam, setCurrentTeam] = useState({name: "Celtics", abbreviated: 'BOS'});
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [popUp, setPopUp] = useState("");
    
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
                if(playerStat["abbreviated"] === currentTeam.abbreviated && IsAnActualPlayers(playerStat["name"])){
                    setArr.push(playerStat);
                }
            })
        setOnScreenCards(setArr);
    }

    useEffect(() => {
        fetchPlayerStats().then(playerStatsRes => {
            setOnScreenCardsViaCurrentTeam(playerStatsRes);
        })
    }, [currentTeam]);

    // useEffect(() => {
    //     console.log('inv', onScreenCards)
    // }, [onScreenCards])

    return (
        <View style={{ 
            flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
        }}>
            <View style={{height:100}}/>

            <InventoryTopBar currentTeam={currentTeam} setPopUp={setPopUp}/>

            <ScrollView style={{ width: '90%' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {onScreenCards.map((player, index) => (
                        <PlayerCard 
                            key={index} player={player} setCurrentPlayer={setCurrentPlayer}
                            setPopUp={setPopUp}
                        />
                    ))}
                </View>
            </ScrollView>

            {popUp === "Team" ?
                <TeamPickerPopUp 
                    currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} setPopUp={setPopUp}
                /> 
                    : 
                null
            }

            {popUp === "Player" ?
                <PlayerPopUp 
                    currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} 
                    setPopUp={setPopUp} currentTeam={currentTeam}
                /> 
                    : 
                null
            }
        </View>
    );
}