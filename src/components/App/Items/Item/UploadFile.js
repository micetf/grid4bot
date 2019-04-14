import React from "react";
import ReactFileReader from "react-file-reader";
export default function UploadFile({ handleFiles, name }) {
    return (
        <ReactFileReader
            fileTypes={["image/png", "image/jpg", "image/jpeg", "image/gif"]}
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
    );
}
