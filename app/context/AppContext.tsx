import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from "react";
import { IUser } from "./interfaceUser";
import { IGroupe } from "./interfaceGroupe";

// Définissez un type générique pour createContext
const AppContext = createContext<
  | {
      appState: AppState;
      dispatch: React.Dispatch<any>;
    }
  | undefined
>(undefined);

type AppState = {
  user: IUser | null;
  userGroupe: IGroupe | null;
};

const initialState = {
  user: null,
  userGroupe:null,
};

export const ActionTypes = {
  SET_USER: "SET_USER",
  SET_USER_GROUPE: "SET_USER_GROUPE",
};


const appReducer = (
  state: AppState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_USER:
      const updatedState = { ...state, user: action.payload };
      localStorage.setItem("appState", JSON.stringify(updatedState));
      return updatedState;
    case ActionTypes.SET_USER_GROUPE:
      const updatedStateWithGroupe = { ...state, userGroupe: action.payload };
      localStorage.setItem("appState", JSON.stringify(updatedStateWithGroupe));
      return updatedStateWithGroupe;
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
