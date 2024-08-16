import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../@types/user";
import { getUserfromLS } from "@utils/getUserFromLS";

  const { user } = getUserfromLS()
    
  const initialState: User = user || {
    email: null,
    id: null,
    username: null,
  }

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
          state.id = action.payload.id,
          state.email = action.payload.email,
          state.username = action.payload.username
        },
        logoutUser(state) {
          state.id = null,
          state.email = null
          state.username = null
        }
    },
  })
  
  export const { setUser, logoutUser } = userSlice.actions
  
  export default userSlice.reducer