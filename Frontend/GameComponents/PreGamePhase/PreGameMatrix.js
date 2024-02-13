import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { generateMatrix } from '../../functions/GamePlayFunctions';
import { fetchGames, getGameViaId } from '../../functions/GameStartFunctions';
import { generateMatrix2 } from '../../functions/MatrixFunctions';
import {UpperPart} from './UpperPart';
import Tile from './Tile';
import TilePopUp from './TilePopUp/TilePopUp';

/*
    Parse each individual element in matrix
*/
export const PreGameMatrix = ({ game }) => {

  const [matrix, setMatrix] = useState([]);

  const [selectedTiles, setSelectedTiles] = useState([]);
  const [popUpTile, setPopUpTile] = useState(null);

  useEffect(() => {
    // console.log(game)
    getGameViaId(game.id)
      .then(res => {
        setMatrix([
          [...res.matrixRow1.map(JSON.parse)],
          [...res.matrixRow2.map(JSON.parse)],
          [...res.matrixRow3.map(JSON.parse)],
          [...res.matrixRow4.map(JSON.parse)]
        ]);
      })
      .catch(error => {
        console.error("Error fetching game:", error);
      });
  }, []);

  useEffect(() => {
    // console.log(matrix)
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
                selectedTiles={selectedTiles}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {matrix[1].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={1} 
                selectedTiles={selectedTiles}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {matrix[2].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={2} 
                selectedTiles={selectedTiles}
                setPopUpTile={setPopUpTile} setSelectedTiles={setSelectedTiles}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {matrix[3].map((item, index) => (
              <Tile 
                key={index} index={index} item={item} row={3} 
                selectedTiles={selectedTiles}
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