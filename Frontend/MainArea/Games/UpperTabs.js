import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function UpperTabs({ setGameScreen }){
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => setGameScreen("inventory")} style={styles.button}>
        <Text style={styles.buttonText}>Live</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // position:'absolute',
    backgroundColor: '#f0f0f0',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
