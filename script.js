

function fade(s, e, duration) {
	return new Promise((resolve) => {
		const start = performance.now();
		function frame(now) {
			const p = Math.min((now - start) / duration, 1);
			const i = s + (e - s) * p;
			
			document.documentElement.style.setProperty(
				"--number-opacity",
				i * MAX_OPACITY
			);
			
			// document.documentElement.style.setProperty(
			// 	"--blur-amount",
			// 	i
			// );
			p < 1 ? requestAnimationFrame(frame) : resolve();
		}
		requestAnimationFrame(frame);
	});
}

async function updateTime() {
	// await fade(0.0125, 1.0, 5000);
	await fade(1.0, 0.0, 500);

	/*
	const time = new Date();
	let M = time.getMonth() + 1;
	let d = time.getDate();
	let h = time.getHours();
	let m = time.getMinutes();

	if (M < 10) M = "0" + M;
	if (d < 10) d = "0" + d;
	if (m < 10) m = "0" + m;
	if (h < 10) h = "0" + h;

	document.getElementById("month").innerHTML = M;
	document.getElementById("day").innerHTML = d;
	document.getElementById("hour").innerHTML = h;
	document.getElementById("min").innerHTML = m;
	*/

	const time = new Date();
	let M = time.getMonth() + 1;
	let d = time.getDate();
	let h = time.getHours();
	let m = time.getMinutes();

	if (M < 10) M = "0" + M;
	if (d < 10) d = "0" + d;
	if (m < 10) m = "0" + m;
	if (h < 10) h = "0" + h;

	document.getElementById("MMDD").innerHTML = M + " " + d;
	document.getElementById("HHMM").innerHTML = h + ":" + m;

	// await fade(1.0, 0.0125, 5000);
	await fade(0.0, 1.0, 500);

}


const MAX_OPACITY = 0.5;
async function moveCenter() {
	const time = new Date();
	let t = (time.getHours() * 60 + time.getMinutes() + (time.getSeconds() / 60) + (time.getMilliseconds() / 60000)) / 1440; // total minutes since midnight
	let multiplier = 1.0; // adjust this value to control the speed of the sine wave
	t = (t * multiplier) % 1; // keep t in the range [0, 1]

	// Orbit around the screen center. The radius is in vmin (not %) so x and y
	// use the same length unit; with % on a non-square screen the path is an ellipse.
	const orbitRadius = 40; // vmin

	// 0 = starts at top (noon)
	const angle_offset = 0; 
	
	const angle = t * 2 * Math.PI	+ angle_offset;

	document.documentElement.style.setProperty(
		"--circle-x",
		`calc(50% + ${Math.sin(angle) * orbitRadius}vmin)`
	);

	document.documentElement.style.setProperty(
		"--circle-y",
		// cosine is 90° out of phase with sine
		`calc(50% + ${Math.cos(angle) * orbitRadius}vmin)`
	);

}

// Update immediately once
updateTime();

// Update every minute (60,000 ms)
setInterval(updateTime, 60000);
setInterval(moveCenter, 50);


/*
// Mouse follower
const MAX_OPACITY = 0.5;
const SIZE_PER_PX = 100.0; // size increase per pixel of mouse movement
const MIN_SIZE = 50; // px, size when the mouse is still
const MAX_SIZE = 150; // px, cap for very fast movement

let x_ = window.innerWidth / 2;  // latest mouse position
let y_ = window.innerHeight / 2;
let size_ = MIN_SIZE;       // current (displayed) size
let targetSize_ = MIN_SIZE; // size the current speed asks for
const LERP = 0.1;           // 0..1, fraction of the gap closed per frame

// Displayed centers, eased toward the mouse position.
let followerX_ = x_;
let followerY_ = y_;
let circleX_ = x_;
let circleY_ = y_;
const FOLLOWER_LERP = 0.2;  // follower dot trails the mouse slightly
const CIRCLE_LERP =   0.2;   // --circle-x/y trail more slowly

const follower = document.querySelector(".mouse-follower");

function lerp(a, b, t) {
	return a + (b - a) * t;
}

document.addEventListener("mousemove", (e) => {
	// Target size grows with mouse speed (pixels moved since last event).
	const speed = Math.hypot(e.clientX - x_, e.clientY - y_);
	targetSize_ = Math.min(MIN_SIZE + speed * SIZE_PER_PX, MAX_SIZE);

	x_ = e.clientX;
	y_ = e.clientY;
});

function animateFollower() {
	// Target falls back to MIN_SIZE when no mouse events arrive (mouse stopped).
	size_ = lerp(size_, targetSize_, LERP);
	targetSize_ = lerp(targetSize_, MIN_SIZE, LERP);

	follower.style.width = `${size_}px`;
	follower.style.height = `${size_}px`;

	followerX_ = lerp(followerX_ , x_, FOLLOWER_LERP);
	followerY_ = lerp(followerY_ , y_, FOLLOWER_LERP);
	circleX_ = lerp(circleX_, x_, CIRCLE_LERP);
	circleY_ = lerp(circleY_, y_, CIRCLE_LERP);

	// circleX_ = followerX_;
	// circleY_ = followerY_;
	// followerX_ = circleX_;
	// followerY_ = circleY_;

	const r = size_ / 2;
	follower.style.transform = `translate(${followerX_ - r}px, ${followerY_ - r}px)`;

	document.documentElement.style.setProperty(
		"--number-opacity",
		`${Math.min(size_ / MAX_SIZE, 1.0) * MAX_OPACITY}`
	);

	document.documentElement.style.setProperty(
		"--circle-x",
		`${circleX_}px`
	);

	document.documentElement.style.setProperty(
		"--circle-y",
		`${circleY_}px`
	);

	requestAnimationFrame(animateFollower);
}
requestAnimationFrame(animateFollower);
*/

// async function breath() {
// 	const time = new Date();
// 	document.documentElement.style.setProperty(
// 		"--blur-amount",
// 		1.0
// 	);
// }
// breath();
// setInterval(breath, 500);
