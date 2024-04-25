import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const { order, sortBy, category, search, currentPage } = params;

    const { data } = await axios.get(
        `https://65d60b38f6967ba8e3bd5b93.mockapi.io/api/react-pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data;
});

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,

    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = 'loading';
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.status = 'error';
        });
    },
});

export const selectPizzaData = (state) => state.pizzas;
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
