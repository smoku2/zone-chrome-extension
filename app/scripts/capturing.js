var user = {
  "username": "tossy",
  "status": "0"
};
var currentStatus = "0";

// Options for webcam.js
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
var messageBox = document.getElementById('messageBox');

// Take snapshot and assign URI to image source
function capture() {
  Webcam.snap(function(data_uri) {
    img.src = data_uri;
  });
}

var ctrack = new clm.tracker({stopOnConvergence : true});
ctrack.init(pModel);
var drawRequest;

// Animate outline of face
function animate() {
  ctrack.start(document.getElementById('image'));
  drawLoop();
}

// Find coordinates
var position;
function drawLoop() {
  drawRequest = requestAnimFrame(drawLoop);
  overlayCC.clearRect(0, 0, 720, 576);
  position = ctrack.getCurrentPosition();

  if (position) {
    ctrack.draw(overlay);
  }
}

// Event listener for buttons
document.getElementById('capture').addEventListener('click', capture, false);
document.getElementById('animate').addEventListener('click', animate, false);

// detect if tracker fails to find a face
document.addEventListener("clmtrackrNotFound", function(event) {
  ctrack.stop();
  console.log("The tracking had problems with finding a face in this image. Try selecting the face in the image manually.");
}, false);

// detect if tracker loses tracking of face
document.addEventListener("clmtrackrLost", function(event) {
  ctrack.stop();
  console.log("The tracking had problems converging on a face in this image. Try selecting the face in the image manually.");
}, false);

// detect if tracker has converged
document.addEventListener("clmtrackrConverged", function(event) {
  console.dir(position);
  var right_side = position[41][0] - position[1][0];
  var left_side = position[13][0] - position[41][0];
  var diff = Math.abs(right_side - left_side);
  console.log('R: ' + right_side + ' / ' + 'L: ' + left_side);

  if (diff < 40) {
    currentStatus = "1";
    console.log('集中: ', diff, currentStatus);
  } else {
    currentStatus = "0";
    console.log('散漫: ', diff, currentStatus);
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

var updateUserStatus = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://dmtc-baio.herokuapp.com/status/update');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  user.status = currentStatus;
  var data = JSON.stringify(user);
  console.log(data);

  xhr.send(data);
}

var backgroundRoutine = function() {
  capture();
  animate();

  if (user.status != currentStatus) {
    updateUserStatus();
  }
}

window.setInterval('backgroundRoutine()', 15000);
