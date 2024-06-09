import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useMyContext } from "../../../Context/MyContext"
import { PlayerCard } from "./PlayerCard"
import { PlayerRow } from "./PlayerRow"
import { SaboTage } from "./Sabotage"
import { ReadyBtn } from "./ReadyBtn"
import { startSearchForGame } from "../../../functions/GameFunctions/StartFunctions"
import { PlayerExtra, PlayerStats } from "../../../Global/Types/PlayerTypes"
import { GetPlayerStatsOfTeam } from "../../../Global/HelperFunc/GetPlayers"

interface Props {
    gameId: string,
    pickedPlayers: string[],
    setScreen: Dispatch<SetStateAction<string>>
}

export const PickingPlayers: React.FC<Props> = ({ gameId, pickedPlayers, setScreen }) => {
    const {user, playerStats, teamDataContext, setLiveGames} = useMyContext();

    const currentTeamData = teamDataContext.find(t => t.abbreviated === "BOS");
    const oppTeamData = teamDataContext.find(t => t.abbreviated === "LAL");
    
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]); //Players picked and displayed
    const [selectedOpp, setSelectedOpp] = useState<PlayerExtra>(
        {name: null, picId: null, level: 0, backgroundColor: null, team:null},
    );
    const [players, setPlayers] = useState<PlayerStats[]>([]);  //The stats for all team players
    const [playerExtras, setPlayerExtras] = useState<PlayerExtra[]>([]); //The extras for all team players

    const [oppPlayers, setOppPlayers] = useState<PlayerStats[]>([]); //The stats for all opp players
    const [oppExtras, setOppExtras] = useState<PlayerExtra[]>([]); //The extras for all opp players

    const [playerLevels, setPlayerLevels] = useState<{name:string, level: number}[]>([]); //The levels for players
    const [oppLevels, setOppLevels] = useState<{name:string, level: number}[]>([]); //The levels for sabotage players

    const [onPlayers, setOnPlayers] = useState<boolean>(true);
    const [btnText, setBtnText] = useState<string>("");
    const [highestValues, setHighestValues] = useState({"PTS": 0, "REB": 0, "AST": 0, "BLK": 0, "STL": 0, "TO": 0, "PF": 0});
    
    useEffect(() => {
        let parsedLevels = user.playersArray.map(p => JSON.parse(p));

        /* This gets the stats of both teams intially */
        let players = []; let oppPlayers = [];
        players = GetPlayerStatsOfTeam(currentTeamData.abbreviated, playerStats);
        oppPlayers = GetPlayerStatsOfTeam(oppTeamData.abbreviated, playerStats);

        /* This gets the extras of both teams intially */
        setPlayerExtras(currentTeamData.players.map(p => JSON.parse(p)));
        setOppExtras(oppTeamData.players.map(p => JSON.parse(p)));

        /* Sets the levels */
        setPlayerLevels(parsedLevels.filter(parsedPlayer => players.find(player => player.name === parsedPlayer.name)));
        setOppLevels(parsedLevels.filter(parsedPlayer => oppPlayers.find(player => player.name === parsedPlayer.name)));
        
        /* Gets the highest stat avg for each player but may replace this */
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

        /* 
            This is for if we are editing a slip so the players should already be selected 
            We are just going to fill in the selected and sabotage spots
        */
        if(gameId !== "" && pickedPlayers.length === 4){
            setSelectedPlayers(["", "", "", ""]);
        } else {

        }
    }, [])

    /* For changing color and text of the Ready Btn */
    useEffect(() => {
        let playersCount = 3;
        selectedPlayers.forEach(name => { if(name !== "") playersCount--; });
    
        if (playersCount !== 0) {
          setBtnText(`Select ${playersCount} Player${playersCount === 1 ? "" : "s"}`);
        } else if (selectedOpp.name === null) {
          setBtnText(`Select Sabotage`);
        } else {
          setBtnText("Ready");
        }
    }, [selectedPlayers, selectedOpp, oppPlayers, players]);

    const onClickRowNormal = (selectedPlayerData: PlayerStats, selectedPlayerLevel: number): void => {
        let foundPlayerIndex = selectedPlayers.findIndex(name => name === selectedPlayerData.name)
        let firstNullIndex = 0;
        for (const name of selectedPlayers) {
            if ((name !== "") || firstNullIndex === 2) {
                break;
            } else {
                firstNullIndex++;
            }
        }

        setSelectedPlayers(p => {
            //If name is not in array then we can just add it to the end
            if(foundPlayerIndex === -1){
                const arr = [...p]; 
                arr[firstNullIndex] = selectedPlayerData.name;
                return arr;
            } else {
                //This is for if the player name is here so we remove it
                const updatedPlayers = [...p];
                const frontOfArray = updatedPlayers.slice(0, foundPlayerIndex);
                const backOfArray = updatedPlayers.slice(foundPlayerIndex+1, updatedPlayers.length);

                let newArr = frontOfArray.concat(backOfArray);
                while(newArr.length < 3)
                    newArr.push("");

                return newArr; 
            }
        });
    }

    const onClickRowSabotage = (selectedPlayerData: PlayerStats, selectedPlayerLevel: number): void => {
        if(selectedOpp.name === selectedPlayerData.name){
            setSelectedOpp({name: null, picId: null, level: 0, backgroundColor: null, team:''});
        } else {
            setSelectedOpp({
                name: selectedPlayerData.name, 
                picId: selectedPlayerData.picId, 
                level: selectedPlayerLevel, 
                backgroundColor: oppTeamData.mainColor,
                team: ''
            });
        }
    }

    const startGame = async (): Promise<void> => {
        let playerDepth = [];
        selectedPlayers.forEach(player => {
            const foundPlayerData = players.find(p => p.name === player.name);

            playerDepth.push({
                name: foundPlayerData.name,
                PTS: foundPlayerData.PTS/foundPlayerData["Games Played"], 
                REB: foundPlayerData.REB/foundPlayerData["Games Played"], 
                AST: foundPlayerData.AST/foundPlayerData["Games Played"], 
                BLK: foundPlayerData.BLK/foundPlayerData["Games Played"], 
                STL: foundPlayerData.STL/foundPlayerData["Games Played"], 
                "3PM": foundPlayerData["FG3"]/foundPlayerData["Games Played"], 
                "3PA": foundPlayerData["FG3A"]/foundPlayerData["Games Played"],
            })
        })

        const game = await startSearchForGame(
            user, 
            currentTeamData.name, 
            currentTeamData.name,
            oppTeamData.name,
            "timeStart",
            "apiLink",
            playerDepth
        );

        setLiveGames([game]);
    }

    if(
        players.length === 0 ||
        playerExtras.length === 0 ||
        oppPlayers.length === 0 || 
        oppExtras.length === 0 
    ) return (
        <View>
            <Text>Loading</Text>
        </View>
    )

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

                {/* {onPlayers ? 
                    <ScrollView style={{width: "100%"}} horizontal={true} contentContainerStyle={{alignItems:'center'}}>
                        {selectedPlayers.map((name, index) => {
                            return <PlayerCard 
                                player={playerExtras.find(playerExtra => name === playerExtra.name)}
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
                } */}
            </View>

            <ScrollView style={{ width: '100%', maxHeight: '60%', overflow: 'hidden' }}>
                {onPlayers ? 
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {players.map((player, index) => {
                            let playerExtra = playerExtras.find(p => p.name === player.name);
                            let playerLevel = playerLevels.find(p => p.name === player.name).level;

                            return (
                                <PlayerRow key={index}
                                    playerData={player} 
                                    playerExtra={playerExtra}
                                    playerLevel={playerLevel}
                                    highestValues={highestValues}
                                    onClickRowFunc={onClickRowNormal}
                                    isSelected={selectedPlayers.find(name => name === player.name) !== undefined}
                                />
                            );
                        })}
                    </View> 
                        : 
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {oppPlayers.map((player, index) => {
                            let playerExtra = oppExtras.find(p => p.name === player.name);
                            let playerLevel = oppLevels.find(p => p.name === player.name).level;

                            return (
                                <PlayerRow key={index}
                                    playerData={player} 
                                    playerLevel={playerLevel}
                                    playerExtra={playerExtra}
                                    highestValues={highestValues}
                                    onClickRowFunc={onClickRowSabotage}
                                    isSelected={selectedOpp.name === player.name}
                                />
                            );
                        })}
                    </View>
                }
            </ScrollView>

            <ReadyBtn text={btnText} startGame={startGame}/>
        </View>
    )
}