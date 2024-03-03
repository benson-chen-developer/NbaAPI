import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native"
import { fetchBoxScore, getLatestActionsAndUpdateGame, updateLastActionNumber, updatePlayerStats } from "../functions/GameFunctions/GameLiveFunctions";
import { GamePlayers } from "./GamePlayers";
import { useMyContext } from '../Context/MyContext';
import { Header } from "./Shared/Header";

export const GameHome = ({route}) => {

    const {user} = useMyContext();

    const { game } = route.params;

    const {homeTeam, awayTeam} = game;

    const player1Team = game.player1Id === user.id ? JSON.parse(game.player1Depth) : JSON.parse(game.player2Depth);

    const [homePlayerDepth, setHomePlayerDepth] = useState(game.player1Id === user.id ? game.player1Depth : game.player2Depth)
    const [awayPlayerDepth, setAwayPlayerDepth] = useState(game.player1Id !== user.id ? game.player1Depth : game.player2Depth)

    const [playersLoaded, setPlayersLoaded] = useState(false);

    useEffect(() => {

        const intervalId = setInterval(async () => {
            let updatedHomePlayerDepth = await getLatestActionsAndUpdateGame(game, user.id)
            
            setHomePlayerDepth(updatedHomePlayerDepth);
            console.log("GameHome: Live Pulse", updatedHomePlayerDepth)
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return(
        <SafeAreaView style={{backgroundColor:"#162538"}}>
            <View style={{width:"100%", height:"100%", backgroundColor:"#162538"}}>
                
                <Header homeTeam={homeTeam} awayTeam={awayTeam} />

                {playersLoaded ?
                    <GamePlayers players={homePlayerDepth}/>
                        :
                    <Text style={{color:'white'}}>Loading</Text>
                }

            </View>
        </SafeAreaView>
    )
}