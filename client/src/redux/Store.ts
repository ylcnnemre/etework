import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/AuthSlice";
import {testSlice} from "./reducers/TestSlice";

export const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        test : testSlice.reducer
    }
});


export interface IDataTypes {
    auth : boolean,
    test : number
}






