import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import TeamItem from './TeamItem';
import { useMyContext } from '../../Context/MyContext';
import { fetchLiveGameFeed } from '../../functions/GamePlayFunctions';
import { fakeData } from '../../functions/FakeGameData';
import UpperTabs from './UpperTabs';
import { getGamesToday } from '../../functions/AsyncStorage';
import { GameCard } from './GameCard';

export default function MainAreaGames({setCurrentGame}) {

    const [index, setIndex] = useState(0);
    const [gameScreen, setGameScreen] = useState("MainAreaGames");

    const {user, setUser, todayGames, setTodayGames} = useMyContext();
    
    useEffect(() => {
      // if(user.todayGames.length === 0){
      //   fetchLiveGameFeed(user).then(res => {
      //     setUser((prevUser) => {
      //       return { ...prevUser, todayGames: res };
      //     });
      //   })
      // }

      getGamesToday().then(todayGamesRes => {
        // console.log(todayGamesRes)
        setTodayGames(todayGamesRes);
      })

      // console.log("Type of user.todayGames[index]:", typeof JSON.parse(JSON.stringify(user.todayGames[index])));
      setUser(p => {
        return {...p, todayGames: fakeData}
      })
    }, []);

    if (todayGames.length > 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:"100%" }}>
          {/* <TeamItem game={user.todayGames[index]} /> */}

          {/* {todayGames.map((game, index) => (
              <GameCard key={index} game={game} />
          ))} */}

          <GameCard key={index} game={todayGames[0]} />

        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }