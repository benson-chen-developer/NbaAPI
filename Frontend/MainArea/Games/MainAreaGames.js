import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import TeamItem from './TeamItem';
import { useMyContext } from '../../Context/MyContext';
import { fetchLiveGameFeed } from '../../functions/GamePlayFunctions';
import { fakeData } from '../../functions/FakeGameData';
import UpperTabs from './UpperTabs';

export default function MainAreaGames({setCurrentGame}) {

    const [index, setIndex] = useState(0);
    const [gameScreen, setGameScreen] = useState("MainAreaGames");
    const {user, setUser} = useMyContext();
    
    useEffect(() => {
      // if(user.todayGames.length === 0){
      //   fetchLiveGameFeed(user).then(res => {
      //     setUser((prevUser) => {
      //       return { ...prevUser, todayGames: res };
      //     });
      //   })
      // }

      // console.log("Type of user.todayGames[index]:", typeof JSON.parse(JSON.stringify(user.todayGames[index])));
      setUser(p => {
        return {...p, todayGames: fakeData}
      })
    }, []);

    if (user.todayGames.length > 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <UpperTabs setGameScreen={setGameScreen} />
          <TeamItem game={user.todayGames[index]} />
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }