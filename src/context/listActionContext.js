import {createContext, useContext, useReducer} from "react";
import listAction from "@/core/listAction";

const initialState = {
    type: null,
    row: {},
    reload: false,
}

// 1.Kreiramo kontekst -> globalnog stanja
const listActionContext = createContext();


// 2.Kreiramo reducera -> funkcija koja ce promeniti stanje u contextu
const listActionReducer = (state, action) => {
    switch (action.type){
        case listAction.RELOAD:
            return {...initialState, reload: true};

        case listAction.UPDATE:
            return {...state, row: action.payload, type: listAction.UPDATE};

        case listAction.RESET:
            return initialState;

        default:
            return state;

    }
}

// 3. Kreiramo provajdra za nase parcijalne komponente
const ListActionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(listActionReducer, initialState);

    const value = {state, dispatch};

    return (
        <listActionContext.Provider value={value}>
            {children}
        </listActionContext.Provider>
    );
};

// 4. Kreiramo funkciju za koriscenje contexta
const useListActions = () => {
    const context = useContext(listActionContext);
    if(context === undefined){
        throw new Error("ListActions must be used within a listActionProvider");
    }

    return context;
};

export  {ListActionProvider, useListActions};