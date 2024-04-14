import React, { useEffect, useState } from 'react';
import Button from './Button';
import { getImagePaths  } from '../util/getImagePaths';
import { downloadImagesAsZip } from '../util/downloadImagesAsZip';
import HomeButton from './HomeButton';
import ImageCollection from './ImageCollection';

export default function SimpleDownload(props) {
    const [imagePaths, setImagePaths] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getImagePaths(props.searchText, props.quantity, props.safeSearch, props.color, props.license)
        .then(imagePaths => setImagePaths(imagePaths))
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Button handleClick={()=>downloadImagesAsZip(imagePaths)} disabled={loading}>Download Images</Button>
            <HomeButton setDisplaySimpleDownload={props.setDisplaySimpleDownload}/>
            {imagePaths  
                ? <ImageCollection imagePaths={imagePaths} /> 
                : "Loading"
            }
        </div>
    );
}