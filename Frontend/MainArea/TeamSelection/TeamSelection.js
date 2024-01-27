import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import TeamItem from './TeamItem';
import { useUser } from '../../Context/UserContext';
import { fetchLiveGameFeed } from '../../functions/GamePlayFunctions';
import { fakeData } from '../../functions/FakeGameData';

export default function TeamSelection({setCurrentGame}) {

    const [index, setIndex] = useState(0);
    const {user, setUser} = useUser();
    
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
          <TeamItem game={user.todayGames[index]} />
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }