import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import LiveGameSlip from './LiveGameSlip';

export default function MainAreaLive({setCurrentGame}) {

    useEffect(() => {
      // if(user.todayGames.length === 0){
      //   fetchLiveGameFeed(user).then(res => {
      //     setUser((prevUser) => {
      //       return { ...prevUser, todayGames: res };
      //     });
      //   })
      // }

      // console.log("Type of user.todayGames[index]:", typeof JSON.parse(JSON.stringify(user.todayGames[index])));
    }, []);

    const game = {
        player1Id: "112",
        player2Id: "Benson",
        team1: "Detroit Pistons",
        team2: "Houston Rockets"
    }
    return(
        <View style={{
            flex:1, width:"100%", height:"100%", alignItems:'center',
        }}>
            <View style={{marginTop: 100}}/>
            <LiveGameSlip game={game}/>
            <LiveGameSlip game={game}/>
        </View>
    )
}