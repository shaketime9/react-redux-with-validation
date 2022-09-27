import { createReducer } from "@reduxjs/toolkit";
import  * as actions from "../action"

const initialState = {username:'' , email:"" , password: "", passwordConfirmation:""}
export default createReducer (initialState, builder => {
    builder 
    .addCase (actions.updateVal , (state,action) => {
        state[action.payload.key] = action.payload.val
    })

})