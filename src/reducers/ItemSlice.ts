import {ItemModel} from "../models/ItemModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {CustomerModel} from "../models/CustomerModel.ts";
import {deletedCustomer, getCustomers, saveCustomer, updatedCustomer} from "./CustomerSlice.ts";

const initialState : ItemModel[]=[]

const api = axios.create({
    baseURL : "http://localhost:3000/"
})

export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item: ItemModel) => {
        try {
            const response = await api.post('/Item/add', item);
            return response.data;
        } catch (error) {
            return console.log('error',error);
        }
    }
);

const ItemSlice = createSlice({
    name:"item",
    initialState:initialState,
    reducers:{
        addItem:(state,action)=>{
            state.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveItem.rejected, (state, action) => {
                console.error("Failed to save customer:", action.payload);
            })
            .addCase(saveItem.pending, (state, action) => {
                console.error("Pending");
            });


    }

})
export const {addItem} = ItemSlice.actions;
export default ItemSlice.reducer;