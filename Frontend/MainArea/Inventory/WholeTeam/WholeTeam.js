import { ScrollView, View } from "react-native"
import PlayerCard from "../PopUp/PlayerCard"

export const WholeTeam = ({onScreenCards, currentTeam, popUpInfo, setPopUpInfo}) => {
    return(
        <ScrollView style={{ width: '90%' }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {onScreenCards.map((player, index) => (
                    <PlayerCard
                        key={index} player={player} currentTeam={currentTeam}
                        popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo}
                    />
                ))}
            </View>
        </ScrollView>
    )
}