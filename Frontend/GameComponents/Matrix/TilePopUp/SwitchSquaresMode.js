import { View, Text } from "react-native"
import { ThemeFonts } from "../../../../assets/Themes/ThemeFont"
import { ProgressBarTilePopUp } from "./ProgressBarTilePopUp"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const SwitchSquaresMode = ({setMode, switchTile, setSwitchTile, selectedTiles}) => {
    return(
        <View style={{width:"90%", height:"90%", backgroundColor:"#273447", borderRadius: 8,alignItems:'center'}}>
            
            <View style={{height:75, width: "90%", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{width:48, height:48, backgroundColor:"#16202e", borderRadius:5, alignItems:'center'}}>
                    <View style={{width:48, height:44, backgroundColor:"#3f5980", borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name="arrow-back" size={35} color="white" />
                    </View>
                </View>
                
                <View>
                    <Text style={{color:'black', fontFamily:ThemeFonts, fontSize:30, position:'absolute', top:3, left:3}}>Swap Squares</Text>
                    <Text style={{color:'white', fontFamily:ThemeFonts, fontSize:30}}>Swap Squares</Text>
                </View>

                <View style={{width:48, height:48, backgroundColor:"#16202e", borderRadius:5, alignItems:'center'}}>
                    <View style={{width:48, height:44, backgroundColor:"#3f5980", borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                        {/* <AntDesign name="close" size={35} color="white" /> */}
                        <FontAwesome name="close" size={32} color="white" />
                    </View>
                </View>
            </View>

            <View style={{width:"100%", marginLeft: 30}}>
                {selectedTiles.map((tile, index) => (
                    <SelectedTiles key={index} tile={tile}/>
                ))}
            </View>

            <PickedTile switchTile={switchTile}/>

        </View>
    )
}

const SelectedTiles = ({tile}) => {
    // console.log("SwitchSquaresMode Tile:", tile)

    return(
        <View style={{
            width: "90%", height: 120, backgroundColor:"rgba(0,0,0,.3)", marginBottom: 20,
            borderRadius: 5, flexDirection:'row', alignItems:'center', justifyContent:'center',
            borderWidth: 3, borderColor: '#2bd6b2'
        }}>
            <View style={{height:"90%", width: "40%", backgroundColor:'#3f5980', borderRadius:4, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontFamily: ThemeFonts, fontSize: 30}}>
                    23 {tile.item.name}
                </Text>
            </View>

            <View style={{height:"90%", width: "55%", borderRadius:4, marginLeft: 6, justifyContent:'center', alignItems:'center'}}>
                
                <ProgressBarTilePopUp 
                    current={tile.item.team1Progress} total={20}
                />

                <View style={{marginTop:10}} />
                <ProgressBarTilePopUp 
                    // current={tile.item.team1Progress}
                    current={10}
                    total={20}
                />
            </View>
        </View>
    )
}

const PickedTile = ({switchTile}) => {
    // console.log("SwitchSquaresMode Picked Tile:", switchTile)

    return(
        <View style={{
            width: "90%", height: 120, backgroundColor:"rgba(0,0,0,.2)",
            borderRadius: 5, flexDirection:'row', alignItems:'center', justifyContent:'space-around',
            borderWidth: 3, borderColor: 'white'
        }}>
            <View style={{height:"90%", width: "40%", backgroundColor:'#3f5980', borderRadius:4, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontFamily: ThemeFonts, fontSize: 30}}>
                    23 {switchTile.item.name}
                </Text>
            </View>

            <View style={{width: "55%", height:"90%", marginTop:20, justifyContent:'space-between'}}>
                
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{color:'white', fontSize: 20, fontFamily:ThemeFonts}}>
                        Current
                    </Text>
                    <Text style={{color:'white', fontSize: 25, fontFamily:ThemeFonts, marginBottom:1, marginRight: 10}}>
                        14
                    </Text>
                </View>

                <ProgressBarTilePopUp 
                    // current={tile.item.team1Progress}
                    current={10}
                    total={20}
                />
                <View />
            </View>
        </View>
    )
}