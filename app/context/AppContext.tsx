import { createContext, useContext, useReducer, useMemo } from "react";

const AppContext = createContext();

const initialState = {
  user: null,
};

export const ActionTypes = {
  SET_USER: "SET_USER",
};

// Créez un réducteur pour gérer l'état de l'application
const appReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export function AppContextProvider({ children }) {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => {
    return { appState, dispatch };
  }, [appState]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Créez un hook personnalisé pour accéder au contexte
export function useAppContext() {
  return useContext(AppContext);
}
