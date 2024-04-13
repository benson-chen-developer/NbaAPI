import { View } from "react-native"
import { Ionicons } from '@expo/vector-icons';

export const TopBar = () => {
    return(
        <View style={{width:"100%"}}>
            <Ionicons name="exit" size={40} color="white" style={{marginLeft: 10, marginBottom:20}}/>
        </View>
    )
}