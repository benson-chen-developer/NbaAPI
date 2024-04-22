import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react'
import MainAreaGames from './Games/MainAreaGames';
import { useMyContext } from '../Context/MyContext';
import { Inventory } from './Inventory/Inventory';
import LiveMainArea from './Live/LiveMainArea';
import { Navbar } from './NavBar/NavBar';
import { NavbarEnums } from '../Global/Enums/navigation';

export default function MainArea() {

    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(NavbarEnums.GAMES);
    const { user } = useMyContext();
    if(!loading) { return (
      <View style={{alignItems:'center', justifyContent:'center', width: "100%", height:'100%'}}>
        
        <View style={{height:"5%"}}/>

        <View style={{height:"86%", width:"100%"}}>
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

        <View style={{width:"100%", height:"9%"}}>
          <Navbar screen={screen} setScreen={setScreen}/>
        </View>

      </View>
    )} else {
      <Text>Loading</Text>
    }
  }