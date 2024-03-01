import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import LiveGameSlip from './LiveGameSlip';
import { useMyContext } from '../../Context/MyContext';
import { PreGameMatrix } from '../../GameComponents/PreGamePhase/PreGameMatrix';

export default function LiveMainArea({setCurrentGame}) {

    const {user, liveGames} = useMyContext();

    useEffect(() => {
    //   user.liveGames.forEach(i => console.log( JSON.parse(i).id))
    //   console.log("MainAreaLive", liveGames)
    }, []);

    return(
        <View style={{
            flex:1, width:"100%", height:"100%", alignItems:'center',
        }}>
            <View style={{marginTop: 100}}/>

            {liveGames.map((game, index) => {
                return <LiveGameSlip 
                    key={index} index={index} game={game} 
                />;
            })}

            {liveGames.length === 0 ?
                <Text style={{color:'white'}}>No Games</Text>
                    :
                null
            }
        </View>
    )
}