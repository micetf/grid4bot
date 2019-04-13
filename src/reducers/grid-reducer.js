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

const increment = ({ past, present }, { line, side }) => {
    const lines = `${line}s`;
    return {
        past: [...past, present],
        present: {
            ...present,
            [lines]: present[lines] + 1,
            items: side === "BEFORE" ? addLine(present, line) : present.items,
        },
        future: [],
    };
};

const decrement = (state, { line, side }) => {
    const lines = `${line}s`;
    const { past, present } = state;
    if (present[lines] > 2) {
        return {
            past: [...past, present],
            present: {
                ...present,
                [lines]: present[lines] - 1,
                items:
                    side === "BEFORE"
                        ? removeLine(present, line)
                        : present.items.filter(
                              item => item[line] !== present[lines] - 1
                          ),
            },
            future: [],
        };
    }
    return state;
};

const cleanGrid = ({ past, present }) => {
    return {
        past: [...past, present],
        present: { ...present, items: [] },
        future: [],
    };
};

const toggleItem = ({ past, present }, action) => {
    return {
        past: [...past, present],
        present: { ...present, items: items(present.items, action) },
        future: [],
    };
};

const adjustGrid = state => {
    const { present } = state;
    return {
        ...state,
        present: {
            ...present,
            adjust: !present.adjust,
        },
    };
};

const initialState = {
    past: [],
    present: {
        rows: 4,
        cols: 4,
        adjust: false,
        items: [{ url: "./img/robot.png", row: 3, col: 0 }],
    },
    future: [],
};
export default (state = initialState, action) => {
    const { past, present, future } = state;
    switch (action.type) {
        case types.ADD_COLUMN:
            return increment(state, { line: "col", side: action.side });
        case types.ADD_ROW:
            return increment(state, { line: "row", side: action.side });
        case types.REMOVE_COLUMN:
            return decrement(state, { line: "col", side: action.side });
        case types.REMOVE_ROW:
            return decrement(state, { line: "row", side: action.side });
        case types.CLEAN_GRID:
            return cleanGrid(state);
        case types.TOGGLE_ITEM:
            return toggleItem(state, action);
        case types.ADJUST_GRID:
            return adjustGrid(state);
        case types.UNDO:
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        case types.REDO:
            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        default:
            return state;
    }
};
