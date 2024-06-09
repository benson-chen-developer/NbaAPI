import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { useMyContext } from '../../Context/MyContext';
import { fetchLiveGameFeed } from '../../functions/GameFunctions/GamePlayFunctions';
import { GameCard } from './GameCard';
import { CapacityGames } from './CapacityGames';
import { GamesCarousel } from './GamesCarousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';
import { PickingPlayers } from './PickingPlayers/PickingPlayers';
import { LiveGame } from './LiveGame/LiveGame';

export default function MainAreaGames({setCurrentGame}) {
    enum Screens{
      HOME = "home",
      PICKING_PLAYERS = "pickingPlayers"
    }

    const [index, setIndex] = useState<number>(0);
    const [selectedGame, setSelectedGame] = useState(null);
    const [pickedPlayers, setPickedPlayers] = useState<string[]>([]);
    const [screen, setScreen] = useState<Screens>(Screens.HOME);

    const {user, setUser, todayGames, setTodayGames, liveGames} = useMyContext();
    
    useEffect(() => {
      // clearGamesToday()

      setSelectedGame(todayGames[0]);

    }, []);

    if(liveGames.length > 0 && screen !== Screens.PICKING_PLAYERS) return (
      <LiveGame setPickedPlayers={setPickedPlayers} setScreen={setScreen}/>
    )

    if(screen === Screens.PICKING_PLAYERS) return (
      <PickingPlayers 
        gameId={selectedGame.id}
        pickedPlayers={liveGames[0].player1Depth}
        setScreen={setScreen}
      />
    )

    if (selectedGame && todayGames.length > 0 && screen === Screens.HOME) {
      return (
        <View style={{ flex: 1, alignItems: 'center', width:"100%"}}>

          <View style={{marginTop: 20}}/>

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

          <TouchableOpacity onPress={() => setScreen(Screens.PICKING_PLAYERS)}>
            <Text style={{color:'#fff'}}>Go to pciking players</Text>
          </TouchableOpacity>

        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
}