import {createContext, useContext, useReducer} from "react";
import testAction from "@/core/testAction";


const initialState = {
    firstName: "Miljan",
    email: "miljannedeljkovic02@gmail.com",
}

// 1.Kreiramo kontekst -> globalnog stanja
const testContext = createContext();


// 2.Kreiramo reducera -> funkcija koja ce promeniti stanje u contextu
const testReducer = (state, action) => {
    switch (action.type){
        case testAction.CHANGE_FIRSTNAME:
            return {...state, firstName: action.payload};

        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};

        default:
            return state;

    }
}

// 3. Kreiramo provajdra za nase parcijalne komponente
const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = {state, dispatch};

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
};

// 4. Kreiramo funkciju za koriscenje contexta
const useTestActions = () => {
    const context = useContext(testContext);
    if(context === undefined){
        throw new Error("TestActions must be used within a TestProvider");
    }

    return context;
};

export  {TestProvider, useTestActions};