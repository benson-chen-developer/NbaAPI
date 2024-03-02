import { TouchableOpacity, Text, StyleSheet, View } from "react-native"

export const SelectBtn = ({onPress}) => {
    return(
        <TouchableOpacity style={styles.main} onPress={() => onPress()}>
            <View style={styles.inner}> 
                <Text style={{color:'white', fontSize: 25, fontFamily:'Roboto-Bold'}}>
                    Pick
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        width:100, height:50, alignItems:'center',
        backgroundColor: '#fa05c0', borderRadius: 10
    },
    inner:{
        width:"100%", height:"95%", justifyContent:'center', alignItems:'center',
        backgroundColor: '#db05fa', borderRadius: 10
    }
})