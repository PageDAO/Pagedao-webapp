// Detecting data URLs
// data URI - MDN https://developer.mozilla.org/en-US/docs/data_URIs
// The "data" URL scheme: http://tools.ietf.org/html/rfc2397
// Valid URL Characters: http://tools.ietf.org/html/rfc2396#section2

const isDataURL = (s) => {
    const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    return !!s.match(regex);
}

const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    var data = dataURI.split(',')[1]; 
    var byteString = Buffer.from(data, "base64");
  
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([byteString], { type: mimeString  });
    return blob;
  }

export {isDataURL, dataURItoBlob};