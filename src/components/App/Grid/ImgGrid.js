import React from "react";

export default function ImgGrid({ src, img, handleToggleItem }) {
    return (
        <div className="text-center my-2 mx-2">
            <img
                ref={img}
                className="grid pointer border border-secondary"
                src={src}
                alt="Grille"
                onClick={handleToggleItem}
                title="Cliquer pour positionner l'élément sélectionné dans cette case."
            />
        </div>
    );
}
