// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  userId: number | null;
  setUserId: (userId: number | null) => void;
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
  const [userId, setUserIdState] = useState<number | null>(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId) : null;
  });

  const setUserId = (userId: number | null) => {
    setUserIdState(userId);
    if (userId !== null) {
      localStorage.setItem('userId', userId.toString());
    } else {
      localStorage.removeItem('userId');
    }
  };

  useEffect(() => {
    // Load userId from localStorage on component mount
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserIdState(parseInt(storedUserId));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
