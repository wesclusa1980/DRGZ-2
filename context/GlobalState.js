import React, {createContext, useReducer} from 'react';
import Reducer from "./Reducer";

const initialState = {
    balance: null
}

export const ActionContext = createContext(initialState);

export const GlobalState = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    return (
        <ActionContext.Provider value={{
            balance : state.balance,
            dispatch
        }}
        >
            {children}
        </ActionContext.Provider>
    )
}