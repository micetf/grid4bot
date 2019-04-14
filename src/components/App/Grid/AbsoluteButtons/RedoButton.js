import React from "react";
import { connect } from "react-redux";
import { redo } from "../../../../actions";

function RedoButton({ disabled, redo }) {
    function handleRedo(e) {
        e.preventDefault();
        if (!disabled) {
            redo();
        }
    }
    const redoable = disabled
        ? { disabled: "disabled" }
        : { title: "Rétablir" };
    return (
        <button
            className="btn btn-secondary  mb-1"
            onClick={handleRedo}
            {...redoable}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="2em"
                fill="#f8f9fa"
            >
                <path d="M10 7H2v6h8v5l8-8-8-8v5z" />
            </svg>
        </button>
    );
}

const mapStateToProps = ({ grid }) => ({ disabled: grid.future.length === 0 });

export default connect(
    mapStateToProps,
    { redo }
)(RedoButton);
