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
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[1].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={1} 
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[2].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={2} 
              setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[3].map((item, index) => (
            <Tile 
              key={index} index={index} item={item} row={3} 
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
