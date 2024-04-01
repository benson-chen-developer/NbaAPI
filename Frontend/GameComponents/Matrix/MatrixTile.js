import { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getTeamLogo } from "../../../assets/TeamLogos/getTeamLogo";

export default function MatrixTile({row, index, item, matrixInfo, setMatrixInfo}) {
    const tileStats = item;
    const [isSelected, setIsSelected] = useState(false); 
    const [isSwaped, setIsSwapped] = useState(false);
    const [isOpp, setIsOpp] = useState(false);
    const [progress, setProgress] = useState(`0%`);
    
    const onPress = () => {
        setMatrixInfo(p => ({
            ...p, 
            pickedTile: {...tileStats, row, index},
            popUpMode: "default"
        }))
    }

    useEffect(() => {
        let isSelected = matrixInfo.selectedTiles.find(selectedTile => 
            (selectedTile.index == tileStats.index && selectedTile.row == tileStats.row)
        )
        let isSwaped = matrixInfo.selectedTiles.find(selectedTile => 
            (selectedTile.swapTile?.index == tileStats.index && selectedTile.swapTile?.row == tileStats.row)
        )
        let isOpp = matrixInfo.oppSelectedTiles.find(oppSelectedTile => 
            (oppSelectedTile.index == tileStats.index && oppSelectedTile.row == tileStats.row)
        )

        let team1Bar = (tileStats.team1Progress/tileStats.team1Goal * 100) > 100 ? 100 : (tileStats.team1Progress/tileStats.team1Goal * 100);
        let team2Bar = (tileStats.team2Progress/tileStats.team2Goal * 100) > 100 ? 100 : (tileStats.team1Progress/tileStats.team1Goal * 100);
        
        if(isSelected){
            if(matrixInfo.isPlayer1){
                setProgress(`${team1Bar}%`);
            }
            else setProgress(`${team2Bar}%`);
            setIsSelected(true);
        }
        else if(isSwaped) setIsSwapped(true);
        else if(isOpp) {
            // console.log("Opp", team2Bar, team1Bar)
            if(matrixInfo.isPlayer1) {
                setProgress(`${team2Bar}%`);
            }
            else{
                setProgress(`${team1Bar}%`);
            }
            setIsOpp(true);
        }
        
    }, [matrixInfo.selectedTiles])
    
    return (
        <TouchableOpacity 
            style={
                isSwaped && styles.swapped ||
                isSelected && styles.selected || 
                isOpp && styles.oppSelected || 
                styles.notSelected
            }
            onPress={() => onPress()}
        >
            <View style={{margin:5}}>
                <Text style={styles.title}>{tileStats.name}</Text>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                    <View style={{flexDirection:'row'}}>
                        {/* <Image style={{width:20, height:20, marginRight:3}} source={getTeamLogo(matrixInfo.teams[0])}/> */}
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            IND
                        </Text>
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            {tileStats.team1Goal }
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        {/* <Image style={{width:20, height:20, marginRight:3}} source={getTeamLogo(matrixInfo.teams[1])}/>
                        <Text style={styles.statText}>{tileStats.team2Goal }</Text> */}
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            CLE
                        </Text>
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            {tileStats.team2Goal }
                        </Text>
                    </View>
                </View>
                
                <Text>{tileStats.team1Complete ? "team1 won" : null}</Text>
                <Text>{tileStats.team2Complete ? "team2 won" : null}</Text>

            </View>

            {progress !== '0%' || isOpp || isSelected ?
                <View style={styles.progressBar}>
                    <View style={{
                        width:progress, height:"100%", 
                        backgroundColor: isOpp ? '#f2133b' : '#2bd6b2',
                    }}/>
                </View> : null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    notSelected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3,marginBottom:3,
        borderRadius: 5, justifyContent:'space-between'
    },
    selected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#2bd6b2', borderWidth: 4,
        borderRadius: 5, marginBottom:3, justifyContent:'space-between'
    },
    swapped : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#f1c513', borderWidth: 4,
        borderRadius: 5, marginBottom:3, justifyContent:'space-between'
    },
    oppSelected : {
        width: 150, height:125, backgroundColor:'#273447', 
        marginLeft: 3, borderColor: '#f2133b', borderWidth: 4,
        borderRadius: 5, marginBottom:3, justifyContent:'space-between'
    },
    progressBar: {
        width:"100%", backgroundColor: '#121724', height: 5,
        borderBottomLeftRadius: 5, borderBottomRightRadius: 5
    },
    title: {
        color:"white", fontFamily:'Roboto-Bold', fontSize:20
    },
    statText: {
        color:"white", fontFamily:'Roboto-Bold', fontSize: 18
    }
})