import React from "react";
import { connect } from "react-redux";

import ImgGrid from "./ImgGrid";
import ManageRowButton from "./ManageRowButton";
import ManageColumnButton from "./ManageColumnButton";
import AdjustGridButton from "./AdjustGridButton";
import AbsoluteButtons from "./AbsoluteButtons";

import useGrid from "./useGrid";

function Grid({ grid }) {
    const src = useGrid(grid);

    return (
        <div className="border border-secondry rounded form-group mt-3 p-2 bg-info text-white text-center">
            <div className="mb-3">
                <ManageRowButton side="BEFORE" />
                <div className="d-flex justify-content-center">
                    <ManageColumnButton side="BEFORE" />
                    <ImgGrid src={src} />
                    <ManageColumnButton side="AFTER" />
                </div>
                <ManageRowButton side="AFTER" />
            </div>
            <AdjustGridButton adjust={grid.adjust} />
            <AbsoluteButtons src={src} />
        </div>
    );
}

const mapStateToProps = ({ grid }) => ({ grid: grid.present });
export default connect(mapStateToProps)(Grid);
