import * as types from "./types";

export const adjustGrid = () => ({
    type: types.ADJUST_GRID,
});

export const addRow = side => ({
    type: types.ADD_ROW,
    side,
});

export const removeRow = side => ({
    type: types.REMOVE_ROW,
    side,
});

export const addColumn = side => ({
    type: types.ADD_COLUMN,
    side,
});

export const removeColumn = side => ({
    type: types.REMOVE_COLUMN,
    side,
});

export const selectItem = item => ({
    type: types.SELECT_ITEM,
    item,
});

export const toggleItem = ({ url, row, col }) => ({
    type: types.TOGGLE_ITEM,
    url,
    row,
    col,
});
