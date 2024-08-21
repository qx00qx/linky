import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../@types/user";
import { getUserfromLS } from "@utils/LSFunction";

  const { userData } = getUserfromLS()
    
  const initialState: User = userData || {
    email: null,
    id: null,
    username: null,
    picture: null
  }

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
          state.id = action.payload.id,
          state.email = action.payload.email,
          state.username = action.payload.username,
          state.picture = action.payload.picture
        },
        setProfilePicture(state, action: PayloadAction<any>) {
          state.picture = action.payload
        },
        deleteProfilePicture(state) {
          state.picture = null
        },
        logoutUser(state) {
          state.id = null,
          state.email = null
          state.username = null
          state.picture = null
        }
    },
  })
  
  export const { setUser, setProfilePicture, deleteProfilePicture, logoutUser } = userSlice.actions
  
  export default userSlice.reducer