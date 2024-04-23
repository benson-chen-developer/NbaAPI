import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { NavbarEnums } from '../../Global/Enums/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../Global/Enums/color';
import { useMyContext } from '../../Context/MyContext';

interface Props {
}

export const TopNavBar: React.FC<Props> = ({ }) => {

    const {user} = useMyContext();

  return (
    <View style={{
        justifyContent: 'flex-end', width: "100%", height:"100%"
    }}>

        <View style={{flexDirection: 'row', height:60, width:'100%', marginLeft: 20, alignItems:'center'}}>

            {/* Profile Pic */}
            <View style={{
                borderRadius:40, backgroundColor:"white", height:60, width:60,
            }}>
            </View>

            {/* SideBar */}
            <View style={{
                height:40, width: 240, position: 'absolute', marginLeft: 30,
                backgroundColor: "rgba(255,255,255, .1)", flexDirection:'row',
                borderRadius: 20, alignItems:'center', justifyContent:'flex-end'
            }}>
                <View style={{flexDirection:'row'}}>
                    <FontAwesome5 name="coins" size={24} color="#FFB305" style={{ marginRight:5}}/>
                    <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'white'}}>{user.coins}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons name="star-shooting" size={24} color="#f2e44e" style={{ left: 5, marginRight:5}} />
                    <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'white'}}>{user.allStarPoints}</Text>
                </View>

                <View style={{marginLeft: 5, marginRight: 15, flexDirection:'row'}}>
                    <MaterialCommunityIcons name="crown" size={24} color="#b44ef2" style={{left: 3, marginRight:5}}/>
                    <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'white'}}>{user.hallOfFamePoints}</Text>
                </View>
            </View>

            <View style={{marginLeft: 230}}>
                <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:30}}> 
                    {user.wins} W
                </Text>
            </View>

        </View>

    </View>
  );
}