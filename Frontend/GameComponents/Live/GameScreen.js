import { useEffect } from "react"
import { Text, Image, View, ScrollView } from "react-native"

export const GameScreen = ({game, matrixInfo, setMatrixInfo, actions}) => {

    return(
        <View style={{
            width:"100%", alignItems:'center', height:"80%", //backgroundColor:'red'
        }}>
            <View style={{width:"90%", alignItems:'center', marginBottom: 20}}>
                <Text style={{fontFamily:"Roboto-Black", color:'white', fontSize:25}}>
                    Activity
                </Text>
                <View style={{height:1, width:"100%", backgroundColor:'grey', marginTop:10}}/>
            </View>

             <ScrollView style={{width:"100%"}} contentContainerStyle={{ alignItems: 'center' }}>
                {actions.map((action, index) => (
                    <ActionBlock key={index} action={action} />
                ))}
            </ScrollView>

        </View>
    )
}

const ActionBlock = ({action}) => {
    const borderStats = {
        borderWidth: true ? 3 : 0,
        borderColor: true ? "#14f531" : "#d62b4f", //#2bd6b2
    }
    const indexOfSplit = action.description.indexOf(")");
    const intialAction = indexOfSplit ? action.description.substring(0, indexOfSplit + 1) : action.description;
    const assister = indexOfSplit ? action.description.substring(indexOfSplit + 2) : null;

    return(
        <View style={{
            width:"80%", height:120, borderRadius: 5, flexDirection:'row',
            backgroundColor: '#273447', justifyContent:'space-around', marginBottom:15,
            ...borderStats
        }}>
            <Picture first={null} assister={assister}/>

            <View style={{width:"65%", height:"100%", alignItems:'flex-start', justifyContent:'space-evenly'}}>
                <Text style={{fontFamily:"Roboto-Black", color:'white', fontSize:15}}>
                    {intialAction}
                </Text>

                {assister ?
                    <Text style={{fontFamily:"Roboto-Black", color:'white', fontSize:14}}>
                        {assister}
                    </Text>
                        : 
                    null
                }
            </View>
        </View>
    )
}

const Picture = ({player, assister}) => {
    const size = 80;
    return(
        <View style={{width:"35%", height:"100%", justifyContent:'center', alignItems:'center'}}>
            {assister ?
                <View style={{width:size, height:size}}>
                    <Image 
                        style={{width:"100%", height:"100%"}}
                        source={{uri: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3908809.png&w=350&h=254'}}
                    />
                    <View style={{width:"100%", height:"100%", position:'absolute', justifyContent:'flex-end', alignItems:'flex-end', top:7, left :8}}>
                        <Image 
                            style={{width:"70%", height:"70%"}}
                            source={{uri: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065778.png&w=350&h=254'}}
                        />
                    </View>
                </View>
                    :
                <Image 
                    style={{width:size, height:size}}
                    source={{uri: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3908809.png&w=350&h=254'}}
                />
            }
        </View>
    )
}