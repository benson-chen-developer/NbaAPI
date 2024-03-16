import { Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import { getPlayerStatsToday } from '../../functions/AsyncStorage';
import { IsAnActualPlayers } from '../../../assets/AcutalPlayers';
import { getAsyncTeamDepth, newTeamDepthObjArray } from '../../functions/AsyncStorage/TeamDepth';
import { PopUp } from './PopUp/PopUp';
import { InventorySecondBar } from './InventorySecondBar';
import { InventoryFirstBar } from './InventoryFirstBar';
import { WholeTeam } from './WholeTeam/WholeTeam';
import { Team } from './Team/Team';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Inventory() {
    
    const {playerStats, setPlayerStats, teamDepthObjArray, setTeamDepthObjArray} = useMyContext();

    const [onScreenCards, setOnScreenCards] = useState([]);
    const [currentTeam, setCurrentTeam] = useState({"name":"Celtics","abbreviated":"BOS","teamDepth":["Jayson Tatum","Derrick White","Kristaps Porzingis","Jrue Holiday","Jaylen Brown"]});
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

    const fetchDepth = async () => {
        try {
            const teamDepthObjArray = await getAsyncTeamDepth();

            console.log("teamDepthObjArray", teamDepthObjArray);
            setTeamDepthObjArray(teamDepthObjArray);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const hey = await newTeamDepthObjArray([{name:"Celtics", abbreviated: 'BOS', teamDepth:["Jayson Tatum", "Derrick White", "Kristaps Porzingis", "Jrue Holiday", "Jaylen Brown"]}]);
        //         setTeamDepthObjArray(hey);
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // };
        // fetchData()
        
        if(teamDepthObjArray.length === 0)
            fetchDepth();
    }, []);

    useEffect(() => {
        fetchPlayerStats().then(playerStatsRes => {
            let setArr = [];

            playerStatsRes.forEach(playerStat => {
                if(playerStat["abbreviated"] === currentTeam.abbreviated && IsAnActualPlayers(playerStat["name"])){
                    setArr.push(playerStat);
                }
            })
            setOnScreenCards(setArr);
        })
    }, [currentTeam]);

    return (
        <SafeAreaView style={{alignItems: 'center', width: '100%', height:"100%"}}>
            <InventoryFirstBar currentTeam={currentTeam} setPopUpInfo={setPopUpInfo} />

            <InventorySecondBar homeScreen={homeScreen} setHomeScreen={setHomeScreen}/>

            {homeScreen === "Team" ?
                <Team 
                    currentTeam={currentTeam} allPlayers={onScreenCards}
                    popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo}
                /> : null
            }

            {homeScreen === "All" ?
                <WholeTeam 
                    onScreenCards={onScreenCards} currentTeam={currentTeam} 
                    popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo}
                /> : null
            }

            {popUpInfo.popUpScreen !== "" ? 
                <PopUp 
                    currentTeam={currentTeam} setCurrentTeam={setCurrentTeam}
                    popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo}
                    allPlayers={onScreenCards}
                /> : null
            }
        </SafeAreaView>
    );
}