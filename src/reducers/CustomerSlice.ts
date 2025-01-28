import {createSlice} from "@reduxjs/toolkit";
import {CustomerModel} from "../models/CustomerModel.ts";

const initialState : CustomerModel[]=[]
const CustomerSlice = createSlice({
    name:"customer",
    initialState:initialState,
    reducers:{
        addCustomer:(state,action)=>{
            state.push(action.payload);
        },
        updateCustomer: (state, action) => {
            return state.map(customer =>
                customer.email === action.payload.email
                    ? new CustomerModel(action.payload.name, action.payload.nic, action.payload.email, action.payload.phone)
                    : customer
            );
        }
    }

})
export const {addCustomer,updateCustomer} = CustomerSlice.actions;
export default CustomerSlice.reducer;