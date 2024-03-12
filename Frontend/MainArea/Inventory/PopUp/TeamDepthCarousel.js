import { View, ScrollView, TouchableOpacity, Text } from "react-native"

export const TeamDepthCarousel = ({stats, setStats}) => {
    return(
        <View style={{width:"100%", alignItems:'center', marginTop:15}}>
            <ScrollView 
                horizontal={true} showsHorizontalScrollIndicator={false} 
                style={{ width: "100%", height: 50, flexDirection: 'row' }}
            >
                {stats.map((stat, i) => (
                    <Item key={i} stat={stat} stats={stats} setStats={setStats}/> 
                ))}
            </ScrollView>
        </View>
    )
}

const Item = ({stat, stats, setStats}) => {

    const onPress = () => {
        const newStats = stats.map(s => ({
            ...s,
            selected: s.name === stat.name ? !s.selected : false
        }));
        setStats(newStats);
    };
    
    return(
        <TouchableOpacity style={{
            width: 80, height: "80%", marginRight: 10, alignItems:'center',
            borderRadius: 8, justifyContent:'center', marginLeft: 10,
            borderWidth:1, borderColor:'black',
            backgroundColor: stat.selected ? 'black' : "white", 
        }} onPress={() => onPress()}>

            <Text style={{
                fontFamily:"Roboto-Medium", fontSize: 18, 
                color: stat.selected ? 'white' : "black"
            }}>
                {stat.name}
            </Text>

        </TouchableOpacity>
    )
}