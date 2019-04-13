import React from "react";
import { saveAs } from "file-saver";

export default function PrintGrid({ src }) {
    function handlePrintGrid(e) {
        e.preventDefault();
        saveAs(src, "grid.png");
    }

    return (
        <button
            onClick={handlePrintGrid}
            className="btn btn-success my-1"
            title="Télécharger l'image"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="2em"
                fill="#f8f9fa"
            >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
        </button>
    );
}
