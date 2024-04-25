import { Dispatch, SetStateAction } from "react"
import { View } from "react-native"

interface Props {
}

export const PlayerCard: React.FC<Props> = ({ }) => {
    return(
        <View style={{ 
            width: 150, height: 200, backgroundColor:'grey', 
            marginLeft: 5, marginRight: 5, borderRadius: 5
        }}>
            
        </View>
    )
}