/* ===
Adapted from:
ml5 Example
PoseNet example using p5.js
Available at https://ml5js.org
=== */

let video;
let poseNet;
let poses = [];
let side = 'left';
let camera = 'rear';


let hip, elbow, shoulder,trunkLean, angle, angle1;

function setup() {
	createCanvas(640, 480); //畫面長寬比
  	video = createCapture(VIDEO); //載入鏡頭
  	video.hide(); //隱藏第2畫面

	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, modelReady);

	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	// and extracts only the keypoints we are interested in (knee, hip, ankle, shoulder)
	// before also calculating the angles between these keypoints with atan2
	poseNet.on('pose', function(results) {
		poses = results;

		if (poses.length > 0) {
					hip = poses[0].pose.leftHip;
                    elbow = poses[0].pose.leftElbow;				
					shoulder = poses[0].pose.leftShoulder;
					angle =
						(Math.atan2(shoulder.y - elbow.y, shoulder.x - elbow.x) - Math.atan2(hip.y - elbow.y, hip.x - elbow.x)) *
						(180 / Math.PI);
		}
	})

	// Hide the video element, and just show the canvas
	video.hide();

	textFont('Open Sans');
	textSize(22);
}

function modelReady() {
	console.log('pose classification ready!');
}

function draw() {
	clear();
	image(video, 0, 0, width, height);

	fill('white');
	strokeWeight(0);
	stroke('#A0AEC0');
	rectMode(CENTER);
	rect(45, 24, 60, 25, 15);

	fill('#4A5568');
	noStroke();
	textSize(12);
	textAlign(CENTER, CENTER);
	textStyle(BOLD);
	textFont('sans-serif');
	displaySide = side.toUpperCase();
	text(displaySide, 45, 25);

	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
	drawSkeleton();

	if (poses.length > 0) {
		// draws the angles as they happen over the video feed
		fill('#FFFFFF');
		text(angle,width/2,height/2);
	}
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		let pose = poses[i].pose;
		for (let j = 0; j < pose.keypoints.length; j++) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			let keypoint = pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.5) {
				push();
				fill('rgba(255,255,255, 0.5)');
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
				pop();
			}
		}
	}
}

// A function to draw the skeletons
function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
		let skeleton = poses[i].skeleton;
		// For every skeleton, loop through all body connections
		for (let j = 0; j < skeleton.length; j++) {
			let partA = skeleton[j][0];
			let partB = skeleton[j][1];
			push();
			stroke('rgba(255,255,255, 0.5)');
			strokeWeight(2);
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
			pop();
		}
	}
}