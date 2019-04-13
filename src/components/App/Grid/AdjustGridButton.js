import React from "react";
import { connect } from "react-redux";

import { adjustGrid } from "../../../actions";

function AdjustGridButton({ adjust, adjustGrid }) {
    function handleAdjustGrid(e) {
        e.preventDefault();
        adjustGrid();
    }

    return (
        <div className="row justify-content-center">
            <button onClick={handleAdjustGrid} className="btn btn-secondary">
                {adjust
                    ? "Obtenir une image carrée"
                    : "Ajuster les dimensions de l'image aux dimensions de la grille"}
            </button>
        </div>
    );
}

export default connect(
    null,
    { adjustGrid }
)(AdjustGridButton);
