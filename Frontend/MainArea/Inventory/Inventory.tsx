import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { abbreviateName, abbreviateThreeLetterName } from "../../../assets/TeamLogos/getTeamLogo";
import { useMyContext } from "../../Context/MyContext";
import { getTeamDataAWS } from "../../functions/AsyncStorage/PlayerStats";
import { BottomSheetViewMine } from "./BottomSheet/BottomSheetViewMine";
import { PlayerCard } from "./PlayerCard";
import {PlayerData} from '../../Global/DataTypes';
import { Header } from "./Header";

interface Props {}


const fetchPlayerStats = async () => {
    try {
        const teamDataRes = await getTeamDataAWS();

        try {
            const playerRes = await fetch("https://cdn.nba.com/static/json/staticData/EliasGameStats/00/all_players_season.txt");
            const playerResParsed = await playerRes.text();
    
            const lines = playerResParsed.split("\n");
            const linesToProcess = lines.slice(2); // Remove the first two lines
            const playersArrayRet = [];
    
            linesToProcess.forEach((line) => {
                const playerNameAndStats = line.split(" ").filter((word) => word.trim() !== "");
                const playerName = `${playerNameAndStats[4] + playerNameAndStats[3]}`.replace(",", " ").slice(0, -1);
    
                const playerExists = teamDataRes.some((team) => team.players.includes(playerName));
    
                if (playerExists) {
                    playersArrayRet.push({
                        name: playerName,
                        FG: playerNameAndStats[9],
                        FGA: playerNameAndStats[10],
                        FG3: playerNameAndStats[12],
                        FG3A: playerNameAndStats[13],
                        FT: playerNameAndStats[15],
                        FTA: playerNameAndStats[16],
                        REB: playerNameAndStats[20],
                        AST: playerNameAndStats[21],
                        PF: playerNameAndStats[22],
                        STL: playerNameAndStats[24],
                        TO: playerNameAndStats[25],
                        BLK: playerNameAndStats[26],
                        PTS: playerNameAndStats[27],
                        PPG: playerNameAndStats[28],
                        "Games Played": playerNameAndStats[6],
                        abbreviated: playerNameAndStats[1],
                    });
                }
            });
    
            // Remove duplicate players
            for (let i = 0; i < playersArrayRet.length; i++) {
                const lastPlayer = i > 0 ? playersArrayRet[i - 1] : null;
    
                if (lastPlayer && playersArrayRet[i].name === lastPlayer.name) {
                    playersArrayRet.splice(i - 1, 1);
                    playersArrayRet.splice(i, 1);
                }
            }

            return playersArrayRet;
        } catch (err) {
            console.log("Inventory, players fetching", err);
            return [];
        }
    } catch(err) {
        console.log("Get Team AWS Data Error:", err);
        return [];
    }
}

export const Inventory: React.FC<Props> = () => {

    const {user, playerStats} = useMyContext();
    const [currentTeam, setCurrentTeam] = useState<string>(abbreviateThreeLetterName(user.mainTeam));
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [players, setPlayers] = useState<PlayerData[]>([]);

    const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
    const handleClosePress = () => bottomSheetRef.current?.close();
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    , [])

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
            if(p.abbreviated === currentTeam){
                players.push(p);
            }
        })
        setPlayers(players);
    }, [currentTeam])

    const snapPoints = useMemo(() => ["85%"], [])
    const bottomSheetRef = useRef<BottomSheet>(null)

    if(playerStats.length === 0) return(
        <View>
            <Text style={{color:"white"}}>Loading</Text>
        </View>
    )

    return (
        <View style={{width: '100%', height:"100%", backgroundColor:'#273447'}}>
            <Header 
                teamName={currentTeam}
                setCurrentTeam={setCurrentTeam}
            />            

            <ScrollView style={{ width: '100%', maxHeight: '80%', overflow: 'hidden' }}>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {players.map((player, index) => (
                        <View key={index} style={{ width: '50%', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                            <PlayerCard 
                                playerData={player} 
                                playerLevels={null}
                                setCurrentPlayer={setCurrentPlayer}
                                handleOpenPress={handleOpenPress}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>


            {currentPlayer ? 
                <BottomSheet 
                    ref={bottomSheetRef} 
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                    handleIndicatorStyle={{backgroundColor:'white'}}
                    backgroundStyle={{backgroundColor:'#007A32'}}
                >
                    <BottomSheetViewMine 
                        playerStats={playerStats[playerStats.findIndex(p => p.name === currentPlayer)]}
                    />
                </BottomSheet> : null
            }
        </View>
    );
};
