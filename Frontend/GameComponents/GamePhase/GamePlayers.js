import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';

export const GamePlayers = ({players}) => {

    const Card = ({player}) => {
        console.log("GamePLayers", player)
        return(
            <View style={styles.cardOuter}>
                <View style={styles.cardInner}>

                    <View style={{width:'55%', alignItems:'center', justifyContent:'space-around'}}>
                        <Image style={{height:70, width:70}}
                            source={{uri:"https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png"}}/>
                        <Text style={{color:'white', fontFamily:'Roboto-Black', fontSize:17}}>
                            {shortenName(player.name)}
                        </Text>
                    </View>

                    <View style={{width:'45%', justifyContent:'space-evenly'}}>
                        <Stat stat={"PTS"} number={player["PTS"]}/>
                        <Stat stat={"REB"} number={player["REB"]}/>
                        <Stat stat={"AST"} number={player["AST"]}/>
                    </View>
                </View>
            </View>
        )
    } 

    return(
        <View style={{height:"20%", width:"100%"}}>
            <ScrollView contentContainerStyle={styles.main} horizontal={true}>
                {players.map((player, index) => (
                    <Card key={index} player={player} />
                ))}
            </ScrollView>
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

const shortenName = (name) => {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0][0];
    let lastPart = nameParts[nameParts.length - 1];

    if (lastPart.length > 10) {
        lastPart = lastPart.slice(0, 10) + '.';
    }
    
    return `${firstLetter}. ${lastPart}`;
}

const styles = StyleSheet.create({
    main:{
        width: "100%", height: "100%", alignItems:'center'
    },
    cardOuter: {
        width: "60%", height: "80%", borderRadius: 5, backgroundColor:'#121320',
        marginLeft:10
    },
    cardInner: {
        width: "100%", height: "97%", borderRadius: 5, backgroundColor:'#2b2d4e',
        flexDirection:'row'
    }
})