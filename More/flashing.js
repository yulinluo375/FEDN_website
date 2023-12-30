// 建立画布，让画布大小等于窗口大小
// Create a canvas so that the size of the canvas is equal to the size of the window.
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;





// Create 200 rectangles and create an array of rectangles with size and position information.
let num = 100;
let rects = [];
// Create a for loop
// x,y are the x-axis position and y-axis position where the rectangle appears. the following formula allows the rectangle to
// appear randomly at a location on the canvas. r is the size of the rectangle.
for (let i = 0; i < num; i++) {
    // rects.push(
    //     {
    //         x: Math.random() * w,
    //         y: Math.random() * h,
    //         r: Math.random() * 10 + 8
    //     });

    rects.push(
        {
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 2 + 7
        });
}






// In addition to the loop that draws the rectangles, if you want the rectangles to have a moving and generating effect, you need to loop through each rectangle as well.
// Now write the snowflake script, which creates a separate loop for each rectangle.
// The following equations make sense for each rectangle.
// *2+1 controls the angle at which the rectangle moves.
let move = () => {
    for (let i = 0; i < num; i++) {
        let rect = rects[i];
        rect.x += Math.random() * 100 + 1;
        rect.y += Math.random() * 100 + 8;
        // The next step is to put a limit on the movement of the rectangle xy, i.e., not to exceed the screen, and to return to zero if the screen is exceeded.
        if (rect.x > w) {
            rect.x = 0;
        }
        if (rect.y > h) {
            rect.y = 0
        }

    }
}

// Create another function that creates a loop for drawing the rectangle (setting the basic style). Clear the canvas before each drawing. fill_shadow_blur
let draw = () => {
    context.clearRect(0, 0, w, h);
    // Empty the canvas

    // Pathstart
    context.beginPath();
    // First set the style of the rectangle
    context.fillStyle = 'rgb(0,255,0)';
    context.shadowColor = 'rgb(255,0,0)';
    context.shadowBlur = 10;

    // Then build the loop.
    for (let i = 0; i < num; i++) {
        let rect = rects[i];
        context.moveTo(rect.x * 30, rect.y + 20);
        context.fillRect(rect.x, rect.y, 20, 20);
        // context.arc(snow.x, snow.y, snow.r, 2, Math.PI * 3);

    }

    //    Fill Canvas
    context.fill();


    // 路径结束CLOSE
    context.closePath();

    move();
}
// Start a timer that automatically executes every 30 milliseconds.
draw();
setInterval(draw, 30);





