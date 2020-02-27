import * as types from "./types";

export const undo = () => {
    return {
        type: types.UNDO,
    };
};

export const redo = () => {
    return {
        type: types.REDO,
    };
};

export const adjustGrid = () => ({
    type: types.ADJUST_GRID,
});

export const cleanGrid = () =>
    console.log("click") || {
        type: types.CLEAN_GRID,
    };

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

export const selectCellSize = cellSize => ({
    type: types.SELECT_CELL_SIZE,
    cellSize,
});

export const toggleItem = ({ url, row, col }) => ({
    type: types.TOGGLE_ITEM,
    url,
    row,
    col,
});
