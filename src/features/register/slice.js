import { createSlice } from "@reduxjs/toolkit";

const register = createSlice ({
    name: 'register',
    initialState: {username:'' , email:"test@gmail.com" , password: "123", passwordConfirmation:""},
    reducers: {
        updateVal(state, {payload:{val,key}}){
            state[key] = val
        },
    },

})

export const { updateVal } = register.actions

export default register.reducer