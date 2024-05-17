import { createSlice } from "@reduxjs/toolkit";

const cartSlice = cartSlice({
    name: "cart",
    initialState: {
        count: 0
    }
});

export default cartSlice.reducer;
