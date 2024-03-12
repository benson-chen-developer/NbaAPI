import { Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import PlayerCard from './PopUp/PlayerCard';
import { getPlayerStatsToday } from '../../functions/AsyncStorage';
import { IsAnActualPlayers } from '../../../assets/AcutalPlayers';
import { InventoryTopBar } from './InventoryTopBar';
import { TeamPickerPopUp } from './PopUp/TeamPickerPopUp';
import { PlayerPopUp } from './PopUp/PlayerPopUp';
import { TeamDepthPopUp } from './PopUp/TeamDepthPopUp';
import { getAsyncTeamDepth, newTeamDepthObjArray } from '../../functions/AsyncStorage/TeamDepth';
import { PopUp } from './PopUp/PopUp';
import { InventorySecondBar } from './InventorySecondBar';

export default function Inventory() {
    
    const {playerStats, setPlayerStats, teamDepthObjArray, setTeamDepthObjArray} = useMyContext();

    const [onScreenCards, setOnScreenCards] = useState([]);
    const [currentTeam, setCurrentTeam] = useState({"name":"Celtics","abbreviated":"BOS","teamDepth":["Jayson Tatum","Derrick White","Kristaps Porzingis","Jrue Holiday","Jalen Brown"]});
    const [homeScreen, setHomeScreen] = useState("All");

    const [popUpInfo, setPopUpInfo] = useState({
        popUpScreen: "",
        player: null,
        teamDepth: null
    });
    
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

    const fetchDepth = async () => {
        try {
            const teamDepthObjArray = await getAsyncTeamDepth();
            setTeamDepthObjArray(teamDepthObjArray);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const hey = await newTeamDepthObjArray([{name:"Celtics", abbreviated: 'BOS', teamDepth:["Jayson Tatum", "Derrick White", "Kristaps Porzingis", "Jrue Holiday", "Jalen Brown"]}]);
        //         setTeamDepthObjArray(hey);
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // };
        if(teamDepthObjArray.length === 0)
            fetchDepth();
    }, []);

    useEffect(() => {
        fetchPlayerStats().then(playerStatsRes => {
            setOnScreenCardsViaCurrentTeam(playerStatsRes);
        })
    }, [currentTeam]);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            {/* <InventoryTopBar currentTeam={currentTeam} setPopUpInfo={setPopUpInfo} /> */}

            <InventorySecondBar homeScreen={homeScreen} setHomeScreen={setHomeScreen}/>

            <ScrollView style={{ width: '90%' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {onScreenCards.map((player, index) => (
                        <PlayerCard 
                            key={index} player={player} currentTeam={currentTeam}
                            popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo}
                        />
                    ))}
                </View>
            </ScrollView>

            {popUpInfo.popUpScreen !== "" ? 
                <PopUp popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo}/>
                    :
                null
            }
        </View>
    );
}