const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');

const frameCount = 192;
const currentFrame = index => `anh-1/seq_${index}.webp`;

const images = [];
const imageState = {
    loaded: 0
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
        imageState.loaded++;
        if (imageState.loaded === 1) {
            // Start animation as soon as first image is loaded (optional, or wait for more)
            requestAnimationFrame(updateImage);
        }
    };
    images.push(img);
}

const animationState = {
    frameIndex: 0,
    lastFrameTime: 0,
    fps: 24, // Desired FPS
    frameInterval: 1000 / 24
};

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw current frame on resize
    if (images[animationState.frameIndex] && images[animationState.frameIndex].complete) {
        drawImageCover(context, images[animationState.frameIndex]);
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Draw image covering the canvas (background-size: cover equivalent)
function drawImageCover(ctx, img) {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let renderHeight, renderWidth, xStart, yStart;

    if (canvasRatio < imgRatio) {
        renderHeight = canvas.height;
        renderWidth = imgRatio * renderHeight;
        xStart = (canvas.width - renderWidth) / 2;
        yStart = 0;
    } else {
        renderWidth = canvas.width;
        renderHeight = renderWidth / imgRatio;
        xStart = 0;
        yStart = (canvas.height - renderHeight) / 2;
    }

    // Clear canvas before drawing (though covering it usually suffices)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, xStart, yStart, renderWidth, renderHeight);
}

function updateImage(timestamp) {
    if (!animationState.lastFrameTime) animationState.lastFrameTime = timestamp;

    const elapsed = timestamp - animationState.lastFrameTime;

    if (elapsed > animationState.frameInterval) {
        // Ready to draw next frame
        const img = images[animationState.frameIndex];

        if (img && img.complete) {
            drawImageCover(context, img);
            // Advance frame
            animationState.frameIndex = (animationState.frameIndex + 1) % frameCount;
            animationState.lastFrameTime = timestamp;
        }
    }

    requestAnimationFrame(updateImage);
}
