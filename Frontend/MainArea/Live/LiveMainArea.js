import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import LiveGameSlip from './LiveGameSlip';
import { useMyContext } from '../../Context/MyContext';
import { PreGameMatrix } from '../../GameComponents/PreGamePhase/PreGameMatrix';

export default function LiveMainArea({setCurrentGame}) {

    const {user, liveGames} = useMyContext();
    const [selectedLiveGame, setSelectedLiveGame] = useState(null);

    // const findGameById = (id) => {
    //     // console.log("LiveMainAreas.ks user", user.liveGames.find(element => JSON.parse(element).id === id))
    //     return user.liveGames.find(element => JSON.parse(element).id === id)
    // }
    

    useEffect(() => {
      // if(user.todayGames.length === 0){
      //   fetchLiveGameFeed(user).then(res => {
      //     setUser((prevUser) => {
      //       return { ...prevUser, todayGames: res };
      //     });
      //   })
      // }
    //   user.liveGames.forEach(i => console.log( JSON.parse(i).id))
    //   console.log("MainAreaLive", user.liveGames)
    }, []);

    if(selectedLiveGame){
        return(
            <View style={{flex:1, width:"100%", height:"100%", alignItems:'center',}}>
                <PreGameMatrix game={selectedLiveGame}/>
            </View>
        )
    }

    return(
        <View style={{
            flex:1, width:"100%", height:"100%", alignItems:'center',
        }}>
            <View style={{marginTop: 100}}/>

            {liveGames.map((game, index) => {
                return <LiveGameSlip 
                    key={index} index={index} game={game} 
                    setSelectedLiveGameId={setSelectedLiveGame}
                />;
            })}

        </View>
    )
}