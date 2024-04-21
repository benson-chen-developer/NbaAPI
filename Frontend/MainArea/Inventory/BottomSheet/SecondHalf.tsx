import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PlayerData } from "../../../Global/DataTypes"
import { Colors } from "../../../Global/Enums/color"

type GameData = {
    date: string,
    opp: string,
    players: PlayerData[]
}

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
    currentPlayer: PlayerData,
    lastFiveGames: (GameData | null)[]
}

export const SecondHalf: React.FC<Props> = ({lastFiveGames, currentPlayer}) => {
    console.log("currentPlayer hi",currentPlayer)

    const [lastFiveData, setLastFiveData] = useState<LastFiveData[]>([]);
    const [maxStats, setMaxStats] = useState<MaxStats>(null)
    const [selectedStat, setSelectedStat] = useState<string>("PTS");
    const [loading, setLoading] = useState<boolean>(true);

    const stats = ["PTS", "REB", "AST", "BLK", "STL"];

    useEffect(() => {
        setLoading(true);
        let arr = [];

        // lastFiveGames.forEach((game, index) => {
        //     const foundPlayer = game.players.find(player => player.name === currentPlayer.name);
            
        //     arr.push({
        //         "PTS": foundPlayer.PTS,
        //         "REB": foundPlayer.REB,
        //         "AST": foundPlayer.AST,
        //         "STL": foundPlayer.STL,
        //         "BLK": foundPlayer.BLK,
        //     })
        // })

        // setMaxStats({
        //     "PTS" : arr.reduce((max, game) => {return game.PTS > max ? game.PTS : max}, 0),
        //     "REB" : arr.reduce((max, game) => {return game.REB > max ? game.REB : max}, 0),
        //     "AST" : arr.reduce((max, game) => {return game.AST > max ? game.AST : max}, 0),
        //     "STL" : arr.reduce((max, game) => {return game.STL > max ? game.STL : max}, 0),
        //     "BLK" : arr.reduce((max, game) => {return game.BLK > max ? game.BLK : max}, 0),
        // })
        // setLastFiveData(arr);
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
                width:"100%", backgroundColor:'white', height:"100%", borderRadius:20, alignItems:'center'
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
                            30
                        </Text>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:20}}>
                            Avg {(currentPlayer[selectedStat]/currentPlayer["Games Played"]).toFixed(0)}
                        </Text>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:20}}>
                            20
                        </Text>
                    </View>

                    {/* Chart */}
                    <View style={{width:"70%", height: 175, backgroundColor:'#273447', borderRadius:10, borderWidth:3, borderColor:'#CBCBCB'}}>
                        <View style={{justifyContent:'space-evenly', flexDirection:'row', height:'100%', width:"100%", alignItems:'flex-end'}}>
                            {lastFiveData.map((stats, index) => (
                                <View key={index} style={{
                                    width: 33, height: `${(stats[selectedStat] / maxStats[selectedStat] * 100)-5}%`, 
                                    backgroundColor: (currentPlayer[selectedStat]/currentPlayer["Games Played"]).toFixed(0) > stats[selectedStat] ? Colors.red : Colors.green,
                                    borderTopLeftRadius: 3, borderTopRightRadius: 3
                                }}>
                                    <Text style={{}}>
                                        {(currentPlayer[selectedStat]/currentPlayer["Games Played"]).toFixed(0)}
                                    </Text>
                                </View>
                            ))}
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
                            Last 5 Avg | {lastFiveData.length > 0 ? (lastFiveData.reduce((acc, curr) => acc + curr[selectedStat], 0) / lastFiveData.length).toFixed(1) : 0}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}