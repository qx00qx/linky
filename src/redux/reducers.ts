import { combineReducers } from "@reduxjs/toolkit";
import user from '@redux/slices/userSlice/userSlice'

export const rootReducer = combineReducers({
    user,
  });
  