import React, { createContext, useContext, useState, ReactNode } from "react";

const DEFAULT_USER_ID = 1;

interface UserContextType {
  user: number | null;
  setUser: (user: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<number | null>(DEFAULT_USER_ID);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
