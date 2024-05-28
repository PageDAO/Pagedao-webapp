const generateBookFromTemplate = (options) => {
  /**
   * Accepts an options object with properties:
   * image
   * title
   * authorTwitter
   * purchaseURL
   * pdfURL
   * title, image, authorTwitter, purchaseURL, pdfURL, description, backgroundImage, baseHref, openPage, isRTL, autoPlay, autoPlayStart, autoPlayDuration, isTransparent
   * todo: add parameters for PDF Viewer
   */
  var outputString = `<!DOCTYPE html>
<html>
<head>
 <base href="${
   options.baseHref || "/ipfs/QmdpqLgSWdfFHExp4c9ARUtPxExxRrsoAT8Ume2RMjmgkQ/"
 }"/>
 <meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <!--meta name="robots" content="noindex,nofollow"-->
 <title>${options.title}</title>
 <meta name="viewport" content="width=device-width,initial-scale=1.0">
 <link href="pflip/css/pdfflip.css" rel="stylesheet" type="text/css">

 <link href="favicon-32x32.png" rel="shortcut icon" type="image/x-icon"/>
 <link href="android-chrome-192x192.png" rel="apple-touch-icon"/>

 <!-- Search Engine -->
<meta name="description" content="NFT Book">
<meta name="image" content="${options.image}">
<!-- Schema.org for Google -->
<meta itemprop="name" content="${options.title}">
<meta itemprop="description" content="${options.description}">
<meta itemprop="image" content="${options.image}">
<!-- Twitter -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${options.title}">
<meta name="twitter:description" content="NFT Book">
<meta name="twitter:site" content="${options.authorTwitter}">
<meta name="twitter:image:src" content="${options.image}">
<!-- Open Graph general (Facebook, Pinterest & Google+) -->
<meta name="og:title" content="${options.title}">
<meta name="og:description" content="NFT Book">
<meta name="og:image" content="${options.image}">
<meta name="og:url" content="${options.purchaseURL}">
<meta name="og:site_name" content="${options.title}">
<meta name="og:type" content="website">
</head>
<body>

<div class="PDFFlip" id="PDFF" source="${options.pdfURL}"></div>

<script src="pflip/js/libs/jquery.min.js" type="text/javascript"></script>
<script src="pflip/js/pdfflip.js" type="text/javascript"></script>
<script type="text/javascript">
var option_PDFF = {
/* BASIC SETTINGS */  
openPage: ${options.openPage || 1},
height: '100%',
enableSound: false,
downloadEnable: false, 
direction: pdfflip.DIRECTION.${options.isRTL ? "RTL" : "LTR"},
autoPlay: ${options.autoPlay || false},
autoPlayStart: ${options.autoPlayStart || false},
autoPlayDuration: ${options.autoPlayDuration || 3000},
autoEnableOutline: false,
autoEnableThumbnail: false,

/* TRANSLATE INTERFACE */  
text: {
  toggleSound: "Sound",
  toggleThumbnails: "Thumbnails",
  toggleOutline: "Contents",
  previousPage: "Previous Page",
  nextPage: "Next Page",
  toggleFullscreen: "Ctrl-click for Fullscreen",
  zoomIn: "Zoom In",
  zoomOut: "Zoom Out",
  downloadPDFFile: "Download PDF",
  gotoFirstPage: "First Page",
  gotoLastPage: "Last Page",
  play: "AutoPlay On",
  pause: "AutoPlay Off",
  share: "Share"
},

/* ADVANCED SETTINGS */
/* pageMode: pdfflip.PAGE_MODE.AUTO */  
hard: "none",
overwritePDFOutline: false,
duration: 1000,
pageMode: pdfflip.SINGLE_PAGE_MODE.AUTO,
singlePageMode: pdfflip.SINGLE_PAGE_MODE.AUTO,
transparent: ${options.isTransparent || false},
scrollWheel: true,
zoomRatio: 1.5,
maxTextureSize: 1600,
backgroundImage: "${options.backgroundImage}",
backgroundColor: "#fff",
controlsPosition: pdfflip.CONTROLSPOSITION.BOTTOM,
allControls: "pageMode,thumbnail,play,startPage,altPrev,pageNumber,altNext,endPage,zoomIn,zoomOut,fullScreen,download,sound,share",
hideControls: "sound,download",
};

var pdfflipLocation = "./pflip/";
</script>
<!--script src="settings.js" type="text/javascript"></script-->
<!--script src="toc.js" type="text/javascript"></script-->

</body>
</html>`;

  return outputString;
};

export {generateBookFromTemplate};
