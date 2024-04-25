import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sortType: { name: 'популярністю', sortProperty: 'rating' },
    visible: false,
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },

        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },

        setSortType(state, action) {
            state.sortType = action.payload;
        },

        setVisible(state, action) {
            state.visible = action.payload;
        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },

        setFilters(state, action) {
            state.sortType = action.payload.sortType;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectFilter = (state) => state.filter;

export const {
    setCategoryId,
    setSortType,
    setVisible,
    setCurrentPage,
    setFilters,
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
