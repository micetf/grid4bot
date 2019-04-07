import * as types from "../actions/types";
import items from "./items-reducer";

const addLine = ({ items }, line) => {
    return items.map(item => ({
        ...item,
        [line]: item[line] + 1,
    }));
};
const removeLine = ({ items }, line) => {
    return items
        .map(item => ({
            ...item,
            [line]: item[line] - 1,
        }))
        .filter(item => item[line] !== -1);
};

const increment = (state, { line, side }) => {
    const lines = `${line}s`;
    return {
        ...state,
        [lines]: state[lines] + 1,
        items: side === "BEFORE" ? addLine(state, line) : state.items,
    };
};

const decrement = (state, { line, side }) => {
    const lines = `${line}s`;
    if (state[lines] > 2) {
        return {
            ...state,
            [lines]: state[lines] - 1,
            items:
                side === "BEFORE"
                    ? removeLine(state, line)
                    : state.items.filter(
                          item => item[line] !== state[lines] - 1
                      ),
        };
    }
    return state;
};

export default (
    state = {
        rows: 4,
        cols: 4,
        adjust: false,
        items: [{ url: "./img/robot.png", row: 3, col: 0 }],
    },
    action
) => {
    switch (action.type) {
        case types.ADD_COLUMN:
            return increment(state, { line: "col", side: action.side });
        case types.ADD_ROW:
            return increment(state, { line: "row", side: action.side });
        case types.REMOVE_COLUMN:
            return decrement(state, { line: "col", side: action.side });
        case types.REMOVE_ROW:
            return decrement(state, { line: "row", side: action.side });
        case types.TOGGLE_ITEM:
            return {
                ...state,
                items: items(state.items, action),
            };
        case types.ADJUST_GRID:
            return {
                ...state,
                adjust: !state.adjust,
            };
        default:
            return state;
    }
};
