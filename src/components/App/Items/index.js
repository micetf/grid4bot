import React from "react";

import Item from "./Item";

export default function() {
    return (
        <div className="d-flex justify-content-between form-group mt-3 ">
            <Item name="Robot" url="./img/robot.png" />
            <Item name="Cible" url="./img/target.png" />
            <Item name="Obstacle" url="./img/obstacle.png" />
        </div>
    );
}
