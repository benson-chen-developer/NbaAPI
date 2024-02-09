import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { generateMatrix } from '../../functions/GamePlayFunctions';
import { fetchGames } from '../../functions/GameStartFunctions';
import { generateMatrix2 } from '../../functions/MatrixFunctions';
import Tile from './Tile';
import TilePopUp from './TilePopUp/TilePopUp';

export const PreGameMatrix = ({ matrix }) => {

  const [makeShiftMatrx, setMakeShiftMatrx] = useState(
    [
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
      [{}, {}, {}, {}]
    ]
  );

  const [selectedTiles, setSelectedTiles] = useState([]);
  const [popUpTile, setPopUpTile] = useState(null);

  useEffect(() => {
    
    const retMat = generateMatrix2();
    // console.log("PreMatrix", retMat)
    setMakeShiftMatrx(generateMatrix2());
  }, [])

  // useEffect(() => {
  //   console.log("pregamematrix", popUpTile)
  // }, [popUpTile])

  // const renderTile = ({ item, index }) => {
  //   return <Tile item={item} index={index} />;
  // };

  return (
  <View style={{ flex: 1, marginTop: 100, width:"100%", height:"100%", alignItems: 'center',}}>

    {/* Upper Text */}
    <View style={{ width: "100%", alignItems: 'center', height: 50}}>
      {selectedTiles.length === 3 ?
        <Text></Text>
          :
        <Text style={{color:'white', fontSize: 20}}>
          Pick {3 - selectedTiles.length} Squares
        </Text>
      }
    </View>

    <ScrollView horizontal={true}>
      <View style={{flexDirection:'column'}}>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[0].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={0} 
              selectedTiles={selectedTiles}
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[1].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={1} 
              selectedTiles={selectedTiles}
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[2].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={2} 
              selectedTiles={selectedTiles}
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[3].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={3} 
              selectedTiles={selectedTiles}
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
      </View>
    </ScrollView>

    {popUpTile ?
      <TilePopUp 
        popUpTile={popUpTile} setPopUpTile={setPopUpTile} 
        selectedTiles={selectedTiles} setSelectedTiles={setSelectedTiles}
      /> : null
    }
  </View>
  );
};

export const getFullNameOfStat = (sortName) => {
  if(sortName === "AST") return "Assists";
  else if(sortName === "PTS") return "Points";
  else if(sortName === "REB") return "Rebounds";
  else if(sortName === "PTS+REB") return "Points + Rebounds";
  else if(sortName === "PTS+AST") return "Points + Assists";
  else if(sortName === "PTS+REB+AST") return "Points + Assists + Rebounds";
  else if(sortName === "BLK") return "Blocks";
  else if(sortName === "STL") return "Steals";
  else if(sortName === "BLK+STL") return "Blocks + Steals";
  else if(sortName === "FGM") return "Field Goals Made";
  else if(sortName === "FGA") return "Field Goals Attempted";
  else if(sortName === "3PM") return "3 Pointers Made";
  else if(sortName === "3PA") return "3 Pointers Attempted";
  else if(sortName === "FTA") return "Free Throws Attempted";
  else if(sortName === "FTM") return "Free Throws Made";
  else if(sortName === "FTA") return "Free Throws Attempted";
  else "Err"
}