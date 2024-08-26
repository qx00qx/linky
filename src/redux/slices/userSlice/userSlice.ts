import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";
import { getUserfromLS } from "@utils/LSFunction";
import { userSocialLink } from "../../../types/socialLink";

  const { userData } = getUserfromLS()
    
  const initialState: User = userData || {
    email: null,
    id: null,
    username: null,
    picture: null,
    socialsLinks: []
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
        setProfilePicture(state, action: PayloadAction<any>) {
          state.picture = action.payload
        },
        deleteProfilePicture(state) {
          state.picture = null
        },
        logoutUser(state) {
          state.id = '',
          state.email = null
          state.username = null
          state.picture = null
          state.socialsLinks = []
        },
        addSocialsLinks(state, action: PayloadAction<userSocialLink>) {
          state.socialsLinks = [...state.socialsLinks || [],  action.payload]
        },
        removeAllSocialsLinks(state) {
          state.socialsLinks = []
        }
    },
  })
  
  export const { setUser, setProfilePicture, deleteProfilePicture, logoutUser, addSocialsLinks, removeAllSocialsLinks } = userSlice.actions
  
  export default userSlice.reducer