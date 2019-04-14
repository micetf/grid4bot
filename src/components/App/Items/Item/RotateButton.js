import React from "react";

export default function RotateButton({ handleRotate }) {
    return (
        <button
            className="btn btn-primary"
            onClick={handleRotate}
            title="Pivoter le robot sur la droite."
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="1em"
                fill="#f8f9fa"
            >
                <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
            </svg>
        </button>
    );
}
