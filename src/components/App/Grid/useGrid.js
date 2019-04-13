import { useState, useEffect } from "react";

import getCanvas from "./getCanvas";

function useGrid(grid) {
    const [src, setSrc] = useState("");
    useEffect(() => {
        getCanvas(grid).then(canvas => setSrc(canvas.toDataURL()));
    }, [grid]);

    return src;
}

export default useGrid;
