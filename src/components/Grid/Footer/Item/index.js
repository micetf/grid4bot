import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactFileReader from "react-file-reader";
import { readAsDataURL } from "promise-file-reader";
import { selectItem } from "../../../../actions";

const WIDTH = 150;
const Item = ({ name, url, item, selectItem }) => {
    const [itemUrl, setItemUrl] = useState(url);
    const selected = item.url === itemUrl;
    const imgRef = useRef();

    const image = (transform = () => {}) => {
        const canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = WIDTH;
        const ctx = canvas.getContext("2d");
        transform(ctx);
        ctx.drawImage(imgRef.current, 0, 0, WIDTH, WIDTH);
        setItemUrl(canvas.toDataURL());
        return canvas;
    };
    const handleRotate = () => {
        const canvas = image(ctx => {
            ctx.rotate(Math.PI / 2);
            ctx.translate(0, -WIDTH);
        });
        selectItem(canvas.toDataURL());
    };
    const handleFiles = files => {
        readAsDataURL(files[0]).then(url => {
            imgRef.current.src = url;
            imgRef.current.onload = () => {
                image();
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
    }, []);
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
                        src={itemUrl}
                        style={{
                            height: `${WIDTH}px`,
                            width: `${WIDTH}px`,
                        }}
                        alt={name}
                        title="Cliquer pour sélectionner cet élément."
                        onClick={e => selectItem(itemUrl)}
                    />
                </div>
            </div>
            <div className="card-footer row justify-content-center">
                {name === "Robot" ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleRotate}
                        title="Pivoter le robot sur la droite."
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            height="2em"
                            fill="#f8f9fa"
                        >
                            <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                        </svg>
                    </button>
                ) : null}
                <ReactFileReader
                    fileTypes={["*.png", "*.jpg", "*.gif", "*.jpeg"]}
                    handleFiles={handleFiles}
                >
                    <button
                        className="btn btn-primary mx-2"
                        title={`Utiliser une autre image comme ${name.toLowerCase()}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            height="2em"
                            fill="#f8f9fa"
                        >
                            <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
                        </svg>
                    </button>
                </ReactFileReader>
            </div>
        </div>
    );
};

const mapStateToProps = ({ item }) => ({ item });
export default connect(
    mapStateToProps,
    { selectItem }
)(Item);
