import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";
import { getUserfromLS } from "@utils/LSFunction";
import { userSocialLink } from "../../../types/socialLink";
import { customLink } from "../../../types/customLink";

  const { userData } = getUserfromLS()
    
  const initialState: User = userData || {
    email: null,
    id: null,
    username: null,
    picture: null,
    bio: '',
    socialsLinks: [],
    customLinks: []
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
        setProfilePicture(state, action: PayloadAction<string>) {
          state.picture = action.payload
        },
        deleteProfilePicture(state) {
          state.picture = ''
        },
        logoutUser(state) {
          state.id = '',
          state.email = null
          state.username = null
          state.picture = ''
          state.socialsLinks = []
        },
        addSocialsLinks(state, action: PayloadAction<userSocialLink>) {
          state.socialsLinks = [...state.socialsLinks || [],  action.payload]
        },
        removeAllSocialsLinks(state) {
          state.socialsLinks = []
        },
        addCustomLink(state, action: PayloadAction<customLink>) {
          state.customLinks = [...state.customLinks || [], action.payload]
        },
        removeCustomLink(state, action: PayloadAction<string>) {
          state.customLinks = state.customLinks?.filter((link) => link.title !== action.payload)
        },
        setUserBio(state, action: PayloadAction<string>) {
          state.bio = action.payload
        },
        removeUserBio(state) {
          state.bio = ''
        },
        setNewUsername(state, action: PayloadAction<string>) {
          state.username = action.payload
        }
    },
  })
  
  export const { setUser, setProfilePicture, deleteProfilePicture, logoutUser, addSocialsLinks, removeAllSocialsLinks, addCustomLink, removeCustomLink, setUserBio, removeUserBio, setNewUsername } = userSlice.actions
  
  export default userSlice.reducer