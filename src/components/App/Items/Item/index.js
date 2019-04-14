import React, { useRef } from "react";
import { connect } from "react-redux";
import { readAsDataURL } from "promise-file-reader";

import DoButton from "./DoButton";
import RotateButton from "./RotateButton";
import UploadFile from "./UploadFile";
import Name from "./Name";
import ImgItem from "./ImgItem";

import useItemUrl from "./useItemUrl";
import { selectItem } from "../../../../actions";

const WIDTH = 150;
function Item({ name, url, item, selectItem }) {
    const {
        undoable,
        redoable,
        selected,
        setPresentItemUrl,
        getItemUrl,
        restorePastItemUrl,
        restoreFutureItemUrl,
    } = useItemUrl(url, item);

    const imgRef = useRef();

    function image(img, transform) {
        const canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = WIDTH;
        const ctx = canvas.getContext("2d");
        transform && transform(ctx);
        ctx.drawImage(img, 0, 0, WIDTH, WIDTH);
        setPresentItemUrl(canvas.toDataURL());
        return canvas;
    }
    async function rotateItemImg() {
        return image(imgRef.current, ctx => {
            ctx.rotate(Math.PI / 2);
            ctx.translate(0, -WIDTH);
        });
    }
    async function loadItemImg(file) {
        const url = await readAsDataURL(file);
        return new Promise(resolve => {
            const img = document.createElement("img");
            img.src = url;
            img.onload = () => {
                resolve(image(img));
            };
        });
    }

    function handleRotate() {
        rotateItemImg().then(canvas => {
            if (selected) {
                selectItem(canvas.toDataURL());
            }
        });
    }
    function handleFiles(files) {
        if (!files[0].type.match(/^image\/(png|jpg|jpeg|gif)$/g)) return;

        loadItemImg(files[0]).then(canvas => {
            if (selected) {
                selectItem(canvas.toDataURL());
            }
        });
    }

    function handleUndo() {
        const itemSrc = restorePastItemUrl();
        if (itemSrc && selected) {
            selectItem(itemSrc);
        }
    }
    function handleRedo() {
        const itemSrc = restoreFutureItemUrl();
        if (itemSrc && selected) {
            selectItem(itemSrc);
        }
    }
    return (
        <div className="card">
            <Name>{name}</Name>
            <ImgItem
                src={getItemUrl()}
                name={name}
                selected={selected}
                imgRef={imgRef}
            />

            <div className="card-footer row justify-content-center">
                {name === "Robot" && (
                    <RotateButton handleRotate={handleRotate} />
                )}
                <UploadFile handleFiles={handleFiles} name={name} />
                <DoButton
                    doable={undoable}
                    onHandleClick={handleUndo}
                    path="M10 13h8V7h-8V2l-8 8 8 8v-5z"
                />
                <DoButton
                    doable={redoable}
                    onHandleClick={handleRedo}
                    path="M10 7H2v6h8v5l8-8-8-8v5z"
                />
            </div>
        </div>
    );
}

const mapStateToProps = ({ item }) => ({ item });
export default connect(
    mapStateToProps,
    { selectItem }
)(Item);
