import { useState } from 'react';
import {View, Text, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useMyContext } from '../../../Context/MyContext';
import { PlayerData } from '../../../Global/Types/DataTypes';
import { PlayerExtra } from '../../../Global/Types/PlayerTypes';
import { PlayerRow } from './PlayerRow';

interface Props {
    ourTeamName: string,
}

export const LiveGame: React.FC<Props> = ({
    
}) => {

    const {liveGames, user} = useMyContext();
    const [ourPlayers, setOurPlayers] = useState<PlayerExtra[]>(
        liveGames[0].player1Id === user.id ?  
            liveGames[0].player1Depth.map(p => JSON.parse(p))
                :
            liveGames[0].player2Depth.map(p => JSON.parse(p))
        )
    ;
    const [sabotage, setSabotage] = useState<PlayerExtra>(
        liveGames[0].player1Id === user.id ?  
            JSON.parse(liveGames[0].player1Sabotage)
                :
            JSON.parse(liveGames[0].player2Sabotage)
    );

    return (
        <View style={{width:"100%", height:'100%', alignItems:'center'}}>

            <View style={{
                width:"90%", height: 450, alignItems:'center', borderColor:'#9747FF', 
                borderWidth:2, borderRadius:15, marginTop:30,
            }}>
                {/* Top */}
                <View style={{
                    width:"100%", height: "20%", alignItems:'center', borderColor:'#9747FF', 
                    borderBottomWidth:2, flexDirection:'row', justifyContent:'space-between',
                    backgroundColor:'#2E2C4F', borderTopEndRadius: 15, borderTopLeftRadius:15
                }}>
                    <TeamInfo 
                        name={"Pacers"} record="12-30" isHome={true}
                        imgUrl={"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/ind.png&scale=crop&cquality=40&location=origin"}
                    />
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:16, color:"#fff"}}>7:00</Text>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize:13, color:"#E8E7E7"}}>PM EST</Text>
                    </View>
                    <TeamInfo 
                        name={"Celtics"} record="40-30" isHome={false}
                        imgUrl={"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/bos.png&scale=crop&cquality=40&location=origin"}
                    />
                </View>

                {/* Bottom */}
                <View style={{
                    width:"100%", height: "80%", alignItems:'center', justifyContent:'space-evenly'
                }}>
                    {ourPlayers.map((player, index) => {
                        return <PlayerRow playerExtra={player} key={index}/>
                    })}

                    {/* Sabotage Player */}
                    <PlayerRow playerExtra={sabotage}/>
                </View>
            </View>

        </View>
    )
}

const TeamInfo = ({name, record, imgUrl, isHome}) => {
    if(isHome) return(
        <View style={{flexDirection:'row', marginLeft: 20}}>
            <Image 
                source={{uri: imgUrl}}
                style={{width:40, height:40}}
            />
            <View style={{marginLeft: 5}}>
                <Text style={{fontFamily:'Roboto-Bold', fontSize:15, color:"#fff"}}>{name}</Text>
                <Text style={{fontFamily:'Roboto-Bold', fontSize:13, color:"#E8E7E7"}}>{record}</Text>
            </View>
        </View>
    )

    if(!isHome) return(
        <View style={{flexDirection:'row',  marginRight: 20}}>
            <View style={{alignItems:'flex-end', marginRight: 5}}>
                <Text style={{fontFamily:'Roboto-Bold', fontSize:15, color:"#fff"}}>{name}</Text>
                <Text style={{fontFamily:'Roboto-Bold', fontSize:13, color:"#E8E7E7"}}>{record}</Text>
            </View>
            <Image 
                source={{uri: imgUrl}}
                style={{width:40, height:40}}
            />
        </View>
    )
}