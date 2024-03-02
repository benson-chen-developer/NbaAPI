import { View, Text } from "react-native"

export const PopUpProgressbar = ({pickedTile}) => {

    const total = 20;
    const current = 10;

    const colors = ["#fb0429", "#ff6b00", "#f6ff00", "#18ff00", "#00d9ff", "#5d00ff", "#ff00f5"]

    return(
        <View style={{width:"90%", height:50, alignItems:'center'}}>

            {/* Number */}
            <View style={{width:"95%", marginBottom: 10}}>
                <View style={{width:`${current/total*100}%`, alignItems:'flex-end', left: 10}}>
                    <Text style={{fontFamily:'Roboto-Bold', color:'white', fontSize: 20}}>
                        {pickedTile.team1}
                    </Text>
                </View>
            </View>

            {/* ProgressBar */}
            <View style={{width:"95%", height:10, backgroundColor:'black', borderRadius:5}}>
                <View style={{width:"50%", height:"100%", backgroundColor:colors[6], borderRadius:5}}>

                </View>
            </View>

            {/* Max */}
            {/* <View style={{width:"95%", marginTop: 10}}>
                <View style={{width:`100%`, alignItems:'flex-end', left: 10}}>
                    <Text style={{fontFamily:'Roboto-Bold', color:'white', fontSize: 20}}>
                        {pickedTile.team1}
                    </Text>
                </View>
            </View> */}
        </View>
    )
}