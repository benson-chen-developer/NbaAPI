import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import MatrixTile from './MatrixTile';

export const GameMatrix = ({ game, matrixInfo, setMatrixInfo }) => {

  useEffect(() => {

  }, [])

  return (
        <View style={{ width:"100%", height:"68%"}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:'column'}}>
                    <View style={{ flexDirection: 'row', marginRight: 2 }}>
                        {game.matrixRow1.map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={1} index={index}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {game.matrixRow2.map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={2} index={index}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {game.matrixRow3.map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={3} index={index}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {game.matrixRow4.map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={4} index={index}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
  );
};
