import React from "react";

export default function UndoRedoButton({ doable, onHandleClick, path }) {
    return (
        <button
            className="btn btn-secondary"
            {...doable}
            onClick={onHandleClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="1em"
                fill="#f8f9fa"
            >
                <path d={path} />
            </svg>
        </button>
    );
}
