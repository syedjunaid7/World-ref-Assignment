'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';

const defaultState = {
  appData: {},
  setAppData: () => {},
};

export const AppContext = createContext<any>(defaultState);

export const AppContextConsumer = AppContext.Consumer; 

export const AppContextProvider = ({ children }: any) => {

  const setAppData = (key: any, value: any) => {
    setState((prevState: any) => ({  
      ...prevState,
      appData: {
        ...prevState.appData,
        [key]: value
      }
    }));
  
  };

  const [state, setState] = useState({
    ...defaultState,
    setAppData
  });

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};
