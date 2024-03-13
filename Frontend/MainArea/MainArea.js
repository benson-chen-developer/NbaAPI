import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react'
import MainAreaGames from './Games/MainAreaGames';
import { useMyContext } from '../Context/MyContext';
import Inventory from './Inventory/Inventory';
import Navbar from './NavBar/Navbar';
import LiveMainArea from './Live/LiveMainArea';

export default function MainArea() {

    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState("Games");
    const { user } = useMyContext();

    if(!loading) { return (
      <View style={{alignItems:'center', justifyContent:'center', width: "100%", height:'100%'}}>
        
        {screen === "Games" ?
          <MainAreaGames /> 
            : 
          null
        }

        {screen === "Inventory" ?
          <Inventory /> 
            : 
          null
        }

        {screen === "Live" ?
          <LiveMainArea /> 
            : 
          null
        }

        {screen === "Profile" ?
          null
            :
          null
        }

        <Navbar setScreen={setScreen}/>
      </View>
    )} else {
      <Text>Loading</Text>
    }
  }