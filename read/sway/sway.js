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