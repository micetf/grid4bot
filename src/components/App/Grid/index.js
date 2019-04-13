import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import ImgGrid from "./ImgGrid";
import ManageRowButton from "./ManageRowButton";
import ManageColumnButton from "./ManageColumnButton";
import AdjustGridButton from "./AdjustGridButton";
import CleanGridButton from "./CleanGridButton";
import PrintGridButton from "./PrintGridButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";

import { toggleItem } from "../../../actions";

function Grid({ grid, item: { url }, toggleItem }) {
    const src = useGrid(grid);
    const imgRef = useRef();
    function handleToggleItem(e) {
        const bcr = imgRef.current.getBoundingClientRect();
        const x = e.clientX - bcr.x;
        const y = e.clientY - bcr.y;
        const step = Math.min(bcr.width / grid.cols, bcr.height / grid.rows);
        const row = Math.floor(y / step);
        const col = Math.floor(x / step);
        if (row < grid.rows && col < grid.cols) {
            toggleItem({ url, row, col });
        }
    }
    return (
        <div className="border border-secondry rounded form-group mt-3 p-2 bg-info text-white text-center">
            <div className="mb-3">
                <ManageRowButton side="BEFORE" />
                <div className="d-flex justify-content-center">
                    <ManageColumnButton side="BEFORE" />
                    <ImgGrid
                        src={src}
                        img={imgRef}
                        handleToggleItem={handleToggleItem}
                    />
                    <ManageColumnButton side="AFTER" />
                </div>
                <ManageRowButton side="AFTER" />
            </div>
            <div className="row justify-content-center">
                <AdjustGridButton adjust={grid.adjust} />
            </div>
            <div className="buttons">
                <PrintGridButton src={src} />
                <CleanGridButton />
                <UndoButton />
                <RedoButton />
            </div>
        </div>
    );
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const CELL_SIZE = 100;
function useGrid(grid) {
    const [src, setSrc] = useState("");
    useEffect(() => {
        getCanvas(grid).then(canvas => setSrc(canvas.toDataURL()));
    }, [grid]);

    return src;
}

async function getCanvas({ cols, rows, adjust, items }) {
    canvas.width = adjust ? CELL_SIZE * cols : CELL_SIZE * Math.max(cols, rows);
    canvas.height = adjust
        ? CELL_SIZE * rows
        : CELL_SIZE * Math.max(cols, rows);

    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await drawGrid({ cols, rows }, items);

    return canvas;
}

async function drawGrid({ cols, rows }, items) {
    let row = 0;
    do {
        await drawRow(cols, row, items);
    } while (rows - 1 > row++);
}

async function drawRow(cols, row, items) {
    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    let col = 0;
    do {
        await drawCell(col, row, items);
    } while (cols - 1 > col++);
}

async function drawCell(col, row, items) {
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    const item = items.find(item => item.row === row && item.col === col);
    if (item) {
        await drawItem(item.url, x, y);
    }
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
}

async function drawItem(url, x, y) {
    return new Promise(resolve => {
        const img = document.createElement("img");
        img.src = url;
        img.onload = e => {
            ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
            resolve();
        };
    });
}

const mapStateToProps = ({ grid, item }) => ({ grid: grid.present, item });
export default connect(
    mapStateToProps,
    { toggleItem }
)(Grid);
