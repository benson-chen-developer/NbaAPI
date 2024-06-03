import { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList } from "react-native";
import { abbreviateName, abbreviateThreeLetterName } from "../../../assets/TeamLogos/getTeamLogo";
import { useMyContext } from "../../Context/MyContext";
import { getTeamDataAWS } from "../../functions/AsyncStorage/PlayerStats";
import { PlayerCard } from "./PlayerCard";
import { Header } from "./Header";
import { Colors } from "../../Global/Enums/color";
import { PlayerStats } from "../../Global/Types/PlayerTypes";
import { TeamData } from "../../Global/Types/ContextTypes";

interface Props {}

export const Inventory: React.FC<Props> = () => {

    const {user, playerStats, teamDataContext} = useMyContext();
    const [currentTeam, setCurrentTeam] = useState<TeamData>(teamDataContext.find(team => team.name === user.mainTeam));
    const [allTeams, setAllTeams] = useState<TeamData[]>([]);
    const [players, setPlayers] = useState<PlayerStats[]>([]);
    // const [playersLevelArr, setPlayersLevelArr] = useState<PlayerLevel[]>(user.playersArray);
    
    const playersLevels = user.playersArray.map(p => JSON.parse(p));

    useEffect(() => {
        let playerStats = []; let players = [];

        playerStats.forEach(p => {
            if(p.abbreviated === abbreviateThreeLetterName(user.mainTeam)){
                players.push(p);
            }
        })

        setPlayers(players);
    }, []);

    useEffect(() => {
        let players = [];
        playerStats.forEach(p => {
            if(p.abbreviated === currentTeam.abbreviated){
                players.push(p);
            }
        })
        setPlayers(players);
    }, [currentTeam])

    if(playerStats.length === 0) return(
        <View>
            <Text style={{color:"white"}}>Loading</Text>
        </View>
    )

    return (
        <View style={{width: '100%', height:"100%", backgroundColor: Colors.bgDark}}>
            <Header 
                teamName={currentTeam.name}
                teamDataContext={teamDataContext}
                setCurrentTeam={setCurrentTeam}
            />            

            <ScrollView style={{ width: '100%', maxHeight: '80%', overflow: 'hidden' }}>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {players.map((player, index) => {
                        const playerLevel = playersLevels?.find(p => p.name === player.name)?.level;
                        
                        return (
                            <View key={index} style={{ width: '50%', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                                <PlayerCard 
                                    playerData={player} 
                                    playerLevel={playerLevel}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};
