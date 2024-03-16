import { View, ScrollView, TouchableOpacity, Text } from "react-native"

/**
 * @param {func(string)} setSelectedStat 
 */
export const StatsCarousel = ({stats, selectedStat, setSelectedStat}) => {
    return(
        <View style={{width:"100%", alignItems:'center', marginBottom:15}}>
            <ScrollView 
                horizontal={true} showsHorizontalScrollIndicator={false} 
                style={{ width: "100%", height: 50, flexDirection: 'row' }}
            >
                {stats.map((stat, i) => (
                    <Item key={i} stat={stat} selectedStat={selectedStat} setSelectedStat={setSelectedStat}/> 
                ))}
            </ScrollView>
        </View>
    )
}

const Item = ({stat, selectedStat, setSelectedStat}) => {

    const onPress = () => {
        setSelectedStat(stat);
    };
    
    return(
        <TouchableOpacity style={{
            width: 70, height: 40, marginRight: 10, alignItems:'center',
            borderRadius: 8, justifyContent:'center', marginLeft: 10,
            borderWidth:1, borderColor:'black',
            backgroundColor: stat === selectedStat ? 'white' : "#3f3c47", 
        }} onPress={() => onPress()}>

            <Text style={{
                fontFamily:"Roboto-Medium", fontSize: 16, 
                color: stat === selectedStat ? 'black' : "white"
            }}>
                {stat}
            </Text>

        </TouchableOpacity>
    )
}