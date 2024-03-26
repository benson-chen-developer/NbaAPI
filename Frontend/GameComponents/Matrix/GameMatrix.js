import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import MatrixTile from './MatrixTile';

export const GameMatrix = ({ allTiles, isPlayer1, matrixInfo, setMatrixInfo }) => {

  useEffect(() => {
  }, [])

  return (
        <View style={{ width:"100%", height:"68%"}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:'column'}}>
                    <View style={{ flexDirection: 'row', marginRight: 2 }}>
                        {allTiles.slice(0,4).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={1} index={index} isPlayer1={isPlayer1}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {allTiles.slice(4,8).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={2} index={index} isPlayer1={isPlayer1}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {allTiles.slice(8,12).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={3} index={index} isPlayer1={isPlayer1}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {allTiles.slice(12,16).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item} row={4} index={index} isPlayer1={isPlayer1}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
  );
};
