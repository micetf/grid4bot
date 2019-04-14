async function getCanvas({ cols, rows, adjust, items }) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const CELL_SIZE = 100;

    const state = { ctx, CELL_SIZE, cols, rows, adjust, items };

    canvas.width = adjust ? CELL_SIZE * cols : CELL_SIZE * Math.max(cols, rows);
    canvas.height = adjust
        ? CELL_SIZE * rows
        : CELL_SIZE * Math.max(cols, rows);

    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await drawGrid(state);

    return canvas;
}

async function drawGrid(state) {
    const { rows } = state;
    let row = 0;
    do {
        await drawRow(state, { row });
    } while (rows - 1 > row++);
}

async function drawRow(state, { row }) {
    const { cols } = state;
    let col = 0;
    do {
        await drawCell(state, { col, row });
    } while (cols - 1 > col++);
}

async function drawCell(state, { col, row }) {
    const { ctx, CELL_SIZE, items } = state;
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    const item = items.find(item => item.row === row && item.col === col);

    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    await drawItem(state, { item, x, y });
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
}

async function drawItem(state, { item, x, y }) {
    const { ctx, CELL_SIZE } = state;
    return new Promise(resolve => {
        if (!item) {
            resolve();
        }
        const img = document.createElement("img");
        img.src = item.url;
        img.onload = function() {
            ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
            resolve();
        };
    });
}

export default getCanvas;
