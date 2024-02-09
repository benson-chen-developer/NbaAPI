import { View, Text } from "react-native"

export const ProgressBarTilePopUp = ({current, total}) => {
    return(
        <View style={{width: "95%", borderRadius: 25}}>
            <View style={{width: `${current/total*100}%`, height: 20, alignItems:'flex-end', marginLeft:5}}>
                <Text style={{color:'white'}}>20</Text>
            </View>
            
            <View style={{width: "100%", height: 10, borderRadius: 25, backgroundColor:'black'}}>
                <View style={{width: `${current/total*100}%`, height: 10, borderRadius: 25, backgroundColor:'green'}} />
            </View>

            <View style={{width:"100%", height: 20, alignItems:'flex-start', marginLeft:5}}>
                <Text style={{color:'white'}}>Avg 20</Text>
            </View>
        </View>
    )
}