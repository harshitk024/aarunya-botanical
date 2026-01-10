import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/products/add-cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data.cartResponse;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// DECREASE QUANTITY
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/products/decrease-cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data)
      return data.cartResponse; 
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// DELETE ITEM
export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItem",
  async ({ productId }, { rejectWithValue }) => {
    try {
      await axios.post(`/api/products/delete-cart/${productId}`,{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return productId;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/fetch-cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("FETCH CART: ",data)
      return data.cartItems; // array from backend
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;

        const index = state.cartItems.findIndex(
          (cartItem) => cartItem.productId === item.productId
        );

        if (index !== -1) {
          state.cartItems[index].quantity = item.quantity;
        } else {
          state.cartItems.push({
            productId: item.productId,
            quantity: item.quantity,
          });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CART
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
      })

      // DECREASE QUANTITY
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;

        console.log(action.payload)

        const index = state.cartItems.findIndex(
          (item) => item.productId === productId
        );

        if (index !== -1) {
          if (quantity <= 0) {
            state.cartItems.splice(index, 1);
          } else {
            state.cartItems[index].quantity = quantity;
          }
        }
      })

      // DELETE ITEM
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export const selectTotalItems = (state) =>
  state.cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
