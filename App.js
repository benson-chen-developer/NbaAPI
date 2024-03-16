import { MyContextProvider } from './Frontend/Context/MyContext';
import MainContainer from './Frontend/MainContainer'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GamePreScreen } from './Frontend/GameComponents/Pre/GamePreScreen';
import { GameInScreen } from './Frontend/GameComponents/Live/GameInScreen';
import { GameEnd } from './Frontend/GameComponents/GameEnd/GameEnd';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <MyContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{animationEnabled: false}}>
            <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
            <Stack.Screen name="GameInScreen" component={GameInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GamePreScreen" component={GamePreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GameEnd" component={GameEnd} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContextProvider>
    </SafeAreaProvider>
  );
}

export default App;