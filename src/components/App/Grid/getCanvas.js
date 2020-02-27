const getCanvas = async ({ cols, rows, adjust, cellSize, items }) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const state = { ctx, CELL_SIZE: cellSize, cols, rows, adjust, items };
    const drawingCols = drawCols(state);
    const drawingRows = drawRows(state);
    const drawingGrid = drawingCols(drawingRows);
    const drawingCell = drawCell(state);
    const drawingItem = drawItem(state);

    canvas.width = adjust ? cellSize * cols : cellSize * Math.max(cols, rows);
    canvas.height = adjust ? cellSize * rows : cellSize * Math.max(cols, rows);

    ctx.lineWidth = cellSize / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await drawingGrid(drawingCell, drawingItem);
    return canvas;
};

const drawCols = ({ rows }) => drawingRows => async (
    drawingItem,
    drawingCell
) =>
    Promise.all(
        Array.from({ length: rows }).map(
            async (v, row) =>
                await drawingRows(drawingCell, drawingItem)({ row })
        )
    );

const drawItems = (drawingCell, drawingItem) => async ({ row, col }) => {
    await drawingItem({ col, row });
    await drawingCell({ col, row });
};

const drawRows = ({ cols }) => (drawingCell, drawingItem) => {
    const drawingItems = drawItems(drawingCell, drawingItem);
    return async ({ row }) =>
        Promise.all(
            Array.from({ length: cols }).map(
                async (v, col) => await drawingItems({ col, row })
            )
        );
};

const drawCell = ({ ctx, CELL_SIZE }) => async ({ row, col }) => {
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    ctx.lineWidth = CELL_SIZE / 50;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
};

const existItem = items => (row, col) =>
    items.find(item => item.row === row && item.col === col);

const drawItem = ({ ctx, CELL_SIZE, items }) => async ({ col, row }) =>
    new Promise(resolve => {
        const item = existItem(items)(row, col);
        if (item === undefined) {
            resolve();
        }
        const img = document.createElement("img");
        img.src = item.url;
        img.onload = () => {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;
            ctx.drawImage(img, x, y, CELL_SIZE, CELL_SIZE);
            resolve();
        };
    });

export default getCanvas;
