import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  code: string;
  title: string;
  category_name: string;
  category_slug: string;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>,
    ) {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find((i) => i.code === item.code);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.code !== action.payload);
    },
    setQuantity(
      state,
      action: PayloadAction<{ code: string; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.code === action.payload.code);
      if (!item) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (i) => i.code !== action.payload.code,
        );
      } else {
        item.quantity = Math.min(action.payload.quantity, 9999);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.items;

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectIsInCart = (code: string) => (state: { cart: CartState }) =>
  state.cart.items.some((item) => item.code === code);
