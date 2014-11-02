Webcam.set({
width: 625,
height: 500,
image_format: 'jpg',
jpeg_quality: 90
});
Webcam.attach('image');

var cc = document.getElementById('image').getContext('2d');
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');

var img = new Image();
img.onload = function() {
cc.drawImage(img, 0, 0, 625, 500);
};

function takeSnapshot() {
// take snapshot and get image data
Webcam.snap(function(data_uri) {
// insert image uri to source
img.src = data_uri;
});
}

var ctrack = new clm.tracker({stopOnConvergence : true});
ctrack.init(pModel);
var drawRequest;

function animateClean() {
ctrack.start(document.getElementById('image'));
drawLoop();
}

function animate(box) {
ctrack.start(document.getElementById('image'), box);
drawLoop();
}

var position;
function drawLoop() {
drawRequest = requestAnimFrame(drawLoop);
overlayCC.clearRect(0, 0, 720, 576);
position = ctrack.getCurrentPosition();

if (position) {
ctrack.draw(overlay);
}
}

document.getElementById('takeSnapshot').addEventListener('click', takeSnapshot, false);
document.getElementById('animateClean').addEventListener('click', animateClean, false);

// detect if tracker fails to find a face
document.addEventListener("clmtrackrNotFound", function(event) {
	ctrack.stop();
	alert("The tracking had problems with finding a face in this image. Try selecting the face in the image manually.")
}, false);

// detect if tracker loses tracking of face
document.addEventListener("clmtrackrLost", function(event) {
	ctrack.stop();
	alert("The tracking had problems converging on a face in this image. Try selecting the face in the image manually.")
}, false);

// detect if tracker has converged
document.addEventListener("clmtrackrConverged", function(event) {
	console.dir(position);
	var right_side = position[41][0] - position[1][0];
	var left_side = position[13][0] - position[41][0];
	var diff = Math.abs(right_side - left_side);
	console.log('R: ' + right_side + ' / ' + 'L: ' + left_side);

	if (diff < 30) {
		document.getElementById('result').innerHTML = '集中';
	} else {
		document.getElementById('result').innerHTML = '散漫';
	}

	// stop drawloop
	cancelRequestAnimFrame(drawRequest);
}, false);

// function to start showing images
function loadImage() {
	if (fileList.indexOf(fileIndex) < 0) {
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				// check if positions already exist in storage

				// Render thumbnail.
				var canvas = document.getElementById('image')
				var cc = canvas.getContext('2d');
				var img = new Image();
				img.onload = function() {
					if (img.height > 500 || img.width > 700) {
						var rel = img.height/img.width;
						var neww = 700;
						var newh = neww*rel;
						if (newh > 500) {
							newh = 500;
							neww = newh/rel;
						}
						canvas.setAttribute('width', neww);
						canvas.setAttribute('height', newh);
						cc.drawImage(img,0,0,neww, newh);
					} else {
						canvas.setAttribute('width', img.width);
						canvas.setAttribute('height', img.height);
						cc.drawImage(img,0,0,img.width, img.height);
					}
				}
				img.src = e.target.result;
			};
		})(fileList[fileIndex]);
		reader.readAsDataURL(fileList[fileIndex]);
		overlayCC.clearRect(0, 0, 720, 576);
		ctrack.reset();
	}
}