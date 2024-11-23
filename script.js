let startY = 0;
let initialTouch = 0;
let lastTouch = 0;
let isTwoFinger = false;
let startDistance = 0;

// Detect gestures
function handleTouchStart(event) {
    if (event.touches.length === 1) {
        startY = event.touches[0].clientY;
        initialTouch = startY;
        isTwoFinger = false;
    } else if (event.touches.length === 2) {
        startDistance = getDistance(event.touches[0], event.touches[1]);
        isTwoFinger = true;
    }
}

function handleTouchMove(event) {
    if (event.touches.length === 1 && !isTwoFinger) {
        let touchMoveY = event.touches[0].clientY;
        let diff = startY - touchMoveY;

        // Scroll based on movement direction
        window.scrollBy(0, diff);
        startY = touchMoveY;
    } else if (event.touches.length === 2 && isTwoFinger) {
        let currentDistance = getDistance(event.touches[0], event.touches[1]);
        let diff = startDistance - currentDistance;

        // Scroll in opposite direction (two fingers swipe up -> scroll down)
        window.scrollBy(0, diff);
        startDistance = currentDistance;
    }
}

// Helper function to calculate the distance between two points
function getDistance(touch1, touch2) {
    let dx = touch1.clientX - touch2.clientX;
    let dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Attach event listeners
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
