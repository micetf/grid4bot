import React from "react";
import { connect } from "react-redux";

import { selectCellSize } from "../../../actions";

function SelectCellSize({ cellSize, selectCellSize }) {
    function handleSelectCellSize(e) {
        e.preventDefault();
        selectCellSize(e.target.value);
    }
    const renderOption = (value, index) => (
        <option key={index} value={value}>
            {value}px
        </option>
    );
    console.log(cellSize);
    return (
        <div className="row justify-content-center">
            <label className="col-form-label mr-2">Dimension des cases </label>
            <select
                onChange={handleSelectCellSize}
                value={cellSize}
                className="btn btn-secondary"
            >
                {[100, 200, 300, 400, 500].map(renderOption)}
            </select>
        </div>
    );
}

export default connect(null, { selectCellSize })(SelectCellSize);
