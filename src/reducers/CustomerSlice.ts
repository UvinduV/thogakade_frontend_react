import {createSlice} from "@reduxjs/toolkit";
import {CustomerModel} from "../models/CustomerModel.ts";

const initialState : CustomerModel[]=[]
const CustomerSlice = createSlice({
    name:"customer",
    initialState:initialState,
    reducers:{
        addCustomer:(state,action)=>{
            state.push(action.payload);
        }
    }

})
export const {addCustomer} = CustomerSlice.actions;
export default CustomerSlice.reducer;