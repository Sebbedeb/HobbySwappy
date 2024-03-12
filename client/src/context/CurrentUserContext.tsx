import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userId: number | null;
  setUserId: (userId: number) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserIdState] = useState<number | null>(null);

  const setUserId = (userId: number) => {
    setUserIdState(userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
