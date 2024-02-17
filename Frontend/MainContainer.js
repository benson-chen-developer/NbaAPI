import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import { useEffect, useState } from 'react';
import InGame from './GameComponents/InGame';
import PopUp from './PopUp/PopUp';
import MainArea from './MainArea/MainArea';
import { getCurrentUser } from 'aws-amplify/auth';
import Landing from './Unauthenticated/Landing';
import { getLiveGames, getCurrentUserWithAuth } from './functions/UserFunctions';
import { useMyContext } from './Context/MyContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LoadingScreen } from './LoadingScreen';

export default function MainContainer() {

  const [currentGame, setCurrentGame] = useState(null);
  const [popUp, setPopUp] = useState(null);

  const [userLoading, setUserLoading] = useState(false);
  const { user, setUser, loading, liveGames, setLiveGames } = useMyContext();

  
  useEffect(() => {
    async function fetchUser() {
      setUserLoading(true);
  
      try {
        // const { username, userId, signInDetails } = await getCurrentUser();
  
        getCurrentUserWithAuth(user).then(userRes => {
            // console.log("MainContainer: User", JSON.stringify(userRes, null, 2));
            setUser(userRes);

            getLiveGames(userRes).then(liveGamesRes => {
              // console.log("MainContainer: LiveGames", JSON.stringify(liveGamesRes, null, 2));
              setLiveGames(liveGamesRes);
              setUserLoading(false);
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

  if(userLoading){
    return(
      <Text>Loading</Text>
    )
  }

  else 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#121724' }}>
      <StatusBar style={{color: "white"}} />

      <View style={{flex:1}}>
        {user ?
          <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
            {currentGame ? 
              <InGame currentGame={currentGame} setCurrentGame={setCurrentGame}/>
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
    </SafeAreaView>
  );
}