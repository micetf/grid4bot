import React from "react";

export default function Name({ children }) {
    return (
        <div className="card-header bg-secondary text-light text-center">
            <h5 className="card-title">{children}</h5>
        </div>
    );
}
