import { View, TextInput, Button } from "react-native";
import { signUp } from 'aws-amplify/auth';
import { useState } from "react";
import ConfirmEmail from './ConfirmEmail';
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Landing({setUser}) {

    // SignIn, SignUp, CONFIRM_SIGN_UP
    const [state, setState] = useState("SignIn");
    const [username, setUsername] = useState(null);
    const [landingPassword, setLandingPassword] = useState(null);

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {state === "CONFIRM_SIGN_UP" ? 
                <ConfirmEmail setState={setState} username={username}/> 
                    : 
                null
            }

            {state === "SignUp" ? 
                <SignUp 
                    setState={setState} setUsername={setUsername}
                    setLandingPassword={setLandingPassword}
                /> 
                    : 
                null
            }

            {state === "SignIn" ? 
                <SignIn 
                    setUser={setUser}
                    setState={setState} setUsername={setUsername}
                    setLandingPassword={setLandingPassword}
                /> 
                    : 
                null
            }
        </View>
    )
}
