import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import { useEffect, useState } from 'react';
import PopUp from './PopUp/PopUp';
import MainArea from './MainArea/MainArea';
import { getCurrentUser } from 'aws-amplify/auth';
import Landing from './Unauthenticated/Landing';
import { getLiveGames, getCurrentUserWithAuth } from './functions/UserFunctions';
import { useMyContext } from './Context/MyContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LoadingScreen } from './LoadingScreen';
import { AsyncDailyCheck } from './functions/AsyncStorage';
import { getPlayerStatsToday, getTeamDataAWS } from './functions/AsyncStorage/PlayerStats';
import {getTodayTmrGames} from './functions/AsyncStorage/TodayTmrGames';
import { GetLiveGames } from './functions/StartUp/LiveGames';

export default function MainContainer() {

  const [currentGame, setCurrentGame] = useState(null);
  const [popUp, setPopUp] = useState(null);

  const [userLoading, setUserLoading] = useState(false);
  const [liveGameLoading, setLiveGameLoading] = useState(false);
  const [todayTmrGamesLoading, setTodayTmrGamesLoading] = useState(false);
  const [playerStatsLoading, setPlayerStatsLoading] = useState(false);

  const { 
    user, setUser, 
    setPlayerStats, 
    loading, 
    setLiveGames, 
    setTodayGames,
    setTeamDataContext
  } = useMyContext();

  
  useEffect(() => {
    async function fetchUser() {
      setUserLoading(true);
      setLiveGameLoading(true);
      setTodayTmrGamesLoading(true);
      setPlayerStatsLoading(true);
  
      try {
        // const { username, userId, signInDetails } = await getCurrentUser();
  
        AsyncDailyCheck().then(regrabInfo => {
          // console.log("Main RegrabInfo?" ,regrabInfo)

          getTeamDataAWS().then(teamDataRes => {
            setTeamDataContext(teamDataRes);
            
            getPlayerStatsToday(regrabInfo, teamDataRes).then(playerStatsRes => {
              // playerStatsRes.forEach(p => {
              //   console.log("p", p)
              // })
              setPlayerStats(playerStatsRes);
              setPlayerStatsLoading(false);
            })
          })

          getTodayTmrGames(regrabInfo).then(todayTmrGamesRes => {
            setTodayGames(todayTmrGamesRes);
            setTodayTmrGamesLoading(false);
          })
        })

        getCurrentUserWithAuth(user).then(userRes => {
            setUser(userRes);

            GetLiveGames(userRes.id).then(liveGamesRes => {
              // console.log("MainContainer: Livegames", JSON.stringify(liveGamesRes, null, 2));
              setLiveGames(liveGamesRes);
              setLiveGameLoading(false);
            })
        });
      } catch (err) {
  
        console.log("App.js, the user is not logged in basically.")
        console.log(err);
        setUserLoading(false);
      }
    }
    
    fetchUser();
  }, [])

  if(todayTmrGamesLoading || liveGameLoading || playerStatsLoading){
    return(
      <Text>Loading</Text>
    )
  }

  else 

  return (
    <View style={{ flex: 1, backgroundColor:'#121724' }}>
      <StatusBar style={{color: "white"}} />

      <View style={{flex:1}}>
        {user ?
          <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
            {currentGame ? 
              null
                :
              <MainArea setCurrentGame={setCurrentGame}/>
            }

            {popUp ?
              <PopUp popUp={popUp} setPopUp={setPopUp}/>
                :
              null
            }
          </View>
            :
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Landing />
          </View>
        }
      </View>

      {loading ?
        <LoadingScreen /> : null
      }
    </View>
  );
}