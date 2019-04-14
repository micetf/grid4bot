import React from "react";
import { connect } from "react-redux";
import { undo } from "../../../../actions";

function UndoButton({ disabled, undo }) {
    function handleUndo(e) {
        e.preventDefault();
        if (!disabled) {
            undo();
        }
    }
    const undoable = disabled ? { disabled: "disabled" } : { title: "Annuler" };
    return (
        <button
            className="btn btn-secondary mt-1"
            onClick={handleUndo}
            {...undoable}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="2em"
                fill="#f8f9fa"
            >
                <path d="M10 13h8V7h-8V2l-8 8 8 8v-5z" />
            </svg>
        </button>
    );
}

const mapStateToProps = ({ grid }) => ({ disabled: grid.past.length === 0 });

export default connect(
    mapStateToProps,
    { undo }
)(UndoButton);
