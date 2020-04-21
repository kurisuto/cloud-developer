import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file

// SJC 20200420:
// I modified the function to provide better information when there's some kind of failure.
// A typical failure would be one where inputURL points to a resource which doesn't exist.
export async function filterImageFromURL(inputURL: string): Promise<string>{

    return new Promise( async (resolve, reject) => {
        
        try {
            const photo = await Jimp.read(inputURL);
            const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
            await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname+outpath, (img)=>{
                resolve(__dirname+outpath);
            });
        }
        catch(error) {
            // The following error is what Jimp.read() throws if it fails
            // to fetch the image file, e.g. if it got a 404 status.
            // This string comparison is not an ideal way to detect this,
            // but checking for it allows us to return a more informative message.
            if (error == "Error: Could not find MIME for Buffer <null>") {
                reject("Unable to fetch specified image.  The URL may be invalid.");
            }
            reject("Failure in fetching or resizing image. " + error);
        }

    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}