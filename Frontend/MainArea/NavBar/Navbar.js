import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Navbar = ({ setScreen }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => setScreen("inventory")} style={styles.button}>
        <Text style={styles.buttonText}>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen("games")} style={styles.button}>
        <Text style={styles.buttonText}>Games</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen("profile")} style={styles.button}>
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
