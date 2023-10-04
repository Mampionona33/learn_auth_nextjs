import { createContext, useContext, useReducer, useMemo, ReactNode } from "react";
import { IUser } from "./interfaceUser";

// Définissez un type générique pour createContext
const AppContext = createContext<{
  appState: AppState;
  dispatch: React.Dispatch<any>;
} | undefined>(undefined);

type AppState = {
  user: IUser | null;
};

const initialState = {
  user: null
};

export const ActionTypes = {
  SET_USER: "SET_USER",
};

const appReducer = (state: AppState, action: { type: string; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export function AppContextProvider({ children }: { children: ReactNode }) {
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
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
