import { View, TextInput, Button, Text } from "react-native";
import { signUp } from 'aws-amplify/auth';
import { useState } from "react";
import { createUserFunction } from "../functions/UserFunctions";

export default function SignUp({setState, setUsername, setLandingPassword}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        setLoading(true);

        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email.toLowerCase(),
                password: password,
            });

            // console.log("NexStep", nextStep.signUpStep)
            if(nextStep.signUpStep === "CONFIRM_SIGN_UP"){
                createUserFunction(userId, email.toLowerCase()).then(res => {
                    console.log("user created from signup", res)
                    setState("CONFIRM_SIGN_UP");
                    setLandingPassword(password);
                    setUsername(email);
                })
            }
            // console.log(userId);

        } catch (error) {
            setLoading(false);
            console.log('error signing up:', error);
        }
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {loading ?
                <Text>Loading</Text>
                    :
                <View>
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
                    <Button title="Sign Up" onPress={() => handleSignUp()} />

                    <Button title="Sign In" onPress={() => setState("SignIn")} />
                </View>
            }
        </View>
    )
}
