import React from "react";
import { connect } from "react-redux";

import { selectItem } from "../../../../actions";

function ImgItem({ src, name, selected, imgRef, selectItem }) {
    function handleSelectItem(e) {
        e.preventDefault();
        selectItem(src);
    }
    return (
        <div className={selected ? "card-body bg-success" : "card-body"}>
            <div className="media">
                <img
                    ref={imgRef}
                    className="img-thumbnail item pointer"
                    src={src}
                    alt={name}
                    title="Cliquer pour sélectionner cet élément."
                    onClick={handleSelectItem}
                />
            </div>
        </div>
    );
}

export default connect(
    null,
    { selectItem }
)(ImgItem);
