import { View, Text } from "react-native";
import { SelectedTile, Tile } from "../../../functions/GameFunctions/GameTypes";
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    notifications: [string];
    selectedTiles: [SelectedTile];
    allTiles: [Tile]
}

export const NotificationBar: React.FC<Props> = ({ selectedTiles, allTiles, notifications }) => {
    const countSelectedTiles = selectedTiles.reduce((accumulator, currentTile) => {
        if ((allTiles[currentTile.tileIndex].team1Complete || allTiles[currentTile.tileIndex].team2Complete) && currentTile.swapTile === null) {
            return accumulator + 1;
        } else {
            return accumulator;
        }
    }, 0);
    
    if(countSelectedTiles > 0)
    return (
        <View style={{flexDirection:'row', margin: 10, marginTop: 20}}>
            <MaterialIcons name="error" size={25} color="#e7152f" style={{marginRight: 5}}/>

            <Text style={{color:'white', fontSize:20}}>
                {`Select ${countSelectedTiles} more tile${countSelectedTiles > 1 ? "s" : ""}`}
            </Text>
        </View>
    );
};