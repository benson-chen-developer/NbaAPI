import React, { useEffect } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import Tile from './Tile';

export const Matrix = ({ matrix }) => {

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

    const intervalId = setInterval(() => {
        getBoxScore(matrix.link);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [])

  // const renderTile = ({ item, index }) => {
  //   return <Tile item={item} index={index} />;
  // };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
    <ScrollView horizontal={true}>

      <View style={{flexDirection:'column'}}>
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

      </View>
    </ScrollView>
  </View>
  );
};
