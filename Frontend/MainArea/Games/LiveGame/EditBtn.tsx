import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const EditBtn = ({editPress}) => {
    const orange = "#FFAE57"; 

    return (
        <TouchableOpacity style={{
            width:90, height:45, borderColor: orange, borderWidth:2,
            justifyContent:'space-evenly', alignItems:'center', borderRadius:10,
            flexDirection:'row'
        }} onPress={() => editPress()}>
            <Feather name="edit" size={24} color={orange} />
            <Text style={{color: orange, fontFamily:'Roboto-Bold', fontSize:20}}>Edit</Text>
        </TouchableOpacity>
    )
}
