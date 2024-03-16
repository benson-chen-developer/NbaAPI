import { View } from "react-native"
import { PlayerPopUp } from "./PlayerPopUp"
import { TeamDepthPopUp } from "./TeamDepthPopUp"
import { TeamPickerPopUp } from "./TeamPickerPopUp"

export const PopUp = ({currentTeam, setCurrentTeam, popUpInfo, setPopUpInfo, allPlayers}) => {
    return(
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, .5)',
        }}>
            <View style={{height: "75%", width:"90%", backgroundColor:'white', borderRadius:10, alignItems:'center'}}>
            
            {popUpInfo.popUpScreen === "Team" ?
                <TeamPickerPopUp 
                    currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} 
                    setPopUpInfo={setPopUpInfo}
                /> 
                    : 
                null
            }

            {popUpInfo.popUpScreen === "Player" ?
                <PlayerPopUp 
                    popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo} 
                /> 
                    : 
                null
            }

            {popUpInfo.popUpScreen === "TeamDepth" ?
                <TeamDepthPopUp 
                    allPlayers={allPlayers}
                    popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo} 
                /> 
                    :
                null
            }

            </View>
        </View>
    )
}