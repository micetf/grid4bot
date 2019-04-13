import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactFileReader from "react-file-reader";
import { readAsDataURL } from "promise-file-reader";
import { selectItem } from "../../../../actions";

const WIDTH = 150;
function Item({ name, url, item, selectItem }) {
    const [itemUrl, setItemUrl] = useState({
        past: [],
        present: url,
        future: [],
    });
    const updateItemUrl = src => {
        const { past, present } = itemUrl;
        setItemUrl({ past: [...past, present], present: src, future: [] });
    };
    const selected = item.url === itemUrl.present;
    const imgRef = useRef();

    const image = (img, transform = () => {}) => {
        const canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = WIDTH;
        const ctx = canvas.getContext("2d");
        transform(ctx);
        ctx.drawImage(img, 0, 0, WIDTH, WIDTH);
        updateItemUrl(canvas.toDataURL());
        return canvas;
    };
    const handleRotate = () => {
        const canvas = image(imgRef.current, ctx => {
            ctx.rotate(Math.PI / 2);
            ctx.translate(0, -WIDTH);
        });
        if (selected) {
            selectItem(canvas.toDataURL());
        }
    };
    const handleFiles = files => {
        if (!files[0].type.match(/^image\/(png|jpg|jpeg)$/g)) return;
        readAsDataURL(files[0]).then(url => {
            const img = document.createElement("img");
            img.src = url;
            img.onload = () => {
                image(img);
                if (selected) {
                    selectItem(imgRef.current.src);
                }
            };
        });
    };

    useEffect(() => {
        imgRef.current.onload = () => {
            const canvas = image();
            if (name === "Robot") {
                selectItem(canvas.toDataURL());
            }
        };
        return (imgRef.current.onload = () => {});
    }, []);

    function handleUndo() {
        const { past, present, future } = itemUrl;
        if (past.length !== 0) {
            setItemUrl({
                past: past.slice(0, past.length - 1),
                present: past[past.length - 1],
                future: [present, ...future],
            });
            if (selected) {
                selectItem(past.slice(-1)[0]);
            }
        }
    }
    function handleRedo() {
        const { past, present, future } = itemUrl;
        if (itemUrl.future.length !== 0) {
            setItemUrl({
                past: [...past, present],
                present: future[0],
                future: future.slice(1),
            });
            if (selected) {
                selectItem(future[0]);
            }
        }
    }
    const undoable =
        itemUrl.past.length === 0
            ? { disabled: "disabled" }
            : { title: "Défaire" };
    const redoable =
        itemUrl.future.length === 0
            ? { disabled: "disabled" }
            : { title: "Refaire" };
    return (
        <div className="card">
            <div className="card-header bg-secondary text-light text-center">
                <h5 className="card-title">{name}</h5>
            </div>
            <div className={selected ? "card-body bg-success" : "card-body"}>
                <div className="media">
                    <img
                        ref={imgRef}
                        className="img-thumbnail pointer"
                        src={itemUrl.present}
                        style={{ height: `${WIDTH}px`, width: `${WIDTH}px` }}
                        alt={name}
                        title="Cliquer pour sélectionner cet élément."
                        onClick={e => selectItem(itemUrl.present)}
                    />
                </div>
            </div>
            <div className="card-footer row justify-content-center">
                {name === "Robot" && (
                    <button
                        className="btn btn-primary"
                        onClick={handleRotate}
                        title="Pivoter le robot sur la droite."
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            height="1em"
                            fill="#f8f9fa"
                        >
                            <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                        </svg>
                    </button>
                )}
                <ReactFileReader
                    fileTypes={["image/png", "image/jpg", "image/gif"]}
                    handleFiles={handleFiles}
                >
                    <button
                        className="btn btn-primary mx-2"
                        title={`Utiliser une autre image comme ${name.toLowerCase()}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            height="1em"
                            fill="#f8f9fa"
                        >
                            <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
                        </svg>
                    </button>
                </ReactFileReader>
                <button
                    className="btn btn-secondary"
                    {...undoable}
                    onClick={handleUndo}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        height="1em"
                        fill="#f8f9fa"
                    >
                        <path d="M10 13h8V7h-8V2l-8 8 8 8v-5z" />
                    </svg>
                </button>
                <button
                    className="btn btn-secondary"
                    {...redoable}
                    onClick={handleRedo}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        height="1em"
                        fill="#f8f9fa"
                    >
                        <path d="M10 7H2v6h8v5l8-8-8-8v5z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = ({ item }) => ({ item });
export default connect(
    mapStateToProps,
    { selectItem }
)(Item);
