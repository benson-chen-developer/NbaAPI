import { Text, TouchableOpacity, View } from 'react-native';
import {leaveGame, readyUp} from '../functions/GameStartFunctions';
import { useEffect, useState } from 'react';
import * as subscriptions from '../../src/graphql/subscriptions';
import { generateClient } from 'aws-amplify/api';
import PrepScreen from './PrepPhase/PrepScreen';

export default function InGame({user, currentGame, setCurrentGame}) {

    const client = generateClient();
    const [gameSubscription, setGameSubscription] = useState(null);
    const [currentGamePhase, setCurrentGamePhase] = useState("Loading");

    // This to set up the connection to the game
    useEffect(() => {
      const subscription = client
        .graphql({
          query: subscriptions.onUpdateMatrix,
          filter: {
            id: { eq: currentGame.id },
          },
        })
        .subscribe({
          next: ({ data }) => {
            console.log("Subbed to Game (InGame.js)", data);
            setCurrentGame(data.onUpdateMatrix);
          },
          error: (error) => console.warn(error),
        });
  
      setGameSubscription(subscription);
  
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, [currentGame]);

    // Leave the game
    const handleLeaveGame = () => {
      leaveGame(currentGame, user.id).then((res) => {
        if (res.isStarted) {

        } else {
          setCurrentGame(null);
          if (gameSubscription) {
            gameSubscription.unsubscribe();
          }
        }
      });
    };

    // Ready Up
    const readyUpPress = () => {
      readyUp(currentGame, user.id);
      setCurrentGame(p => ({
        ...p,
        player1Ready: p.player1Id === user.id ? !p.player1Ready : p.player1Ready,
        player2Ready: p.player2Id === user.id ? !p.player2Ready : p.player2Ready,
      }))
    }

    return (
      <View style={{width:"50%", height:200}}>
        
        {currentGame.player2Id === "empty" ? <LoadingScreen /> : null}

        {!currentGame.started && currentGame.player2Id !== "empty" ? 
          <PrepScreen 
            currentGame={currentGame}
            readyUpPress={readyUpPress}
            handleLeaveGame={handleLeaveGame}
          /> 
            : 
          null
        }

      </View>
    );
  }