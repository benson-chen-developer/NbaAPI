import React, { createContext, ReactNode, useContext, useState } from 'react';
import { TeamData, User } from '../Global/Types/ContextTypes';
import { Game } from '../Global/Types/GameTypes';
import { PlayerStats } from '../Global/Types/PlayerTypes';

interface ContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  todayGames: any[];
  bottomSheetPlayerName: string;
  setBottomSheetPlayerName: React.Dispatch<React.SetStateAction<string>>;
  setTodayGames: React.Dispatch<React.SetStateAction<any[]>>;
  liveGames: Game[];
  setLiveGames: React.Dispatch<React.SetStateAction<Game[]>>;
  playerStats: PlayerStats[];
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats[]>>;
  teamDataContext: TeamData[];
  setTeamDataContext: React.Dispatch<React.SetStateAction<TeamData[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<ContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [todayGames, setTodayGames] = useState<any[]>([]);
  const [bottomSheetPlayerName, setBottomSheetPlayerName] = useState<string>("");
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [teamDataContext, setTeamDataContext] = useState<TeamData[]>([]);

  const value: ContextType = {
    user, setUser,
    todayGames, setTodayGames,
    liveGames, setLiveGames,
    bottomSheetPlayerName, setBottomSheetPlayerName,
    playerStats, setPlayerStats,
    teamDataContext, setTeamDataContext,
    loading, setLoading
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
