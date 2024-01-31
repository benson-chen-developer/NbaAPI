import { Text, TouchableOpacity, View, Image } from 'react-native';

export default function MultiTeamBox({todayGames}) {

    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Image 
          source={{ uri: game.teams.home.logo}}
          style={{ width: 100, height: 100 }}
        />
        <Text>{game.teams.home.nickname} vs</Text> 

        <Image 
          source={{ uri: game.teams.visitors.logo}}
          style={{ width: 100, height: 100 }}
        />
        <Text>{game.teams.visitors.nickname}</Text>

        <TouchableOpacity><Text>Play</Text></TouchableOpacity>
      </View>
    )
}