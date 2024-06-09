import { Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MainAreaGames from './Games/MainAreaGames';
import { useMyContext } from '../Context/MyContext';
import { Inventory } from './Inventory/Inventory';
import LiveMainArea from './Live/LiveMainArea';
import { Navbar } from './NavBar/NavBar';
import { NavbarEnums } from '../Global/Enums/navigation';
import { TopNavBar } from './NavBar/TopNavBar';
import { TeamData } from '../Global/Types/ContextTypes';
import { PlayerStats } from '../Global/Types/PlayerTypes';
import { BottomSheetViewMine } from './BottomSheet/BottomSheetViewMine';

export default function MainArea() {

    const [loading, setLoading] = useState<boolean>(false);
    const [screen, setScreen] = useState<NavbarEnums>(NavbarEnums.GAMES);
    const { 
      user, playerStats, teamDataContext, 
      bottomSheetPlayerName, setBottomSheetPlayerName 
    } = useMyContext();

    /* The Bottom Sheet Stuff */
    const snapPoints = useMemo(() => ["85%"], [])
    const bottomSheetRef = useRef<BottomSheet>(null)
    const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
    const handleClosePress = () => bottomSheetRef.current?.close();
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    , [])

    const [teamInfo, setTeamInfo] = useState<TeamData>(null);
    const [selectedPlayerStats, setSelectedPlayerStats] = useState<PlayerStats>(null);

    useEffect(() => {
      if(bottomSheetPlayerName === "") return;

      let selectedPlayerStats = playerStats.find(player => player.name === bottomSheetPlayerName);
      let teamInfo = teamDataContext.find(team => team.abbreviated === selectedPlayerStats.abbreviated)
      let playerExtraInfo = teamInfo.players.find(p => p.name === bottomSheetPlayerName);

      setTeamInfo(teamInfo);
      setSelectedPlayerStats(selectedPlayerStats);
      handleOpenPress();
    }, [bottomSheetPlayerName, setBottomSheetPlayerName])

    if(!loading) { return (
      <View style={{alignItems:'center', justifyContent:'center', width: "100%", height:'100%'}}>
        
        <View style={{width:"100%", height:"12%"}}>
          <TopNavBar />
        </View>

        <View style={{height:"80%", width:"100%"}}>
          {screen === NavbarEnums.GAMES ?
            <MainAreaGames /> 
              : 
            null
          }

          {screen === NavbarEnums.PLAYERS ?
            <Inventory /> 
              : 
            null
          }

          {screen === NavbarEnums.LIVE ?
            <LiveMainArea /> 
              : 
            null
          }
        </View>

        <View style={{width:"100%", height:"8%"}}>
          <Navbar screen={screen} setScreen={setScreen}/>
        </View>

        {bottomSheetPlayerName !== "" && teamInfo ? 
          <BottomSheet 
              ref={bottomSheetRef} 
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              backdropComponent={renderBackdrop}
              handleIndicatorStyle={{backgroundColor:'white'}}
              backgroundStyle={{backgroundColor: teamInfo.mainColor}}
          >
              <BottomSheetViewMine 
                imgUrl={teamInfo.imgUrl}
                mainColor={teamInfo.mainColor}
                playerStats={selectedPlayerStats}
              />
          </BottomSheet> : null
        }
      </View>
    )} else {
      <Text>Loading</Text>
    }
  }