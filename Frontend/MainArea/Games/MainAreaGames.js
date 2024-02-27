import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import { fetchLiveGameFeed } from '../../functions/GamePlayFunctions';
import { fakeData } from '../../functions/FakeGameData';
import { clearGamesToday, getGamesToday } from '../../functions/AsyncStorage/AsyncGetTodayGames';
import { GameCard } from './GameCard';
import { CapacityGames } from './CapacityGames';
import { GamesCarousel } from './GamesCarousel';

export default function MainAreaGames({setCurrentGame}) {

    const [index, setIndex] = useState(0);
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameScreen, setGameScreen] = useState("MainAreaGames");

    const {user, setUser, todayGames, setTodayGames} = useMyContext();
    
    useEffect(() => {
      // clearGamesToday()
      // getGamesToday().then(todayGamesRes => {
      //   // console.log("MainAreaGames.js",todayGamesRes)
      //   setTodayGames(todayGamesRes);
      //   setSelectedGame(todayGamesRes[0]);
      // })

      setSelectedGame(todayGames[0]);

      setUser(p => {
        return {...p, todayGames: fakeData}
      })
    }, []);

    if (selectedGame && todayGames.length > 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', width:"100%"}}>

          <View style={{marginTop: 50}}/>

          <CapacityGames />

          {todayGames[0].homeTeam !== "No Games" ?
            <GamesCarousel 
              games={todayGames} 
              selectedGame={selectedGame} setSelectedGame={setSelectedGame}
            /> : null
          }

          {todayGames[0].homeTeam !== "No Games" ?
            <GameCard key={index} game={selectedGame} /> : null
          }

          {todayGames[0].homeTeam === "No Games" ? 
            <Text style={{color:'white'}}>No games today</Text> 
              : 
            null
          }

        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
}