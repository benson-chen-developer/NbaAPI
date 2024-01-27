import { Text, TouchableOpacity, View } from 'react-native';
import { Matrix } from '../Matrix/Matrix';
import { useEffect, useState } from 'react';

export default function PrepScreen({readyUpPress, handleLeaveGame, currentGame}) {

    return (
      <View style={{width:"50%", height:200, borderColor:'grey', borderWidth: 2}}>
        <Text>{currentGame.player1Id}: {currentGame.player1Ready ? "Ready" : "Not Ready"}</Text>

        <Text>{currentGame.player2Id}: {currentGame.player2Ready ? "Ready" : "Not Ready"}</Text>

        <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Matrix matrix={currentGame.Matrix}/>
        </View>
        
        <TouchableOpacity onPress={() => readyUpPress()}>
          <Text>Ready Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLeaveGame()}>
          <Text>Leave Game</Text>
        </TouchableOpacity>
      </View>
    );
  }