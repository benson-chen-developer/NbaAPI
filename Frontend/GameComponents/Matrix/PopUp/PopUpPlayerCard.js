import { View, Image, Text, StyleSheet } from "react-native"

export const PopUpPlayerCard = () => {
    return(
        <View style={{width:"100%", alignItems:'center', marginTop: 20}}>
            <View style={styles.cardOuter}>
                <View style={styles.cardInner}>
                    <View style={{width:'40%', alignItems:'center', justifyContent:'space-around'}}>
                        <Image style={{height:70, width:70}}
                            source={{uri:"https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png"}}/>
                        <Text style={{color:'white', fontFamily:'Roboto-Black', fontSize:17}}>
                            L. James
                        </Text>
                    </View>

                    <View style={{width:'60%', marginTop: 20}}>
                        <Stat stat={"PTS"} number={20}/>
                        {/* <Stat stat={"REB"} number={player["REB"]}/> */}
                        {/* <Stat stat={"AST"} number={player["AST"]}/> */}
                    </View>
                </View>
            </View>
    </View>
    )
}

const Stat = ({stat, number}) => {
    return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:'#c4c4d1', fontFamily:'Roboto-Black', marginRight:30, top:1}}>{stat}</Text>
            <Text style={{color:'white', fontFamily:'Roboto-Black', fontSize:20}}>{number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardOuter: {
        width: "90%", height: 120, borderRadius: 5, backgroundColor:'#121320',
        margin:10
    },
    cardInner: {
        width: "100%", height: "97%", borderRadius: 5, backgroundColor:'#2b2d4e',
        flexDirection:'row'
    }
})