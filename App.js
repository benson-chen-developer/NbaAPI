import { MyContextProvider } from './Frontend/Context/MyContext';
import MainContainer from './Frontend/MainContainer'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TeamDepth } from './Frontend/TeamDepth/TeamDepth';
import { GameHome } from './Frontend/GameComponents/GameHome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GamePreScreen } from './Frontend/GameComponents/Pre/GamePreScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <MyContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{animationEnabled: false}}>
            <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
            <Stack.Screen name="TeamDepth" component={TeamDepth} options={{ headerShown: false }} />
            <Stack.Screen name="GameHome" component={GameHome} options={{ headerShown: false }} />
            <Stack.Screen name="GamePreScreen" component={GamePreScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContextProvider>
    </SafeAreaProvider>
  );
}

export default App;