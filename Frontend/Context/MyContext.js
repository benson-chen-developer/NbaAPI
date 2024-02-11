import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* liveGames
    id: String,
    info: {
        teams: "Home vs Away",
        startTime: Date?
    }
    player1Id: String,
    player2Id: String,
    player1Team: String,
    player2Team: String,

    selectedTiles: {
      "input player1 id" : [{index, row}]
      "input player2 id" : [{index, row}]
    }
  */
  const [liveGames, setLiveGames] = useState([]);

  const value = {
    user, setUser,
    liveGames, setLiveGames
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
