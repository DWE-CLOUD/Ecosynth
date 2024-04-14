import JSZip from "jszip";
import { saveAs } from 'file-saver';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const downloadImagesAsZip = (imagePaths) => {
    Promise.all(
    imagePaths.map((imageUrl) => {
        const url = `${proxyUrl}${imageUrl}`;
        return fetch(url).then((response) => response.blob());
    })
    )
    .then((blobs) => {
        const zip = new JSZip();
        blobs.forEach((blob, index) => {
        zip.file(`image${index}.jpg`, blob);
        });
        return zip.generateAsync({ type: 'blob' });
    })
    .then((content) => {
        saveAs(content, 'images.zip');
    })
    .catch((error) => {
        console.error('Error downloading images', error);
    });
};