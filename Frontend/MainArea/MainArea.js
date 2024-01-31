import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react'
import MainAreaGames from './Games/MainAreaGames';
import { useUser } from '../Context/UserContext';
import Inventory from './Inventory/Inventory';
import Navbar from './NavBar/Navbar';
import MainAreaLive from './Live/MainAreaLive';
import { Matrix } from '../GameComponents/Matrix/Matrix';
import { fakeMatrix } from '../functions/FakeGameData';

export default function MainArea() {

    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState("Games");
    const { user } = useUser();

    if(!loading) { return (
      <View style={{
        flex:1, alignItems:'center', justifyContent:'center', width: "100%"
      }}>
        
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
          <MainAreaLive /> 
            : 
          null
        }

        {screen === "Profile" ?
          <Matrix matrix={fakeMatrix}/> 
            :
          null
        }

        <Navbar setScreen={setScreen}/>
      </View>
    )} else {
      <Text>Loading</Text>
    }
  }