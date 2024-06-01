import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { abbreviateThreeLetterName } from "../../../../assets/TeamLogos/getTeamLogo"
import { useMyContext } from "../../../Context/MyContext"
import { PlayerData } from "../../../Global/Types/DataTypes"
import { PlayerCard } from "./PlayerCard"
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetViewMine } from "../../Inventory/BottomSheet/BottomSheetViewMine"
import { PlayerRow } from "./PlayerRow"
import { PlayerCardType } from "../../../Global/Types/PickingPlayerTypes"
import { SaboTage } from "./Sabotage"
import { ReadyBtn } from "./ReadyBtn"
import { startSearchForGame } from "../../../functions/GameFunctions/StartFunctions"

interface Props {
    setScreen: Dispatch<SetStateAction<string>>
}

export const PickingPlayers: React.FC<Props> = ({ setScreen }) => {
    const {user, playerStats, teamDataContext} = useMyContext();

    const currentTeamData = teamDataContext.find(t => t.abbreviated === "BOS");
    const oppTeamData = teamDataContext.find(t => t.abbreviated === "LAL");

    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerCardType[]>([
        {name: null, picId: null, level: 0, backgroundColor: null},
        {name: null, picId: null, level: 0, backgroundColor: null},
        {name: null, picId: null, level: 0, backgroundColor: null},
    ]);
    const [selectedOpp, setSelectedOpp] = useState<PlayerCardType>(
        {name: null, picId: null, level: 0, backgroundColor: null}
    );
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [oppPlayers, setOppPlayers] = useState<PlayerData[]>([]);
    const [onPlayers, setOnPlayers] = useState<boolean>(true);
    const [btnText, setBtnText] = useState<string>("");
    const [highestValues, setHighestValues] = useState({"PTS": 0, "REB": 0, "AST": 0, "BLK": 0, "STL": 0, "TO": 0, "PF": 0});
    // const [playersLevelArr, setPlayersLevelArr] = useState<PlayerLevel[]>(user.playersArray);
    
    const playersLevels = user.playersArray.map(p => JSON.parse(p));

    const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    , [])

    const snapPoints = useMemo(() => ["85%"], [])
    const bottomSheetRef = useRef<BottomSheet>(null)

    useEffect(() => {

        let players = []; let oppPlayers = [];
        playerStats.forEach(p => {
            if(p.abbreviated === currentTeamData.abbreviated){
                players.push(p);
            }
        })
        playerStats.forEach(p => {
            if(p.abbreviated === oppTeamData.abbreviated){
                oppPlayers.push(p);
            }
        })

        let highestValues = {"PTS": 0, "REB": 0, "AST": 0, "BLK": 0, "STL": 0, "TO": 0, "PF": 0};
        players.forEach(p => {
            for (let key in highestValues) {
                if((p[key] / p["Games Played"]) > highestValues[key]){
                    highestValues[key] = (p[key] / p["Games Played"]).toFixed(1);
                }
            }
        });

        setHighestValues(highestValues);
        setPlayers(players);
        setOppPlayers(oppPlayers);
    }, [])

    useEffect(() => {
        let playersCount = 3;
        selectedPlayers.forEach(p => { if(p.name) playersCount--; });
    
        if (playersCount !== 0) {
          setBtnText(`Select ${playersCount} Player${playersCount === 1 ? "" : "s"}`);
        } else if (selectedOpp.name === null) {
          setBtnText(`Select Sabotage`);
        } else {
          setBtnText("Ready");
        }
    }, [selectedPlayers, selectedOpp, oppPlayers, players]);

    const onClickRowNormal = (selectedPlayerData: PlayerData, selectedPlayerLevel: number): void => {
        let foundPlayerIndex = selectedPlayers.findIndex(p => p.name === selectedPlayerData.name)
        let firstNullIndex = 0;
        for (const p of selectedPlayers) {
            if ((!p.name || !p.picId) || firstNullIndex === 2) {
                break;
            } else {
                firstNullIndex++;
            }
        }

        setSelectedPlayers(p => {
            if(foundPlayerIndex === -1){
                const arr = [...p]; 
                arr[firstNullIndex] = {
                    name: selectedPlayerData.name, 
                    picId: selectedPlayerData.picId, 
                    level: selectedPlayerLevel,
                    backgroundColor: currentTeamData.mainColor
                };
                return arr;
            } else {
                const updatedPlayers = [...p];
                const frontOfArray = updatedPlayers.slice(0, foundPlayerIndex);
                const backOfArray = updatedPlayers.slice(foundPlayerIndex+1, updatedPlayers.length);

                let newArr = frontOfArray.concat(backOfArray);
                while(newArr.length < 3)
                    newArr.push({"name": null, "picId": null, level: 0, backgroundColor:null});

                return newArr; 
            }
        });
    }

    const onClickRowSabotage = (selectedPlayerData: PlayerData, selectedPlayerLevel: number): void => {
        if(selectedOpp.name === selectedPlayerData.name){
            setSelectedOpp({name: null, picId: null, level: 0, backgroundColor: null});
        } else {
            setSelectedOpp({
                name: selectedPlayerData.name, 
                picId: selectedPlayerData.picId, 
                level: selectedPlayerLevel, 
                backgroundColor: oppTeamData.mainColor
            });
        }
    }

    const startGame = async (): Promise<void> => {
        startSearchForGame(
            user, 
            currentTeamData.name, 
            currentTeamData.name,
            oppTeamData.name,
            "timeStart",
            "apiLink",
            selectedPlayers
        );
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', width:"100%", height:"100%"}}>

            <View style={{width:"100%", height:"40%"}}>
                <View style={{
                    width:"100%", height: 40, flexDirection:'row',
                    justifyContent:'center', alignItems:'center'
                }}>
                    <TouchableOpacity onPress={() => setOnPlayers(p => !p)}>
                        <Text style={{color:'#fff'}}>
                            Click to switch
                        </Text>
                    </TouchableOpacity>
                </View>

                {onPlayers ? 
                    <ScrollView style={{width: "100%"}} horizontal={true} contentContainerStyle={{alignItems:'center'}}>
                        {selectedPlayers.map((p, index) => {
                            return <PlayerCard 
                                player={p}
                                key={index} 
                                index={index} maxLength={selectedPlayers.length}
                                setSelectedPlayers={setSelectedPlayers}
                            />
                        })}
                    </ScrollView> 
                        :
                    <SaboTage 
                        player={selectedOpp}
                        setSelectedOpp={setSelectedOpp}
                    />
                }
            </View>

            <ScrollView style={{ width: '100%', maxHeight: '60%', overflow: 'hidden' }}>
                {onPlayers ? 
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {players.map((player, index) => {
                            const playerLevel = playersLevels?.find(p => p.name === player.name)?.level;
                            
                            return (
                                <PlayerRow key={index}
                                    playerData={player} 
                                    playerLevel={playerLevel}
                                    setCurrentPlayer={setCurrentPlayer}
                                    handleOpenPress={handleOpenPress}
                                    highestValues={highestValues}
                                    onClickRowFunc={onClickRowNormal}
                                    isSelected={selectedPlayers.find(p => p.name === player.name) !== undefined}
                                />
                            );
                        })}
                    </View> 
                        : 
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {oppPlayers.map((player, index) => {
                            const playerLevel = playersLevels?.find(p => p.name === player.name)?.level;
                            
                            return (
                                <PlayerRow key={index}
                                    playerData={player} 
                                    playerLevel={playerLevel}
                                    setCurrentPlayer={setCurrentPlayer}
                                    handleOpenPress={handleOpenPress}
                                    highestValues={highestValues}
                                    onClickRowFunc={onClickRowSabotage}
                                    isSelected={selectedOpp.name === player.name}
                                />
                            );
                        })}
                    </View>
                }
            </ScrollView>

            {currentPlayer ? 
                <BottomSheet 
                    ref={bottomSheetRef} 
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                    handleIndicatorStyle={{backgroundColor:'white'}}
                    backgroundStyle={{backgroundColor:onPlayers ? currentTeamData.mainColor : oppTeamData.mainColor}}
                >
                    <BottomSheetViewMine 
                        imgUrl={onPlayers ? currentTeamData.imgUrl : oppTeamData.imgUrl}
                        mainColor={onPlayers ? currentTeamData.mainColor : oppTeamData.mainColor}
                        playerStats={playerStats[playerStats.findIndex(p => p.name === currentPlayer)]}
                    />
                </BottomSheet> : null
            }

            <ReadyBtn text={btnText} startGame={startGame}/>
        </View>
    )
}