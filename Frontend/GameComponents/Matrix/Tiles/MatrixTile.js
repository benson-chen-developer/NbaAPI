import { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getTeamLogo } from "../../../../assets/TeamLogos/getTeamLogo";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CompleteTile } from "./CompleteTile";
import { Icons } from "./Icons";

export default function MatrixTile({item, matrixInfo, setMatrixInfo}) {
    const tileStats = item;

    const [selectedTile, setSelectedTile] = useState(null);
    const [swapedTile, setSwapedTile] = useState(null);
    const [isOpp, setIsOpp] = useState(false);
    const [progress, setProgress] = useState(0);

    const onPress = () => {
        setMatrixInfo(p => ({
            ...p, 
            pickedTile: {...tileStats},
            popUpMode: "default"
        }))
    }
    // console.log("tileStats", tileStats)
    // console.log("")

    useEffect(() => {
        const selectedTile = matrixInfo.selectedTiles.find(s => (s.index === tileStats.index && s.row === tileStats.row));
        setSelectedTile(selectedTile);

        const swapedTile = matrixInfo.selectedTiles.find(s => (s.swapTile?.index === tileStats.index && s.swapTile?.row === tileStats.row));
        setSwapedTile(swapedTile);

        let isOpp = matrixInfo.oppSelectedTiles.find(oppSelectedTile => 
            (oppSelectedTile.index == tileStats.index && oppSelectedTile.row == tileStats.row)
        )

        let team1Bar = (tileStats.team1Progress/tileStats.team1Goal * 100) > 100 ? 100 : (tileStats.team1Progress/tileStats.team1Goal * 100);
        let team2Bar = (tileStats.team2Progress/tileStats.team2Goal * 100) > 100 ? 100 : (tileStats.team2Progress/tileStats.team2Goal * 100);
        
        if(selectedTile){
            if(matrixInfo.isPlayer1){
                setProgress(team1Bar);
            }
            else setProgress(team2Bar);
        }
        else if(isOpp) {
            if(matrixInfo.isPlayer1) {
                setProgress(team2Bar);
            }
            else{
                setProgress(team1Bar);
            }
            setIsOpp(true);
        }
        
    }, [matrixInfo])
    
    if(tileStats.team1Complete || tileStats.team2Complete) return (
        <CompleteTile 
            tileStats={tileStats}
        />
    )

    return (
        <TouchableOpacity 
            style={
                swapedTile && styles.swapped ||
                selectedTile && styles.selected || 
                isOpp && styles.oppSelected || 
                styles.notSelected
            }
            onPress={() => onPress()}
        >
            <View style={{margin:5}}>
                <View style={{width:"100%", justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={styles.title}>{tileStats.name}</Text>

                    {swapedTile ? 
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontFamily:'Roboto-Bold', color:"#f1c513"}}>
                                {swapedTile.row}.{swapedTile.index+1}
                            </Text>
                            <AntDesign name="arrowright" size={14} color="white" />
                            <Text style={{fontSize:16, fontFamily:'Roboto-Bold', color:"white"}}>
                                {tileStats.row}.{tileStats.index+1}
                            </Text>
                        </View> :
                        <Text style={{fontSize:16, fontFamily:'Roboto-Bold', color:"#A5A8AD"}}>
                            {tileStats.row}.{tileStats.index+1}
                        </Text>
                    }
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            IND
                        </Text>
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            {tileStats.team1Goal }
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            CLE
                        </Text>
                        <Text style={{color:"white", fontFamily:'Roboto-Bold', fontSize: 16}}>
                            {tileStats.team2Goal }
                        </Text>
                    </View>
                </View>
                
            </View>

            <View style={{margin: 5}}>
                <Icons stats={tileStats.name.split("+")}/>
            </View>

            {progress !== 0 || isOpp || selectedTile ?
                <View style={styles.progressBar}>
                    <View style={{
                        width: `${progress}%`, height:"100%", 
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
    },
    title: {
        color:"white", fontFamily:'Roboto-Bold', fontSize:19
    },
    statText: {
        color:"white", fontFamily:'Roboto-Bold', fontSize: 18
    }
})