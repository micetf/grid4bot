import React, { useRef } from "react";
import { connect } from "react-redux";

import ImgGrid from "./ImgGrid";
import ManageRowButton from "./ManageRowButton";
import ManageColumnButton from "./ManageColumnButton";
import AdjustGridButton from "./AdjustGridButton";
import AbsoluteButtons from "./AbsoluteButtons";

import useGrid from "./useGrid";
import { toggleItem } from "../../../actions";

function Grid({ grid, item: { url }, toggleItem }) {
    const src = useGrid(grid);
    const imgRef = useRef();
    function handleToggleItem(e) {
        const bcr = imgRef.current.getBoundingClientRect();
        const x = e.clientX - bcr.x;
        const y = e.clientY - bcr.y;
        const step = Math.min(bcr.width / grid.cols, bcr.height / grid.rows);
        const row = Math.floor(y / step);
        const col = Math.floor(x / step);
        if (row < grid.rows && col < grid.cols) {
            toggleItem({ url, row, col });
        }
    }

    return (
        <div className="border border-secondry rounded form-group mt-3 p-2 bg-info text-white text-center">
            <div className="mb-3">
                <ManageRowButton side="BEFORE" />
                <div className="d-flex justify-content-center">
                    <ManageColumnButton side="BEFORE" />
                    <ImgGrid
                        src={src}
                        img={imgRef}
                        handleToggleItem={handleToggleItem}
                    />
                    <ManageColumnButton side="AFTER" />
                </div>
                <ManageRowButton side="AFTER" />
            </div>
            <AdjustGridButton adjust={grid.adjust} />
            <AbsoluteButtons src={src} />
        </div>
    );
}

const mapStateToProps = ({ grid, item }) => ({ grid: grid.present, item });
export default connect(
    mapStateToProps,
    { toggleItem }
)(Grid);
