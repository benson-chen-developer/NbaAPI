import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { abbreviateThreeLetterName } from "../../../../assets/TeamLogos/getTeamLogo"
import { useMyContext } from "../../../Context/MyContext"
import { PlayerData } from "../../../Global/Types/DataTypes"
import { PlayerCard } from "./PlayerCard"
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetViewMine } from "../../Inventory/BottomSheet/BottomSheetViewMine"
import { PlayerRow } from "./PlayerRow"

interface Props {
    setScreen: Dispatch<SetStateAction<string>>
}

export const PickingPlayers: React.FC<Props> = ({ setScreen }) => {

    const {user, playerStats} = useMyContext();
    const [currentTeam, setCurrentTeam] = useState<string>(abbreviateThreeLetterName(user.mainTeam));
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [players, setPlayers] = useState<PlayerData[]>([]);
    // const [playersLevelArr, setPlayersLevelArr] = useState<PlayerLevel[]>(user.playersArray);
    
    const playersLevels = user.playersArray.map(p => JSON.parse(p));

    const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
    const handleClosePress = () => bottomSheetRef.current?.close();
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    , [])

    const snapPoints = useMemo(() => ["85%"], [])
    const bottomSheetRef = useRef<BottomSheet>(null)

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

    return(
        <View style={{ flex: 1, alignItems: 'center', width:"100%"}}>
            
            <ScrollView style={{width: "95%", marginTop:20}} horizontal={true}>
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
            </ScrollView>

            <ScrollView style={{ width: '100%', maxHeight: '60%', overflow: 'hidden' }}>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {players.map((player, index) => {
                        const playerLevel = playersLevels?.find(p => p.name === player.name)?.level;
                        
                        return (
                            <PlayerRow key={index}
                                playerData={player} 
                                playerLevel={playerLevel}
                                setCurrentPlayer={setCurrentPlayer}
                                handleOpenPress={handleOpenPress}
                            />
                        );
                    })}
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
    )
}