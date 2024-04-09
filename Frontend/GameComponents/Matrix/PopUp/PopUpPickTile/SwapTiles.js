import { View, Text } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export const SwapTiles = ({newTile, oldTile, setMatrixInfo}) => {
    
    const CancelFunc = () => {
        setMatrixInfo(p => ({
            ...p,
            // selectedTiles: p.selectedTiles.map(selectedTile => ({
            //     ...selectedTile,
            //     swapTile: (selectedTile.swapTile?.index === newTile.index && selectedTile.swapTile?.row === newTile.row) ? null : selectedTile.swapTile
            // })),
            selectedTiles: p.selectedTiles.map(selectedTile => {
                if (selectedTile.index === oldTile.index && selectedTile.row === oldTile.row) {
                    return { ...selectedTile, swapTile: null };
                } else {
                    return selectedTile;
                }
            }),
            popUpMode: 'none'
        }))
    }

    return(
        <View style={{width:"100%", marginTop: 30}}>

            <View style={{width:"100%", flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                <View style={{
                    flexDirection: 'row', width: 210, justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <Tile tile={newTile} />

                    <Tile tile={oldTile} />

                    <View style={{width:210, alignItems:'center', justifyContent:'center', position:'absolute',}}>
                        <View style={{
                            width:40, height:40, borderRadius: 20, backgroundColor:'#3f5274', 
                            alignItems:'center', justifyContent:'center'
                        }}>
                            <AntDesign name="arrowright" size={30} color="white" />
                        </View>
                    </View>
                </View>

                {/* <View style={{width:80, height:40, backgroundColor:'#ab1732', alignItems:'center', borderRadius:5}}>
                    <View style={{width:80, height:37, backgroundColor:'#de163a', alignItems:'center', justifyContent:'center', flexDirection:'row', borderRadius:5}}>
                        <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:20}}>Cancel</Text>
                        <Feather name="x" size={24} color="white" />
                    </View>
                </View> */}

                <TouchableOpacity 
                    style={{width:40, height:40, backgroundColor:'#ab1732', alignItems:'center', borderRadius:5}}
                    onPress={() => CancelFunc()}
                >
                    <View style={{width:40, height:37, backgroundColor:'#de163a', alignItems:'center', justifyContent:'center', flexDirection:'row', borderRadius:5}}>
                        <Feather name="x" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{width: "100%", justifyContent:'center', alignItems:'center', marginTop:50}}>
                <Text style={{color:'white', fontFamily:'Roboto-Bold', fontSize:18}}>
                    Changes will take effect next timeout
                </Text>
            </View>
        </View>
    )
}

const Tile = ({tile, style}) => {
    return(
        <View style={{width:95, height:65, backgroundColor:'white', borderRadius:5, ...style}}>
            <Text style={{marginLeft: 15, marginTop: 8, fontFamily:'Roboto-Bold', fontSize:16}}>
                {tile.row}.{tile.index+1}
            </Text>

            <Text style={{marginLeft: 15, marginTop: 8, fontFamily:'Roboto-Bold', fontSize:16}}>
                {tile.name}
            </Text>
        </View>
    )
}