import { combineReducers } from "redux";

import grid from "./grid-reducer";
import item from "./item-reducer";

export default combineReducers({
    grid,
    item,
});
