import { Text, TouchableOpacity, View } from 'react-native';

export default function PopUp({popUp, setPopUp}) {

    return (
        <View style={{
            flex:1, backgroundColor: "rgba(0, 0, 0, .5)", position: "absolute",
            justifyContent:'center', alignItems:'center', width:'100%', height:'100%'
        }}>
            <View style={{
                width: 100, height:50, backgroundColor:'white'
            }}>
                <Text>Hi there dude</Text>
            </View>
        </View>
    );
  }