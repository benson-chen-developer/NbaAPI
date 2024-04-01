import { useEffect, useState } from "react";
import { View, Text } from "react-native"
import Pie from 'react-native-pie'

export const ProgressWheel = ({players}) => {
  const total = players.reduce((acc, player) => acc + player.number, 0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let sectionsRet = [];
    if(total === 0){
      sectionsRet = [{percentage: 100, color: "#737373"}]
    } else {
      players.forEach(player => {
        if((player.number / total) > 0){
          sectionsRet.push({percentage: (player.number / total).toFixed(1) * 100, color:player.color})
        }
      })
    }

    setSections(sectionsRet);
  }, [])

  return(
      <View style={{width:"50%", alignItems:'center', justifyContent:'center'}}>
        <Pie
          radius={70}
          innerRadius={45}
          sections={sections}
          backgroundColor="#1F202D"
          // backgroundColor="white"
          dividerSize={5}
          strokeCap={'butt'}
        />
        <View style={{position:'absolute'}}>
          <Text style={{fontSize:45, color:"white", fontFamily:'Roboto-Bold'}}>
            {total}
          </Text>
        </View>
      </View>
  )
}