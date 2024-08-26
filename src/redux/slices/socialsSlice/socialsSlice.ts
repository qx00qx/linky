import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { socialLink } from "../../../types/socialLink";

export interface socialLinks {
    socialLinks: socialLink[]
}

const initialState: socialLinks  = {
    socialLinks: []
}

export const socialSlice = createSlice({
    name: 'socials',
    initialState,
    reducers: {
        setSocialsLinks (state, action: PayloadAction<socialLink[]>) {
            state.socialLinks = action.payload
        }
    }
})

export const { setSocialsLinks } = socialSlice.actions

export default socialSlice.reducer