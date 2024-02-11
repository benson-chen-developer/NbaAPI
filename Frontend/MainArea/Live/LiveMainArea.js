import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import LiveGameSlip from './LiveGameSlip';
import { useMyContext } from '../../Context/MyContext';
import { PreGame } from './PreGame/PreGame';

export default function LiveMainArea({setCurrentGame}) {

    const {user} = useMyContext();
    const [selectedLiveGameId, setSelectedLiveGameId] = useState(null);

    const findGameById = (id) => {
        return user.liveGames.find(element => JSON.parse(element).id === id);
    }
    

    useEffect(() => {
      // if(user.todayGames.length === 0){
      //   fetchLiveGameFeed(user).then(res => {
      //     setUser((prevUser) => {
      //       return { ...prevUser, todayGames: res };
      //     });
      //   })
      // }
    //   console.log("MainAreaLive", selectedLiveGameId)
    }, []);

    if(selectedLiveGameId){
        return(
            <View style={{flex:1, width:"100%", height:"100%", alignItems:'center',}}>
                <PreGame game={findGameById(selectedLiveGameId)}/>
            </View>
        )
    }

    return(
        <View style={{
            flex:1, width:"100%", height:"100%", alignItems:'center',
        }}>
            <View style={{marginTop: 100}}/>

            {user.liveGames.map((game, index) => {
                return <LiveGameSlip 
                    key={index} index={index} game={JSON.parse(game)} 
                    setSelectedLiveGameId={setSelectedLiveGameId}
                />;
            })}

        </View>
    )
}