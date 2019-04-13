import React from "react";
import { connect } from "react-redux";

import * as ACTIONS from "../../../actions";

function ManageRowButton({ side, addRow, removeRow }) {
    return (
        <>
            <label className="col-form-label mr-2">
                Lignes {side === "BEFORE" ? "en haut" : "en bas"}
            </label>
            <button
                className="btn btn-secondary mr-1"
                onClick={e => removeRow(side)}
            >
                -
            </button>
            <button
                className="btn btn-secondary mr-4"
                onClick={e => addRow(side)}
            >
                +
            </button>
        </>
    );
}

export default connect(
    null,
    { addRow: ACTIONS.addRow, removeRow: ACTIONS.removeRow }
)(ManageRowButton);
