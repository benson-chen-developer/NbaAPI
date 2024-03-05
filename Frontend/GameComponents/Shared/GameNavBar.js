import { View, TouchableOpacity, StyleSheet, Text } from "react-native"

export const GameNavBar = ({ matrixInfo, setMatrixInfo }) => {
    return(
        <View style={{width:"100%", height:60, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
            <TouchableOpacity 
                style={matrixInfo.navBar === "board" ? styles.mainPicked : styles.main}
                onPress={() => setMatrixInfo(p => ({...p, navBar: "board"}))}
            >
                <Text style={matrixInfo.navBar === "board" ? styles.textPicked : styles.text}>
                    Board
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={matrixInfo.navBar === "game" ? styles.mainPicked : styles.main}
                onPress={() => setMatrixInfo(p => ({...p, navBar: "game"}))}
            >
                <Text style={matrixInfo.navBar === "game" ? styles.textPicked : styles.text}>
                    Game
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width:100, height:"60%", borderRadius:10, backgroundColor:'#273447',
        margin: 10, justifyContent:'center', alignItems:'center'
    },
    mainPicked: {
        width:100, height:"60%", borderRadius:10,
        margin: 10, justifyContent:'center', alignItems:'center', backgroundColor:'white'
    },
    text: {
        color:'white', fontFamily:'Roboto-Bold', fontSize:20
    },
    textPicked: {
        color:'#111A2B', fontFamily:'Roboto-Bold', fontSize:20
    }
})