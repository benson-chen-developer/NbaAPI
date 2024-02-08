import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { getFullNameOfStat } from "../Matrix";
import { TilePopUpCarousel } from "./TilePopUpCarousel";
import { ThemeFonts } from "../../../../assets/Themes/ThemeFont";

export const DefaultTilePopUp = ({
        item,
        ourPlayer,
        popUpTile, setPopUpTile, 
        selectedTiles, setSelectedTiles
    }) => {
        
    return(
        <View style={{
            flex: 1, width:"100%", height:"100%", backgroundColor:'rgba(0,0,0, .5)', 
            position:'absolute', justifyContent:'center', alignItems:"center"
        }}>
            <View style={{
                width:"90%", height:"90%", backgroundColor:"#273447", borderRadius: 8,
                alignItems:'center'
            }}>
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
                    setSelectedTiles={setSelectedTiles} popUpTile={popUpTile}
                    selectedTiles={selectedTiles} setPopUpTile={setPopUpTile}
                />
            </View>
        </View>
    )
}

const SelectBtn = ({popUpTile, selectedTiles, setSelectedTiles, setPopUpTile}) => {
    return(
        <TouchableOpacity onPress={() => {
            if(selectedTiles.length >= 3){

            } else {
                setSelectedTiles(p => [...p, popUpTile])
                setPopUpTile(null);
            }
        }}>
            <View style={{
                width: 100, height: 60, backgroundColor: "#23076e",
                 alignItems:'center', borderRadius:5
            }}>
                <View style={{
                    width: 100, height: 55, backgroundColor: "#5214f5",
                    justifyContent:'center', alignItems:'center', borderRadius:5
                }}>
                    <Text style={{color:'white', fontFamily:ThemeFonts, fontSize: 25}}>
                        Select
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    carouselText: {
        color: "white", fontFamily: ThemeFonts, fontSize: 25, marginTop: 20
    }
})