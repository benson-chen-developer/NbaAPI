import { UserProvider } from './Frontend/Context/UserContext';
import MainContainer from './Frontend/MainContainer'

function App() {

  return (
    <UserProvider>
      <MainContainer />
    </UserProvider>
  );
}

export default App;