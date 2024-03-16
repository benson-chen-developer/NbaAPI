import { Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import { getPlayerStatsToday } from '../../functions/AsyncStorage';
import { IsAnActualPlayers } from '../../../assets/AcutalPlayers';
import { PopUp } from './PopUp/PopUp';
import { InventorySecondBar } from './InventorySecondBar';
import { InventoryFirstBar } from './InventoryFirstBar';
import { WholeTeam } from './WholeTeam/WholeTeam';
import { Team } from './Team/Team';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Inventory() {
    
    const {playerStats, teamDepthObjArray, setTeamDepthObjArray} = useMyContext();

    const [onScreenCards, setOnScreenCards] = useState([]);
    const [currentTeam, setCurrentTeam] = useState(teamDepthObjArray.find(teamDepthObj => teamDepthObj.name === "Celtics"));
    const [homeScreen, setHomeScreen] = useState("All");

    const [popUpInfo, setPopUpInfo] = useState({
        popUpScreen: "",
        player: null,
        teamDepth: null
    });

    useEffect(() => {
        let setArr = [];

        playerStats.forEach(playerStat => {
            if(playerStat["abbreviated"] === currentTeam.abbreviated){
                setArr.push(playerStat);
            }
        })
        setOnScreenCards(setArr);
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