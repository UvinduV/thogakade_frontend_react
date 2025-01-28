import {ItemModel} from "../models/ItemModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState : ItemModel[]=[]
const ItemSlice = createSlice({
    name:"item",
    initialState:initialState,
    reducers:{
        addItem:(state,action)=>{
            state.push(action.payload);
        }
    }

})
export const {addItem} = ItemSlice.actions;
export default ItemSlice.reducer;