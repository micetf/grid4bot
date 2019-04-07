import React from "react";
import { connect } from "react-redux";

import Rows from "./Rows";
import Columns from "./Columns";
import Body from "../Body";
import { adjustGrid } from "../../../actions";

const Header = ({ adjust, adjustGrid }) => (
    <div className="border border-secondry rounded form-group mt-3 p-2 bg-info text-white text-center">
        <div className="mb-3">
            <Rows side="BEFORE" />
            <div className="d-flex justify-content-center">
                <Columns side="BEFORE" />
                <Body />
                <Columns side="AFTER" />
            </div>
            <Rows side="AFTER" />
        </div>
        <div className="row justify-content-center">
            <button onClick={adjustGrid} className="btn btn-secondary">
                {adjust
                    ? "Obtenir une image carrée"
                    : "Ajuster les dimensions de l'image aux dimensions de la grille"}
            </button>
        </div>
    </div>
);
const mapStateToProps = ({ grid }) => ({ adjust: grid.adjust });
export default connect(
    mapStateToProps,
    { adjustGrid }
)(Header);
