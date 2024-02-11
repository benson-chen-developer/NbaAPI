import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { TilePopUpCarousel } from "./TilePopUpCarousel";
import {useMyContext} from '../../../Context/MyContext';
import { ThemeFonts } from "../../../../assets/Themes/ThemeFont";
import { DefaultTilePopUp } from "./DefaultTilePopUp";
import { SwitchSquaresMode } from "./SwitchSquaresMode";

export default function TilePopUp({popUpTile, setPopUpTile, selectedTiles, setSelectedTiles}) {
    const {item, index, row} = popUpTile;
    const {user} = useMyContext();

    const [ourPlayer, setOurPlayer] = useState({
        id: null,
        playerCards: []
    })
    const [otherPlayer, setOtherPlayer] = useState({
        id: null,
        playerCards: []
    })
    const [mode, setMode] = useState("default");
    const [switchTile, setSwitchTile] = useState(null);

    const player1Id = "ben";
    const player2Id = "87a07407-f69a-45b8-a51c-e37367c3ad28";

    const player1Team = [
        {
            name: 'Alperen Sengun',
            averagePerGame: {
                "PTS": [20, 5, 5, 5, 5],
                "REB": [15, 2, 2, 3, 8],
                "AST": [10, 2.5, 2.5, 2.5, 2.5]
            }
        },
        {
            name: 'Alperen Sengun',
            averagePerGame: {
                "PTS": [20, 5, 5, 5, 5],
                "REB": [15, 2, 2, 3, 8],
                "AST": [10, 2.5, 2.5, 2.5, 2.5]
            }
        },
        {
            name: 'Alperen Sengun',
            averagePerGame: {
                "PTS": [20, 5, 5, 5, 5],
                "REB": [15, 2, 2, 3, 8],
                "AST": [10, 2.5, 2.5, 2.5, 2.5]
            }
        }
    ]
    const player1Cards = [
        {
            name: 'Alperen Sengun',
            averagePerGame: {
                "PTS": [20, 5, 5, 5, 5],
                "REB": [15, 2, 2, 3, 8],
                "AST": [10, 2.5, 2.5, 2.5, 2.5]
            }
        },
        {
            name: 'Alperen Sengun',
            averagePerGame: {
                "PTS": [20, 5, 5, 5, 5],
                "REB": [15, 2, 2, 3, 8],
                "AST": [10, 2.5, 2.5, 2.5, 2.5]
            }
        },
        {
            name: 'Alperen Sengun',
            averagePerGame: {
                "PTS": [20, 5, 5, 5, 5],
                "REB": [15, 2, 2, 3, 8],
                "AST": [10, 2.5, 2.5, 2.5, 2.5]
            }
        }
    ]

    const player2Team = [
        {name: 'ben'}
    ]
    const player2Cards = [
        {name: 'ben'}
    ]


    useEffect(() => {
        setOurPlayer({
            id: user.id,
            playerCards: [...player1Cards]
        })

        if(user.id === player1Id){
            setOtherPlayer({
                id: player2Id,
                playerCards: [...player2Cards]
            })
        } else {
            setOtherPlayer({
                id: player1Id,
                playerCards: [...player1Cards]
            })
        }
    },[])
    
    return (
        <View style={{
            flex: 1, width:"100%", height:"100%", backgroundColor:'rgba(0,0,0, .5)', 
            position:'absolute', justifyContent:'center', alignItems:"center"
        }}>
            {mode === "default" ? 
                <DefaultTilePopUp 
                    setSelectedTiles={setSelectedTiles} popUpTile={popUpTile}
                    selectedTiles={selectedTiles} setPopUpTile={setPopUpTile}
                    item={item} ourPlayer={ourPlayer} index={index} row={row}
                    setMode={setMode} setSwitchTile={setSwitchTile}
                /> : null
            }

            {mode === "switch" ? 
                <SwitchSquaresMode 
                    setSelectedTiles={setSelectedTiles} popUpTile={popUpTile}
                    selectedTiles={selectedTiles} setPopUpTile={setPopUpTile}
                    item={item} ourPlayer={ourPlayer} index={index} row={row}
                    setMode={setMode}
                    setSwitchTile={setSwitchTile} switchTile={switchTile}
                /> : null
            }           

    </View>
    )
}