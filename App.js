import { MyContextProvider } from './Frontend/Context/MyContext';
import MainContainer from './Frontend/MainContainer'

function App() {

  return (
    <MyContextProvider>
      <MainContainer />
    </MyContextProvider>
  );
}

export default App;