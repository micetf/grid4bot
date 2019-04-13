import React from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions";

function ManageColumnButton({ side, addColumn, removeColumn }) {
    return (
        <div className="align-self-center">
            <label className="col-form-label">
                Colonnes {side === "BEFORE" ? "à gauche" : "à droite"}
            </label>{" "}
            <br />
            <button
                className="btn btn-secondary mr-1"
                onClick={e => removeColumn(side)}
            >
                -
            </button>
            <button
                className="btn btn-secondary"
                onClick={e => addColumn(side)}
            >
                +
            </button>
        </div>
    );
}

export default connect(
    null,
    { addColumn: ACTIONS.addColumn, removeColumn: ACTIONS.removeColumn }
)(ManageColumnButton);
