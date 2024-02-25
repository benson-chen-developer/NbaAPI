import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Navbar = ({ setScreen }) => {
  
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => setScreen("Inventory")} style={styles.button}>
        <Text style={styles.buttonText}>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen("Games")} style={styles.button}>
        <Text style={styles.buttonText}>Games</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen("Live")} style={styles.button}>
        <Text style={styles.buttonText}>Live</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate("GameHome", { 
          homeTeam: "Lakers",
          awayTeam: "Spurs",
          player1Team: ["LeBron James", "D'Angelo Russell"],
          player2Team: ["Victor Wembanyama", "Jeremy Sochan"],
          api: 'https://cdn.nba.com/static/json/liveData/boxscore/boxscore_0022300813.json'
        })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Profile</Text>
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

export default Navbar;
