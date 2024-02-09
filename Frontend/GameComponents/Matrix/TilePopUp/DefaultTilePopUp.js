import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { getFullNameOfStat } from "../PreGameMatrix";
import { TilePopUpCarousel } from "./TilePopUpCarousel";
import { ThemeFonts } from "../../../../assets/Themes/ThemeFont";

export const DefaultTilePopUp = ({
        setMode, setSwitchTile,
        item, index, row,
        ourPlayer,
        popUpTile, setPopUpTile, 
        selectedTiles, setSelectedTiles
    }) => {

    return(
        <View style={{width:"90%", height:"90%", backgroundColor:"#273447", borderRadius: 8, alignItems:'center'}}>
            {/* X Btn */}
            <TouchableOpacity   
                style={{
                    height: 25, width:"80%", marginTop:30, marginBottom:10,
                    alignItems:'flex-end', justifyContent:'center'
                }}
                onPress={() => setPopUpTile(null)}
            >
                <Text style={{color:'white'}}>X</Text>
            </TouchableOpacity>

            <Text style={{color:"white"}}>{getFullNameOfStat(item.name)}</Text>

            <Text style={styles.carouselText}>In Play</Text>
            <TilePopUpCarousel 
                ourPlayer={ourPlayer} statName={item.name}
            />

            <Text style={styles.carouselText}>Bench</Text>
            <TilePopUpCarousel 
                ourPlayer={ourPlayer} statName={item.name}
            />

            <SelectBtn 
                setSelectedTiles={setSelectedTiles} 
                popUpTile={popUpTile}
                selectedTiles={selectedTiles} 
                setPopUpTile={setPopUpTile}
                setMode={setMode} setSwitchTile={setSwitchTile}
                isSelected={selectedTiles.find(a => a.index === index && a.row === row)}
            />
        </View>
    )
}

const SelectBtn = ({setSwitchTile, setMode, isSelected, popUpTile, selectedTiles, setSelectedTiles, setPopUpTile}) => {
    return(
        <TouchableOpacity onPress={() => {
            if(selectedTiles.length >= 3){
                setMode("switch");
                setSwitchTile(popUpTile);
            } else {
                setSelectedTiles(p => [...p, popUpTile])
                setPopUpTile(null);
            }
        }}>
            <View style={{
                width: 110, height: 60, backgroundColor: "#23076e",
                alignItems:'center', borderRadius:5, 
                opacity: isSelected ?  .5 : 1
            }}>
                <View style={{
                    width: 110, height: 55, backgroundColor: "#5214f5", opacity:.6,
                    justifyContent:'center', alignItems:'center', borderRadius:5,
                    opacity: isSelected ?  .5 : 1
                }}>
                    <Text style={{color:'white', fontFamily:ThemeFonts, fontSize: 25}}>
                        {isSelected ? "Picked" : "Pick"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    carouselText: {
        color: "white", fontFamily: ThemeFonts, fontSize: 25, marginTop: 20
    },
})