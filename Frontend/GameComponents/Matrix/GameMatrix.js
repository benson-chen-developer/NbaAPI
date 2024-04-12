import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import MatrixTile from './Tiles/MatrixTile';

export const GameMatrix = ({  matrixInfo, setMatrixInfo }) => {

  useEffect(() => {
  }, [])

  return (
        <View style={{ width:"100%", height:"68%"}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:'column'}}>
                    <View style={{ flexDirection: 'row', marginRight: 2 }}>
                        {matrixInfo.allTiles.slice(0,4).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {matrixInfo.allTiles.slice(4,8).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {matrixInfo.allTiles.slice(8,12).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {matrixInfo.allTiles.slice(12,16).map((item, index) => (
                            <MatrixTile 
                                key={index} item={item}
                                setMatrixInfo={setMatrixInfo} matrixInfo={matrixInfo}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
  );
};
