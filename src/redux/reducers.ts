import { combineReducers } from "@reduxjs/toolkit";
import user from '@redux/slices/userSlice/userSlice'
import socials from "./slices/socialsSlice/socialsSlice";

export const rootReducer = combineReducers({
    user,
    socials
  });
  