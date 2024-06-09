import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { View, Text, Animated } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Colors } from "../../Global/Enums/color"
import { PlayerStats } from "../../Global/Types/PlayerTypes"

type LastFiveData = {
    "PTS": number,
    "REB": number,
    "AST": number,
    "STL": number,
    "BLK": number,
}

type MaxStats = {
    "PTS": number,
    "REB": number,
    "AST": number,
    "STL": number,
    "BLK": number,
}

interface Props {
    currentPlayer: PlayerStats,
}

export const SecondHalf: React.FC<Props> = ({currentPlayer}) => {
    const [lastFiveData, setLastFiveData] = useState<LastFiveData[]>([]);
    const [maxStats, setMaxStats] = useState<MaxStats>(null)
    const [selectedStat, setSelectedStat] = useState<string>("PTS");
    const [loading, setLoading] = useState<boolean>(true);

    const stats = ["PTS", "REB", "AST", "BLK", "STL"];

    useEffect(() => {
        setLoading(true);
        let arr = [];
        currentPlayer.lastFive.forEach((game, index) => {
            arr.push({
                "PTS": game.PTS,
                "REB": game.REB,
                "AST": game.AST,
                "STL": game.STL,
                "BLK": game.BLK,
            })
        })

        setMaxStats({
            "PTS" : arr.reduce((max, game) => {return game.PTS > max ? game.PTS : max}, 0),
            "REB" : arr.reduce((max, game) => {return game.REB > max ? game.REB : max}, 0),
            "AST" : arr.reduce((max, game) => {return game.AST > max ? game.AST : max}, 0),
            "STL" : arr.reduce((max, game) => {return game.STL > max ? game.STL : max}, 0),
            "BLK" : arr.reduce((max, game) => {return game.BLK > max ? game.BLK : max}, 0),
        })
        setLastFiveData(arr);
        setLoading(false);
    }, [])

    if(loading) return(
        <View>
            <Text style={{color:'white'}}>Loading</Text>
        </View>
    )

    return(
        <View style={{width:"100%", backgroundColor:'#273447', height:"70%"}}>
            <View style={{
                width:"100%", backgroundColor:'white', height:"100%", borderTopLeftRadius:20, borderTopRightRadius:20, alignItems:'center'
            }}>
                <Text style={{color:'black', fontFamily:'Roboto-Bold', fontSize: 25, marginTop: 15}}>
                    Performance
                </Text>

                {/* Btns */}
                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly', margin:10}}>
                    {stats.map((stat, index) => (
                        <TouchableOpacity key={index} style={{
                            width:60, height:40, borderRadius: 5,
                            justifyContent:'center', alignItems:'center',
                            backgroundColor: selectedStat === stat ? "#FFAE57" : '#CBCBCB',
                        }} onPress={() => setSelectedStat(stat)}>
                            <Text style={{
                                color:'white', fontFamily:'Roboto-Bold', fontSize:18
                            }}>
                                {stat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{width:"100%", justifyContent:'center', marginTop: 10, flexDirection:'row'}}>
                    {/* Side Stats */}
                    <View style={{height: 175, width: 70 ,justifyContent:'space-evenly', alignItems:'flex-end', marginRight:12}}>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:20}}>
                            {/* {(currentPlayer[selectedStat]/currentPlayer["Games Played"]*1.25).toFixed(0)} */}
                        </Text>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:20}}>
                            Avg {(currentPlayer[selectedStat]/currentPlayer["Games Played"]).toFixed(0)}
                        </Text>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:20}}>
                            {/* {(currentPlayer[selectedStat]/currentPlayer["Games Played"]*.75).toFixed(0)} */}
                        </Text>
                    </View>

                    {/* Chart */}
                    <View style={{width:"70%", height: 175, backgroundColor:'#273447', borderRadius:10, borderWidth:3, borderColor:'#CBCBCB'}}>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', height: '100%', width: '100%', alignItems: 'flex-end' }}>
                            {lastFiveData.map((stats, index) => {
                                const currentPlayerStat = currentPlayer[selectedStat];
                                const gamesPlayed = currentPlayer["Games Played"];
                                let barHeight = (stats[selectedStat] / (currentPlayerStat / gamesPlayed) * 100);
                                    barHeight *= .5;
                                    if(barHeight > 100) barHeight = 96;

                                const isCurrentPlayerHigher = barHeight >= stats[selectedStat];
                                const backgroundColor = isCurrentPlayerHigher ? Colors.red : Colors.green;

                                return (
                                    <StarBar 
                                        key={index} 
                                        barHeight={barHeight}
                                        backgroundColor={backgroundColor}
                                        stat={stats[selectedStat]}
                                    />
                                );
                            })}
                        </View>

                        <View style={{ position: 'absolute', height: '100%', width:"100%", justifyContent: 'space-evenly' }}>
                            <Text style={{color:'white', bottom: 5}} numberOfLines={1}>- - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'white'}} />
                            <Text style={{color:'white', top: 5}} numberOfLines={1}>- - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                        </View>
                    </View>
                </View>

                {/* Last 5 Avg */}
                <View style={{width:"100%", alignItems:'center', marginTop:20}}>
                    <View style={{width:"50%", height:50, backgroundColor: Colors.bgDark, justifyContent:'center', alignItems:'center', borderRadius:5}}>
                        <Text style={{fontFamily:"Roboto-Bold", color:'white', fontSize:22}}>
                            Last {lastFiveData.length} Avg | {lastFiveData.length > 0 ? (lastFiveData.reduce((acc, curr) => acc + curr[selectedStat], 0) / lastFiveData.length).toFixed(1) : 0}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const StarBar = ({barHeight, backgroundColor, stat}) => {
    let heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        heightAnim.setValue(0);

        Animated.timing(heightAnim, {
            toValue: 1, 
            duration: 300, 
            useNativeDriver: false,
        }).start();
    }, [barHeight]);

    const animatedHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, barHeight > 20 ? barHeight : 20], // Ensure minimum height of 20
    });

    return(
        <Animated.View style={{
            width: 33,
            height: animatedHeight,
            backgroundColor: backgroundColor,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            <Text style={{ color: '#fff', fontSize: 20, marginTop: 5, fontFamily: 'Roboto-Bold' }}>
                {stat}
            </Text>
        </Animated.View>
    )
}