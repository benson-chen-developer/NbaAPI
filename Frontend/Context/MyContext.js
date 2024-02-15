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
  const [loading, setLoading] = useState(false);

  const [todayGames, setTodayGames] = useState([]);
  const [liveGames, setLiveGames] = useState([]);

  /*
    [
      {awayTeam: {teamName}}, {homeTeam: {teamName}}
    ]
  */
  const value = {
    user, setUser,
    todayGames, setTodayGames,
    liveGames, setLiveGames,
    loading, setLoading
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
