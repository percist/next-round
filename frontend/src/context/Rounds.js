import React, { createContext } from 'react';
import { useSelector } from 'react-redux';

export const RoundsContext = createContext();

export function RoundsProvider({ children }) {
  const rounds = useSelector(state => state.rounds);

  return (
      <RoundsContext.Provider value={{rounds}}>
        {children}
      </RoundsContext.Provider>
  );
}