import React from 'react';
import "./ImageCollection.css"

export default function ImageCollection(props) {
    return (
        <div id="image-collection-images-container">
            {props.imagePaths.map(path => 
                <img src={path} />
            )}
        </div>
    );
};
