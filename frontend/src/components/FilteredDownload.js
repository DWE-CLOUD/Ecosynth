import React, { useEffect, useState } from 'react';
import Button from './Button';
import { getImagePaths } from '../util/getImagePaths';
import { downloadImagesAsZip } from '../util/downloadImagesAsZip'
import HomeButton from './HomeButton';
import ImageCollection from './ImageCollection';
import './FilteredDownload.css'


function DisplayPredictions(props) {
    const [displayImages, setDisplayImages] = useState(false)
    const [imagesToGenerate, setImagesToGenerate] = useState(false)
    const [loadingDisplayImages, setLoadingDisplayImages] = useState(false)

    const handleButtonClick = () => {
        setLoadingDisplayImages(true);
        setDisplayImages(true);
        fetch("http://127.0.0.1:5000/generate?" + new URLSearchParams({
            keywords: props.searchText,
            max_results: imagesToGenerate,
            safesearch: (props.safeSearch ? "On" : "Off"),
            color: props.color,
            license: props.license
        }))
        .then(response => response.json())
        .then(imagePaths => props.setImagePaths(imagePaths))
        .then(() => setDisplayImages(true))
        .then(() => setLoadingDisplayImages(false))
        .catch(err => {
            console.log(err)
        });
    }

    return (<div>
                {displayImages 
                    ? 
                    <div>
                        {loadingDisplayImages 
                            ? "Loading images"
                            : 
                            <div> 
                                <ImageCollection imagePaths={props.imagePaths}/>
                                <Button handleClick={()=>downloadImagesAsZip(props.imagePaths)} disabled={loadingDisplayImages}>Download Images</Button>
                            </div>
                        }
                   
                    </div>
                    : 
                    <div>
                        How many images would you like to generate with the model?
                        <input onChange={(e) => setImagesToGenerate(e.target.value)} type="number" max="100" min="0"/>
                        <Button handleClick={handleButtonClick}>Submit</Button>
                    </div>}
            </div>);
}

function ImageCollectionWithSelect(props) {
    const handleClickImage = (path, e) => {
        e.preventDefault();
        const prevVal = document.getElementById(path).style.display;
        document.getElementById(path).style.display = prevVal=="block" ? "none" : "block";
    };

    return (<div id="image-collection-images-container">
            {props.imagePaths.map(path => 
                {
                    return (<div onClickCapture={(e)=>handleClickImage(path, e)} id="filtered-download-img-container">
                                <img className="filtered-download-img" src={path} />
                                <img id={path} className="X-overlay" src={'X.png'} />
                            </div>);
                }
            )}
            </div>);

}

export default function FilteredDownload(props) {
    const [imagePaths, setImagePaths] = useState(null);
    const [displayX, setDisplayX] = useState({})
    const [displayTrain, setDisplayTrain] = useState(false)
    const [displayPredictions, setDisplayPredictions] = useState(false)

    // const cors_url = 'https://cors-anywhere.herokuapp.com/';
    const downloadAndFilterImagesAsZip = (imagePaths, e) => {
        e.preventDefault();
        setDisplayTrain(true);
        let wantedImages = imagePaths.filter(path => document.getElementById(path).style.display!='block');
        let unwantedImages = imagePaths.filter(path => !wantedImages.includes(path));
        fetch('http://127.0.0.1:5000/train', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wantedImages: wantedImages, unwantedImages: unwantedImages })
        })
        .then(() => setDisplayTrain(false))
        .then(() => setDisplayPredictions(true))
    }

    useEffect(() => {
        getImagePaths(props.searchText, props.quantity, props.safeSearch, props.color, props.license)
        .then(async imagePaths => {
            var temp = {};
            imagePaths.forEach(path => temp[path] = false);
            await setDisplayX(temp);
            await setImagePaths(imagePaths);
            return imagePaths;
        })
        .catch(err => console.log(err))
    }, []);

    return(
        <div id="filtered-download-container">
            <HomeButton setDisplayFilteredDownload={props.setDisplayFilteredDownload}/>
            {displayPredictions
            ? <DisplayPredictions 
                    searchText={props.searchText}
                    max_results={props.quantity}
                    safesearch={props.safeSearch}
                    color={props.color}
                    license={props.license}
                    imagePaths={imagePaths}
                    setImagePaths={setImagePaths}
                />
            : 
                <div>
                        {displayTrain 
                            ? "Training! Please be patient" 
                            : 
                            <div>
                                <Button handleClick={(e)=>downloadAndFilterImagesAsZip(imagePaths, e)}>Start training</Button>
                                <h1>Choose the pictures you want to remove</h1>
                                {imagePaths  
                                    ? <ImageCollectionWithSelect setDisplayX={setDisplayX} displayX={displayX} imagePaths={imagePaths} /> 
                                    : "Loading"
                                }
                            </div>
                        }
                </div>
            }
        </div>
    )
}