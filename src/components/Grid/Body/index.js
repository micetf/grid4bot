import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import { toggleItem } from "../../../actions";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const CELL_SIZE = 100;

const drawGrid = async ({ cols, rows }, items) => {
    let row = 0;
    do {
        await drawRow(cols, row, items);
    } while (rows - 1 > row++);
};
const drawRow = async (cols, row, items) => {
    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    let col = 0;
    do {
        await drawCell(col, row, items);
    } while (cols - 1 > col++);
};

const drawItem = async (url, x, y) => {
    return new Promise(resolve => {
        const img = document.createElement("img");
        img.src = url;
        img.onload = e => {
            ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
            resolve();
        };
    });
};
const drawCell = async (col, row, items) => {
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    const item = items.find(item => item.row === row && item.col === col);
    if (item) {
        await drawItem(item.url, x, y);
    }
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
};

const getCanvas = async ({ cols, rows, adjust, items }) => {
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
};

const Body = ({ grid, url, toggleItem }) => {
    console.log("Body");
    const imgRef = useRef(null);
    const [src, setSrc] = useState("");
    const handleClick = e => {
        const bcr = imgRef.current.getBoundingClientRect();
        console.log(bcr);
        const x = e.clientX - bcr.x;
        const y = e.clientY - bcr.y;
        const step = Math.min(bcr.width / grid.cols, bcr.height / grid.rows);
        const row = Math.floor(y / step);
        const col = Math.floor(x / step);
        if (row < grid.rows && col < grid.cols) {
            toggleItem({ url, row, col });
        }
    };
    useEffect(() => {
        console.log("useEffect");
        getCanvas(grid).then(canvas => setSrc(canvas.toDataURL()));
    }, [grid]);

    return (
        <div className="text-center my-2 mx-2">
            <img
                ref={imgRef}
                className="pointer border border-secondary"
                src={src}
                style={{ maxHeight: "45vh", maxWidth: "45vh" }}
                alt="Grille"
                onClick={handleClick}
                title="Cliquer pour positionner l'élément sélectionné dans cette case."
            />
            <button
                onClick={e => saveAs(imgRef.current.src, "grid.png")}
                className="btn btn-primary print"
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
        </div>
    );
};

const mapStateToProps = ({ grid, item }) => ({ grid, url: item.url });
export default connect(
    mapStateToProps,
    { toggleItem }
)(Body);
