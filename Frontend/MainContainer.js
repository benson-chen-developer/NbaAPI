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
import { getCurrentUserWithAuth } from './functions/UserFunctions';
import { UserProvider, useUser } from './Context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function MainContainer() {

  const [currentGame, setCurrentGame] = useState(null);
  const [popUp, setPopUp] = useState(null);

  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
  
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
  
        getCurrentUserWithAuth(userId).then(res => {
          setUser({
            id: res.id,
            email: res.email,
            userId: res.userId,
            score: res.score,
            todayGames: res.todayGames,
            playersArray: res.playersArray
          });
  
          setLoading(false);
        });
      } catch (err) {
  
        console.log("App.js, the user is not logged in basically.")
        console.log(err);
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [])

  if(loading){
    return(
      <Text>Loading</Text>
    )
  }

  else 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#050614' }}>
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
    </SafeAreaView>
  );
}