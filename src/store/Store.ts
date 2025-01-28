import {configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "../reducers/CustomerSlice.ts";

export const store = configureStore({
    reducer: {
        customers: CustomerSlice
    }
})

export type AppDispatch = typeof store.dispatch;