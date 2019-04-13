function createStore() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let state = {
        canvas,
        ctx,
        CELL_SIZE: 100,
    };

    function getState() {
        return state;
    }
    function setGrid(grid) {
        state = { ...state, ...grid };
    }
    return {
        getState,
        setGrid,
    };
}

const store = createStore();
async function getCanvas(grid) {
    store.setGrid(grid);
    const { canvas, ctx, CELL_SIZE, cols, rows, adjust } = store.getState();

    canvas.width = adjust ? CELL_SIZE * cols : CELL_SIZE * Math.max(cols, rows);
    canvas.height = adjust
        ? CELL_SIZE * rows
        : CELL_SIZE * Math.max(cols, rows);

    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await drawGrid();

    return canvas;
}

async function drawGrid() {
    const { rows } = store.getState();
    let row = 0;
    do {
        await drawRow(row);
    } while (rows - 1 > row++);
}

async function drawRow(row) {
    const { ctx, cols, CELL_SIZE } = store.getState();
    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    let col = 0;
    do {
        await drawCell(col, row);
    } while (cols - 1 > col++);
}

async function drawCell(col, row) {
    const { ctx, CELL_SIZE, items } = store.getState();
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    const item = items.find(item => item.row === row && item.col === col);
    if (item) {
        await drawItem(item, x, y);
    }
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
}

async function drawItem({ url }, x, y) {
    return new Promise(resolve => {
        const { ctx, CELL_SIZE } = store.getState();
        const img = document.createElement("img");
        img.src = url;
        img.onload = e => {
            ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
            resolve();
        };
    });
}

export default getCanvas;
