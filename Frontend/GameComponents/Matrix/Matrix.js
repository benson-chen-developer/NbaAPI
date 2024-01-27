import React from 'react';
import { FlatList, View } from 'react-native';
import Tile from './Tile';

export const Matrix = ({ matrix }) => {
  const renderTile = ({ item, index }) => {
    return <Tile item={item} index={index} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={matrix}
        numColumns={4}
        renderItem={renderTile}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
