import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import MatrixTile from './MatrixTile';
import Tile from '../PreGamePhase/Tile';

export const GameMatrix = ({ game, matrixInfo, setMatrixInfo }) => {

  useEffect(() => {

  }, [])

  return (
        <View style={{ flex: 1}}>
            <ScrollView horizontal={true}>
                <View style={{flexDirection:'column'}}>
                    <View style={{ flexDirection: 'row', marginRight: 2 }}>
                        {game.matrixRow1.map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={1} index={index}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    {/* <View style={{ flexDirection: 'row' }}>
                        {game.matrixRow2.map((item, index) => (
                            <Tile key={index} item={item} />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {game.matrixRow3.map((item, index) => (
                            <Tile key={index} item={item} />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {game.matrixRow4.map((item, index) => (
                            <Tile key={index} item={item} />
                        ))}
                    </View> */}
                </View>
            </ScrollView>
        </View>
  );
};
