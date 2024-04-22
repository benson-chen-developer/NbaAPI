import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { NavbarEnums } from '../../Global/Enums/navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../Global/Enums/color';

interface Props {
    screen: string
    setScreen: Dispatch<SetStateAction<string>>
}

export const Navbar: React.FC<Props> = ({ screen, setScreen }) => {
  return (
    <View style={{
        flexDirection: 'row', justifyContent: 'space-around',
        alignItems: 'center', width: "100%", height:"100%"
    }}>
      <Button name={NavbarEnums.PLAYERS} screen={screen} setScreen={setScreen}/>
      <Button name={NavbarEnums.GAMES} screen={screen} setScreen={setScreen}/>
      <Button name={NavbarEnums.LIVE} screen={screen} setScreen={setScreen}/>
    </View>
  );
}

const Button = ({screen, name, setScreen}) => {
    return(
        <TouchableOpacity 
            onPress={() => setScreen(name)} 
            style={{
               flex:1, backgroundColor: "#000", alignItems:'center',
               height:"100%", justifyContent:'flex-end'
            }}
        >
            {name === NavbarEnums.LIVE ? 
                <MaterialCommunityIcons 
                    name="scoreboard" size={30} color={screen === name ? Colors.green : "#fff"}  
                /> 
                        : 
                null
            }
            {name === NavbarEnums.PLAYERS ? 
                <FontAwesome5 name="portrait" size={28} color={screen === name ? Colors.green : "#fff"} /> 
                    :
                null
            }
            {name === NavbarEnums.GAMES ?
                <FontAwesome5 name="receipt" size={28} color={screen === name ? Colors.green : "#fff"} /> 
                    : 
                null
            }
            
            <Text style={{
                fontSize: 20, color: screen === name ? Colors.green : "#fff",
                fontFamily:'Roboto-Bold', marginBottom: 15
            }}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}