import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import { fetchLiveGameFeed } from '../../functions/GameFunctions/GamePlayFunctions';
import { GameCard } from './GameCard';
import { CapacityGames } from './CapacityGames';
import { GamesCarousel } from './GamesCarousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';

export default function MainAreaGames({setCurrentGame}) {

    const [index, setIndex] = useState(0);
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameScreen, setGameScreen] = useState("MainAreaGames");

    const {user, setUser, todayGames, setTodayGames, liveGames} = useMyContext();
    
    useEffect(() => {
      // clearGamesToday()

      setSelectedGame(todayGames[0]);

    }, []);

    if (selectedGame && todayGames.length > 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', width:"100%"}}>

          <View style={{marginTop: 50}}/>

          <View style={{width:"100%", justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
            <MaterialCommunityIcons 
                name="basketball" size={24} right={4}
                color={liveGames.length === 2 ? "#F18944" : 'white'}
            />
            <Text style={{
                color: liveGames.length === 2 ? 'white' : '#c1c6c6', 
                fontFamily:ThemeFonts, fontSize:25
            }}>
                {liveGames.length}/{user.maxLiveGames} Games
            </Text>
          </View>

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