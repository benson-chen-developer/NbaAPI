import { useEffect } from "react"
import { View } from "react-native"
import {PreGameMatrix} from '../../../GameComponents/PreGamePhase/PreGameMatrix'

export const PreGame = ({game}) => {

    useEffect(() => {
        // console.log("PreGame", game)
    })

    return(
        <View style={{flex: 1}}>
            <PreGameMatrix game={JSON.parse(game)}/>
        </View>
    )
}