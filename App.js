import { MyContextProvider } from './Frontend/Context/MyContext';
import MainContainer from './Frontend/MainContainer'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TeamDepth } from './Frontend/TeamDepth/TeamDepth';

const Stack = createStackNavigator();

function App() {
  return (
    <MyContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{animationEnabled: false}}>
          <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
          <Stack.Screen name="TeamDepth" component={TeamDepth} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContextProvider>
  );
}

export default App;