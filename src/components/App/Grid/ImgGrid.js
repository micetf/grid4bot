import React, { useRef } from "react";
import { connect } from "react-redux";

import { toggleItem } from "../../../actions";

function ImgGrid({ src, rows, cols, url, toggleItem }) {
    const imgRef = useRef();
    function handleToggleItem(e) {
        const bcr = imgRef.current.getBoundingClientRect();
        const x = e.clientX - bcr.x;
        const y = e.clientY - bcr.y;
        const step = Math.min(bcr.width / cols, bcr.height / rows);
        const row = Math.floor(y / step);
        const col = Math.floor(x / step);
        if (row < rows && col < cols) {
            toggleItem({ url, row, col });
        }
    }
    return (
        <div className="text-center my-2 mx-2">
            <img
                ref={imgRef}
                className="grid pointer border border-secondary"
                src={src}
                alt="Grille"
                onClick={handleToggleItem}
                title="Cliquer pour positionner l'élément sélectionné dans cette case."
            />
        </div>
    );
}

const mapStateToProps = ({ grid, item }) => ({
    rows: grid.present.rows,
    cols: grid.present.cols,
    url: item.url,
});
export default connect(
    mapStateToProps,
    { toggleItem }
)(ImgGrid);
