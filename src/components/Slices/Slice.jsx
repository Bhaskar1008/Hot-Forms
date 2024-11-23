// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    fields: [],
    accordian1: false,
    accordian2: false,
    accordian3: false,
    accordian4: false,
    accordian5: false,
    formFields:[]
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    toggleAccordian1: (state) => {
      state.accordian1 = !state.accordian1;
    },
    toggleAccordian2: (state) => {
      state.accordian2 = !state.accordian2;
    },
    toggleAccordian3: (state) => {
      state.accordian3 = !state.accordian3;
    },
    toggleAccordian4: (state) => {
      state.accordian4 = !state.accordian4;
    },
    toggleAccordian5: (state) => {
      state.accordian5 = !state.accordian5;
    },
    addNewComponent:(state)=>{
      state.value=state;
    },
    newField: (state, action) => {
      state.fields.push(action.payload);
    },
    setformFields:(state,action)=>{
      state.formFields.push(action.payload);
    }
  },
});

export const {
  incrementByAmount,
  newField,
  toggleAccordian1,
  toggleAccordian2,
  toggleAccordian3,
  toggleAccordian5,
  toggleAccordian4,
  setformFields
} = counterSlice.actions;
export default counterSlice.reducer;
