import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { generateMatrix } from '../../functions/GameFunctions/GamePlayFunctions';
import { fetchGames, getGameViaId } from '../../functions/GameFunctions/GameStartFunctions';
import { generateMatrix2 } from '../../functions/MatrixFunctions';
import {UpperPart} from './UpperPart';
import Tile from './Tile';
import TilePopUp from './TilePopUp/TilePopUp';
import { setAsyncPreGameBoards, getAsyncPreGameBoards, clearAsyncPreGameBoards } from '../../functions/AsyncStorage/AsyncPreGameBoards';

/*
    Parse each individual element in matrix
*/
export const PreGameMatrix = ({ game }) => {

  const [matrix, setMatrix] = useState([]);

  const [selectedTiles, setSelectedTiles] = useState([]);
  const [popUpTile, setPopUpTile] = useState(null);

  useEffect(() => {
    // clearAsyncPreGameBoards()
    getAsyncPreGameBoards(game.id).then(selectedTilesRes => {
      setSelectedTiles(selectedTilesRes.selected);
      setMatrix([
        game.matrixRow1,
        game.matrixRow2,
        game.matrixRow3,
        game.matrixRow4,
      ])
    })
  }, []);

  useEffect(() => {
    // console.log("pre",matrix)
  }, [matrix])

  return (
  <View style={{ flex: 1, marginTop: 100, width:"100%", height:"100%", alignItems: 'center'}}>

    <UpperPart selectedTiles={selectedTiles} game={game}/>

    {matrix.length === 4 ?
      <ScrollView horizontal={true}>
        <View style={{flexDirection:'column'}}>
          <View style={{ flexDirection: 'row' }}>
            {matrix[0].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={0} 
                selectedTiles={selectedTiles} game={game}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {matrix[1].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={1} 
                selectedTiles={selectedTiles} game={game}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {matrix[2].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={2} 
                selectedTiles={selectedTiles} game={game}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {matrix[3].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={3} 
                selectedTiles={selectedTiles} game={game}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
        </View>
      </ScrollView> : <Text style={{color:'white'}}>Loading</Text>
    }

    {popUpTile ?
      <TilePopUp 
        popUpTile={popUpTile} setPopUpTile={setPopUpTile} 
        selectedTiles={selectedTiles} setSelectedTiles={setSelectedTiles}
      /> : null
    }
  </View>
  );
};