import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useUser } from '../../Context/UserContext';
import { startSearchForGame } from '../../functions/GameStartFunctions';
import { themeColors } from '../../../assets/Themes/ThemeColors';
import { ThemeFonts } from '../../../assets/Themes/ThemeFont';

export default function TeamItem({game}) {
    const {mainSelectedColor} = themeColors;
    const {user} = useUser();
    const [selected, setSelected] = useState(null);

    return (
      <View style={{
        width:"100%", height:"50%",
        alignItems:'center', justifyContent:'center'
      }}>

        <View style={{
          alignItems:'center', justifyContent:'center',
          flexDirection:'row', width:"100%", justifyContent:'space-around'
        }}>
          <SideBlock 
            team={game.teams.home}
            setSelected={setSelected} selected={selected}
          />
          <SideBlock 
            team={game.teams.visitors}
            setSelected={setSelected} selected={selected}
          />
        </View>

        {/* Play Btn */}
        <View style={{
          height: 50, alignItems:'center', marginTop: 20, width:100
        }}>
          {selected ? 
            <TouchableOpacity 
              style={{
                width:"100%", height: "100%", backgroundColor: mainSelectedColor,
                borderRadius: 10, justifyContent:'center', alignItems:'center'
              }}
              onPress={() => {
                startSearchForGame(user.userId, selected)
                  .then((res) => {
                  console.log("MainMenu", res)
                  // setCurrentGame(res);
              })
            }}>
              <Text style={{
                color:'#FFFFFF', fontFamily: ThemeFonts, fontSize: 22
              }}>
                Play
              </Text>
            </TouchableOpacity>
              : 

            <View 
              style={{
                width:"100%", height: "100%", backgroundColor: mainSelectedColor,
                borderRadius: 10, justifyContent:'center', alignItems:'center',
                opacity: .5
              }}
            >
              <Text style={{
                fontFamily: ThemeFonts, fontSize: 22, color:'#FFFFFF'
              }}>
                Play
              </Text>
            </View>
          }
        </View>
        
      </View>
    )
}

const SideBlock = ({team, setSelected, selected}) => {
  return(
    <TouchableOpacity style={{ 
      borderWidth: team.nickname !== selected ? 2 : 3, 
      borderColor: team.nickname !== selected ? 'grey' : "#b5932d", 
      backgroundColor: team.nickname !== selected ? "white" : "#fcf528",
      borderRadius: 15, width:150, height:150, 
      justifyContent:'center', alignItems:'center' 
    }} onPress={() => setSelected(team.nickname)}>

      <Image 
        source={{ uri: team.logo }}
        style={{ width: 100, height: 100, borderRadius: 2 }}
      />
      <Text>{team.nickname}</Text> 

    </TouchableOpacity>
  )
}