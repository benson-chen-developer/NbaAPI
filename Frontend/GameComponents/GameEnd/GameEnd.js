import { useNavigation } from "@react-navigation/native";
import { View, Text, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultBtn } from "../../../assets/Buttons";
import { abbreviateName } from "../../../assets/TeamLogos/getTeamLogo";

export const GameEnd = ({route}) => {

    const { game } = route.params;
    const navigation = useNavigation();
    const imgSize = 100;

    const onPress = () => {
        navigation.navigate("Main");
    }

    console.log("GameEnd", game)

    return(
        <SafeAreaView style={{width:"100%", height:"100%", backgroundColor:'#111A2B', alignItems:'center'}}>
            
            <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:30}}>
                Final
            </Text>

            <View style={{width:"70%", alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                {/* <Image source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${abbreviateName(game.teams[0].teamName)}.png&h=200&w=200`}}/> */}
                <Image 
                    style={{width:imgSize, height:imgSize}}
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png`}}
                />

                <Image 
                    style={{width:imgSize, height:imgSize}}
                    source={{uri: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/wsh.png`}}
                />
            </View>

            <View style={{width:"70%", alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:30}}>
                    125
                </Text>
                <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:30}}>
                    165
                </Text>
            </View>

            <DefaultBtn 
                text={"Home"} size={100}
                mainColor={"#6CB8F4"} secondColor={"#4280b1"} 
                func={onPress}
            />  
        </SafeAreaView>
    )
}
