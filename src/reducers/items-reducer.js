import * as types from "../actions/types";

const addItem = ({ url, row, col }) => {
    return { url, row, col };
};

const updateItem = (state = {}, { url }) => {
    return {
        ...state,
        url,
    };
};
const toggleItem = (state, action) => {
    const index = state.findIndex(
        item => item.row === action.row && item.col === action.col
    );
    if (index === -1) {
        return [...state, addItem(action)];
    }
    if (state[index].url === action.url) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    return [
        ...state.slice(0, index),
        updateItem(state[index], action),
        ...state.slice(index + 1),
    ];
};
export default (state = [], action) => {
    switch (action.type) {
        case types.TOGGLE_ITEM:
            return toggleItem(state, action);
        default:
            return state;
    }
};
