import React, { createContext, useState, useContext } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [isCoordinator, setIsCoordinator] = useState(false);

  return (
    <UserRoleContext.Provider value={{ isCoordinator, setIsCoordinator }}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook for easier access
export const useUserRole = () => useContext(UserRoleContext);
