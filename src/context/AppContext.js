import React, {createContext, useReducer} from 'react'

export const AppContext = createContext();

const initialState = {
    loadingBarProgress: 0,
    shouldOpenAddClientModal: false,
    canSubmitAddClientForm: false
};

const reducer = (state, action) => {
    return {...state, ...action}
};

export const AppContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
};
