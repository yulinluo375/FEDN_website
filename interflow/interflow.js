// 背景生成白色的方块

// 背景生成白色的方块

document.addEventListener("DOMContentLoaded", function () {
    const minBars = 20;
    const maxBars = 35;

    function createRandomRectangularBar() {
        const bar = document.createElement("div");
        bar.className = "rectangular-bar";
        document.body.appendChild(bar);

        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        const width = Math.floor(Math.random() * 100) + 10; // Adjust as needed
        const height = Math.min(1400 / width, maxHeight); // Ensure area is no more than 14000
        const left = Math.floor(Math.random() * (maxWidth - width));
        const top = Math.floor(Math.random() * (maxHeight - height));

        bar.style.width = `${width}px`;
        bar.style.height = `${height}px`;
        bar.style.left = `${left}px`;
        bar.style.top = `${top}px`;
    }

    // 建立生成随机白色方块的路径
    function generateRandomBars() {
        setInterval(() => {
            const numberOfBars = Math.floor(Math.random() * (maxBars - minBars + 1)) + minBars;

            // Remove existing bars
            const existingBars = document.querySelectorAll(".rectangular-bar");
            existingBars.forEach(bar => bar.remove());

            for (let i = 0; i < numberOfBars; i++) {
                createRandomRectangularBar();
            }
        }, 1500); // Refresh bars every 1 second
    }

    generateRandomBars();
})


// 鼠标效果

document.onmousemove = function (event) {


    //1、Create div
    var _div = document.createElement("div");

    //Generate random width and height
    var random = Math.floor(Math.random() * 30) + 10;

    _div.style.width = random + "px";//节点宽度

    _div.style.height = random + "px";//节点高度

    _div.style.borderRadius = "1%";//圆形

    _div.style.backgroundColor = randomColor();//随机背景色
    //2、Position the div
    _div.style.position = "absolute";

    _div.style.left = (event.clientX - random / 2) + "px";//左边距
    _div.style.top = (event.clientY - random / 2) + "px";//右边距


    //3、Add div
    document.body.appendChild(_div);
    //4、Delayed deletion of div
    setTimeout(function () {

        _div.remove();

    }, 500)
}
//Generate random colours
function randomColor() {

    var random1 = Math.floor(Math.random() * 0);

    var random2 = Math.floor(Math.random() * 256);

    var random3 = Math.floor(Math.random() * 0);

    return `rgb(${random1},${random2},${random3})`;
}



