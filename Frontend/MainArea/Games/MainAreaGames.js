import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import { fetchLiveGameFeed } from '../../functions/GamePlayFunctions';
import { fakeData } from '../../functions/FakeGameData';
import { getGamesToday } from '../../functions/AsyncStorage';
import { GameCard } from './GameCard';
import { GamesCarousel } from './GamesCarousel';

export default function MainAreaGames({setCurrentGame}) {

    const [index, setIndex] = useState(0);
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameScreen, setGameScreen] = useState("MainAreaGames");

    const {user, setUser, todayGames, setTodayGames} = useMyContext();
    
    useEffect(() => {
      getGamesToday().then(todayGamesRes => {
        // console.log(todayGamesRes)
        setTodayGames(todayGamesRes);
        setSelectedGame(todayGamesRes[0]);
      })

      // console.log("Type of user.todayGames[index]:", typeof JSON.parse(JSON.stringify(user.todayGames[index])));
      setUser(p => {
        return {...p, todayGames: fakeData}
      })
    }, []);

    if (selectedGame && todayGames.length > 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', width:"100%"}}>

          <View style={{marginTop: 100}}/>

          <GamesCarousel games={todayGames} selectedGame={selectedGame} setSelectedGame={setSelectedGame}/>

          <GameCard key={index} game={selectedGame} />

        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
}