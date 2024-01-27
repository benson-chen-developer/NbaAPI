import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import { getCurrentUser } from 'aws-amplify/auth';
import {ConfirmEmail} from './ConfirmEmail';
import { signIn } from 'aws-amplify/auth';

export default function SignIn({setUser, setState, setUsername, setLandingPassword}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongLogin, setWrongLogin] = useState(false);

    async function signInHandler() {
        try {
          const { isSignedIn, nextStep } = await signIn({ 
            username: email, password: password
          });

            console.log("Signin", nextStep)
            if(nextStep.signInStep === "CONFIRM_SIGN_UP"){
                setState("CONFIRM_SIGN_UP");
                setLandingPassword(password);
                setUsername(email);
            } else if(nextStep.signInStep === "DONE"){
                try {
                    const { username, userId, signInDetails } = await getCurrentUser();
                    setUser(signInDetails);
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (error) {
            setWrongLogin(true);
            console.log('error signing in', error);
        }
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <Button title="Sign In" onPress={() => signInHandler()} />

            {wrongLogin ? <Text>Your login is incorrect</Text>
                : null
            }

            <Button title="Sign Up" onPress={() => setState("SignUp")} />
        </View>
    )
}
