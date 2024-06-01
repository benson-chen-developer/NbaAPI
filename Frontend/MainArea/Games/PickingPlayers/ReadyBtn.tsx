import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../Global/Enums/color';

interface Props {
    text: string;
    startGame: () => void;
}

export const ReadyBtn: React.FC<Props> = ({ text, startGame }) => {
    return (
        <View style={styles.container}>
            {text === "Ready" ? (
                <TouchableOpacity 
                    style={[styles.button, styles.readyButton]} 
                    onPress={() => startGame()}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </TouchableOpacity>
            ) : (
                <View style={[styles.button, styles.defaultButton]}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: 175,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    readyButton: {
        backgroundColor: Colors.green,
    },
    defaultButton: {
        backgroundColor: 'grey',
    },
    text: {
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        fontSize: 19,
    },
});
