import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { generateMatrix } from '../../functions/GamePlayFunctions';
import { fetchGames } from '../../functions/GameStartFunctions';
import { generateMatrix2 } from '../../functions/MatrixFunctions';
import {UpperPart} from './UpperPart';
import Tile from './Tile';
import TilePopUp from './TilePopUp/TilePopUp';

export const PreGameMatrix = ({ game, matrix }) => {

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
    console.log("PreMatrix", retMat)
    setMakeShiftMatrx(generateMatrix2());
  }, [])

  return (
  <View style={{ flex: 1, marginTop: 100, width:"100%", height:"100%", alignItems: 'center'}}>

    <UpperPart selectedTiles={selectedTiles} game={JSON.parse(game)}/>

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