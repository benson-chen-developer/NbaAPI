import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import LiveGameSlip from './LiveGameSlip';
import { useUser } from '../../Context/UserContext';
import { PreGame } from './PreGame/PreGame';

export default function MainAreaLive({setCurrentGame}) {

    const {user} = useUser();
    const [selectedLiveGameId, setSelectedLiveGameId] = useState(null);

    const findGameById = (id) => {
        return user.playerGames.find(element => JSON.parse(element).gameId === id);
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

            {user.playerGames.map((game, index) => {
                return <LiveGameSlip 
                    key={index} index={index} game={JSON.parse(game)} 
                    setSelectedLiveGameId={setSelectedLiveGameId}
                />;
            })}

        </View>
    )
}