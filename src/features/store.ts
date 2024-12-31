import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./slices/classSlice";
 

export default configureStore({
  reducer: {
    classSlice: classSlice,
     
  },
});
