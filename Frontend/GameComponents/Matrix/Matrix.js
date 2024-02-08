import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { generateMatrix } from '../../functions/GamePlayFunctions';
import { fetchGames } from '../../functions/GameStartFunctions';
import Tile from './Tile';

export const Matrix = ({ matrix }) => {

  const [makeShiftMatrx, setMakeShiftMatrx] = useState(
    [
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
      [{}, {}, {}, {}]
    ]
  );

  const getBoxScore = async (link) => {
    try {
      const response = await fetch(link);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Maxtrix Current Box Score", data.game.homeTeam.players);
      
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(() => {
    // console.log("Matrix", matrix)

    // const intervalId = setInterval(() => {
    //     getBoxScore(matrix.link);
    // }, 10000);

    // return () => clearInterval(intervalId);
    // setMakeShiftMatrx(generateMatrix());
  }, [])

  // const renderTile = ({ item, index }) => {
  //   return <Tile item={item} index={index} />;
  // };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
    <ScrollView horizontal={true}>

      {/* <View style={{flexDirection:'column'}}>
        <View style={{ flexDirection: 'row' }}>
          {matrix.matrix[0].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {matrix.matrix[1].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {matrix.matrix[2].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {matrix.matrix[3].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
      </View> */}

      <View style={{flexDirection:'column'}}>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[0].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[1].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[2].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {makeShiftMatrx[3].map((item, index) => (
            <Tile key={index} item={item} />
          ))}
        </View>
      </View>

    </ScrollView>
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