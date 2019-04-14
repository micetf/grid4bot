import React from "react";

import PrintGridButton from "./PrintGridButton";
import CleanGridButton from "./CleanGridButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";

export default function({ src }) {
    return (
        <div className="buttons">
            <PrintGridButton src={src} />
            <CleanGridButton />
            <UndoButton />
            <RedoButton />
        </div>
    );
}
