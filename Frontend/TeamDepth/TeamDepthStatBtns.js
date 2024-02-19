import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native"

export const TeamDepthStatBtns = ({selectedStat, setSelectedStat}) => {

    const stats = ["PTS", "REB", "AST", "STL", "BLK"];

    return(
        <View  style={{ flex: 1, width: "100%", alignItems:'center' }}>
            <ScrollView style={{ flex: 1, width: "90%" }} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {stats.map((stat, index) => (
                    <TouchableOpacity 
                        key={index} style={stat === selectedStat ? styles.sel : styles.notSel} 
                        onPress={() => setSelectedStat(stat)}
                    >
                        <Text>
                            {stat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    notSel: {
        width: 90, height: 40, backgroundColor: 'red', marginRight: 10,
        borderRadius:10, alignItems:'center', justifyContent:'center'
    },
    sel: {
        width: 90, height: 40, backgroundColor: 'blue', marginRight: 10,
        borderRadius:10, alignItems:'center', justifyContent:'center'
    },
})