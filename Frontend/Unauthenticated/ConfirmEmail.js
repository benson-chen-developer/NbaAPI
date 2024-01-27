import { View, Text, TextInput, Button } from "react-native" 
import { useState } from "react";
import { confirmSignUp } from 'aws-amplify/auth';

export default function ConfirmEmail({setState, username}) {

  const [code, setCode] = useState("");

  async function handleSignUpConfirmation() {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: username,
        confirmationCode: code
      });

      console.log("next step in confirm email", nextStep)

      if(nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN"){
        setState("SignIn");
      } else if(nextStep.signUpStep === "DONE"){
        setState("SignIn");
      }
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }
  return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text>
              Confirm your email
          </Text>

          <TextInput
            placeholder="Code"
            value={code}
            onChangeText={(text) => setCode(text)}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          />

          <Button title="Confirm" onPress={() => handleSignUpConfirmation()} />
      </View>
  )
}

