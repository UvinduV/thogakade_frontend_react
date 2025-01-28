import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CustomerModel} from "../models/CustomerModel.ts";
import axios from "axios";

const initialState : CustomerModel[]=[]

const api = axios.create({
    baseURL : "http://localhost:3000/"
})

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer: CustomerModel) => {
        try {
            const response = await api.post('/Customer/add', customer);
            return response.data;
        } catch (error) {
            return console.log('error',error);
        }
    }
);
export const updatedCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async ({ email, customer }: { email: string; customer: CustomerModel }) => {
        try {
            const response = await api.put(`/update/${email}`, customer);
            return response.data;
        } catch (error) {
            return console.log('error', error);

        }
    }
);

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
        },
        deleteCustomer: (state, action) => {
            return state.filter(customer => customer.email !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error("Failed to save customer:", action.payload);
            })
            .addCase(saveCustomer.pending, (state, action) => {
                console.error("Pending");
            })

            .addCase(updatedCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updatedCustomer.rejected, (state, action) => {
                console.error("Failed to update customer:", action.payload);
            })
            .addCase(updatedCustomer.pending, (state, action) => {
                console.error("Pending");
            });



    }


})
export const {addCustomer,updateCustomer,deleteCustomer} = CustomerSlice.actions;
export default CustomerSlice.reducer;