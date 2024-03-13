import { View } from "react-native"
import { PlayerPopUp } from "./PlayerPopUp"
import { TeamDepthPopUp } from "./TeamDepthPopUp"
import { TeamPickerPopUp } from "./TeamPickerPopUp"

export const PopUp = ({currentTeam, setCurrentTeam, popUpInfo, setPopUpInfo}) => {
    return(
        <View style={{height:"100%", width:"100%", backgroundColor:'rgba(0,0,0,.5)', position:'absolute',justifyContent:'center', alignItems:'center'}}>
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
                    popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo} 
                /> 
                    :
                null
            }

            </View>
        </View>
    )
}