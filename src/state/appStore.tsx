import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { fullPlayerDataType } from 'types/displayDataTypes';

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

interface AppState {
    status: LoadStatus;
    loadedAt?: number;
    saveSignature?: string;
    players: fullPlayerDataType[];
    error?: string;
}

const initialState: AppState = {
    status: 'idle',
    players: [],
};

    type AppAction =
    | { type: 'loadSaveRequested'; payload?: { fileName?: string } }
    | { type: 'loadSaveSucceeded'; payload: { saveSignature: string; players: fullPlayerDataType[] } }
    | { type: 'loadSaveFailed'; payload: { error: string | undefined } }
    | { type: 'clearSave' };

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'loadSaveRequested':
        return { ...state, status: 'loading' };
        case 'loadSaveSucceeded':
        return {
            status: 'ready',
            loadedAt: Date.now(),
            saveSignature: action.payload.saveSignature,
            players: action.payload.players,
        };
        case 'loadSaveFailed':
        return { ...state, status: 'error', error: action.payload.error ?? undefined };
        case 'clearSave':
        return { ...initialState };
        default:
        return state;
    }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used within AppProvider');
  return ctx;
};

export const useAppSelector = <T,>(select: (s: AppState) => T): T => {
  const { state } = useAppStore();
  return select(state);
};

// Example selectors
export const usePlayers = () => useAppSelector(s => s.players);
export const useLoadStatus = () => useAppSelector(s => s.status);
export const usePlayerByName = (name: string) => useAppSelector(s => s.players.find(p => p.playerName === name));