import { TouchableOpacity, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const BackBtn = ({ func }) => { 
    return (
        <TouchableOpacity 
            style={{ width: 40, height: 40, backgroundColor: "#16202e", borderRadius: 5, alignItems: 'center' }} 
            onPress={() => func()}
        >
            <View style={{ width: 40, height: 36, backgroundColor: "#3f5980", borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export const CloseBtn = ({func}) => {
    return(
        <TouchableOpacity style={{width:40, height:40, backgroundColor:"#16202e", borderRadius:5, alignItems:'center'}} onPress={() => func()}>
            <View style={{width:40, height:36, backgroundColor:"#3f5980", borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                {/* <AntDesign name="close" size={35} color="white" /> */}
                <FontAwesome name="close" size={28} color="white" />
            </View>
        </TouchableOpacity>
    )
}
