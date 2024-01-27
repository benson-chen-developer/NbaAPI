import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react'
import TeamSelection from './TeamSelection/TeamSelection';
import { useUser } from '../Context/UserContext';
import Inventory from './Inventory/Inventory';
import Navbar from './NavBar/Navbar';

export default function MainArea() {

    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState("games");
    const { user } = useUser();

    if(!loading) { return (
      <View style={{
        flex:1, alignItems:'center', justifyContent:'center', width: "100%"
      }}>
        
        {screen === "games" ?
          <TeamSelection /> 
            : 
          null
        }

        {screen === "inventory" ?
          <Inventory /> 
            : 
          null
        }

        <Navbar setScreen={setScreen}/>
      </View>
    )} else {
      <Text>Loading</Text>
    }
  }