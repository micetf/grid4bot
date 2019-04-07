import * as types from "../actions/types";

export default (state = { url: "./img/robot.png" }, action) => {
    switch (action.type) {
        case types.SELECT_ITEM:
            return { url: action.item };
        default:
            return state;
    }
};
