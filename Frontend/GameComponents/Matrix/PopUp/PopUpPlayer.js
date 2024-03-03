import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"

/**
 * 
 * @param {*} playerDepth 
 * @param {objOfPlayerDepth} pickedPlayer
 * [{"3PA": 0, "3PM": 0, "AST": 0, "BLK": 0, "PTS": 0, "REB": 0, "STL": 0, "name": "L. James"}]
 */
export const PopUpPlayer = ({matrixInfo, setMatrixInfo, playerDepth}) => {

    const {pickedPlayer} = matrixInfo;

    const [currentStats, setCurrentStats] = useState({});

    useEffect(() => {
        let arr = {};
        let threePointersMade = 0;
        let threePointersAttemped = 0;
        let fieldGoalMade = 0;
        let fieldGoalAttemped = 0;

        Object.keys(pickedPlayer).forEach(stat => {
            if (stat === "3PM") {
                threePointersMade = pickedPlayer[stat];
            }
            else if (stat === "3PA") {
                threePointersAttemped = pickedPlayer[stat];
            }
            else if (stat === "FGM") {
                fieldGoalMade = pickedPlayer[stat];
            }
            else if (stat === "FGA") {
                fieldGoalAttemped = pickedPlayer[stat];
            }
            else if (stat === "name") {}
            else {
                arr[stat] = pickedPlayer[stat]
            }
        });

        arr["3PTS"] = `${threePointersMade}-${threePointersAttemped}`
        arr["FGS"] = `${fieldGoalMade}-${fieldGoalAttemped}`

        setCurrentStats(arr);
    }, [])

    return(
        <View style={{width:"90%", height:"70%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>

            <View style={{width:"90%", flexDirection:'row', marginBottom:20, height:175}}>

                <View style={{width:"50%", height:"100%", justifyContent:'flex-end'}}>
                    <View style={styles.pic}>
                        <Image style={{width:110, height:100}} source={{uri: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'}}/>
                    </View>

                    <Text style={styles.name}>{pickedPlayer.name}</Text>
                </View>

                <View style={{width:"50%"}}>
                    <TouchableOpacity   
                        style={{height: 25, width:"80%", marginTop:30, marginBottom:10, alignItems:'flex-end', justifyContent:'center'}}
                        onPress={() => setMatrixInfo(p => ({ ...p, popUpMode: "none" }))}
                    >
                        <Text style={{color:'white'}}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.stats}>
                <HalfStats stats={currentStats} name={"Current"}/>

                <HalfStats stats={pickedPlayer} name={"Last 5 Games"}/>
            </View>
        </View>
    )
}

const HalfStats = ({stats, name}) => {
    return(
        <View style={{width:"90%", height:"45%"}}>

            <View style={{width:"100%", flexDirection:'row', marginBottom:5}}>
                <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:20}}>{name}</Text>
            </View>

            <View style={{width:"100%", height:"100%", flexDirection:'row'}}>

                <View style={{width:"33%", height:"100%"}}>
                    {
                        Object.keys(stats)
                        .slice(0, 4)
                        .map((key) => (
                            <Stat key={key} stat={key} number={stats[key]} />
                        ))
                    }
                </View>

                <View style={{width:"33%", height:"100%"}}>
                    {
                        Object.keys(stats)
                        .slice(5, 7)
                        .map((key) => (
                            <Stat key={key} stat={key} number={stats[key]} />
                        ))
                    }
                </View>

            </View>
        </View>
    )
}

const Stat = ({stat, number}) => {

    const stringNumber = typeof number === 'string' ? number[0] : number;

    return(
        <View style={{flexDirection:'row', alignItems:'center', width:"80%", justifyContent:'space-between'}}>
            <Text style={{color:'#c4c4d1', fontFamily:'Roboto-Black', top:1}}>{stat}</Text>

            {stringNumber == 0 ?
                <Text style={{color:'#c4c4d1', fontFamily:'Roboto-Black', fontSize:20}}>
                    {number}
                </Text> : null
            }

            {stringNumber > 0 ?
                <Text style={{color:'white', fontFamily:'Roboto-Black', fontSize:20}}>
                    {number}
                </Text> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        color:"white", fontFamily:'Roboto-Bold', fontSize: 25
    },
    pic:{
        marginBottom: 20
    },
    stats:{
        width:"90%", height:300, backgroundColor:'rgba(0,0,0,.25)',
        justifyContent: 'center', alignItems:'center'
    }
})