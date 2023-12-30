
// 关于首页背景上随机生成的白色方块
// 同一时间内生成的白色方块不少于5个，不多于10个
// 白色方块的大小不超过14000
// 生成的白色方块每2秒刷新（建立一个循环）

document.addEventListener("DOMContentLoaded", function () {
    const minBars = 5;
    const maxBars = 10;

    function createRandomRectangularBar() {
        const bar = document.createElement("div");
        bar.className = "rectangular-bar";
        document.body.appendChild(bar);

        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        const width = Math.floor(Math.random() * 100) + 20; // Adjust as needed
        const height = Math.min(14000 / width, maxHeight); // Ensure area is no more than 14000
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
        }, 1000); // Refresh bars every 1 second
    }

    generateRandomBars();





    // Mouse Tracking
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

});


// // 下拉菜单dropdown（不成功的写法）
// // 首先将各元素存储到变量值中，以便重复使用
// // 之前只设置了class，现在要在js里面存变量，首先返回html中给元素加上id
// const dropdowndt = document.getElementById("dt");
// const dropdowndd = document.getElementById("dd");

// // 创建一个函数来切换下拉元素上的class=show.
// const toggledropdown = function () {
// dropdowndd.classList.toggle("show");
// }

// // 无论何时点击点击按钮，都会触发这个函数
// // stopPropagation是为了阻止函数的两次运行（？？？）
// dropdowndt.addEventListener("click", function (e) {
// e.stopPropagation();
// toggledropdown();
// });



// 下拉菜单
const moreLink = document.getElementById("more-link");
moreLink.addEventListener("mouseenter", showContent);
moreLink.addEventListener("click", hideContent);

function showContent() {
    const contentDiv = document.getElementById("dd");
    contentDiv.style.display = "block";
}
function hideContent() {
    const contentDiv = document.getElementById("dd");
    contentDiv.style.display = "none";
}





// 弹窗

function showDiv1() {
    document.getElementById('popDiv1').style.display = 'block';
    document.getElementById('bg1').style.display = 'block';
}
function closeDiv1() {
    document.getElementById('popDiv1').style.display = 'none';
    document.getElementById('bg1').style.display = 'none';
}

function showDiv2() {
    document.getElementById('popDiv2').style.display = 'block';
    document.getElementById('bg2').style.display = 'block';
}
function closeDiv2() {
    document.getElementById('popDiv2').style.display = 'none';
    document.getElementById('bg2').style.display = 'none';
}

function fn1() {
    var obt1 = document.getElementById("bt1");
    var oclose1 = document.getElementById("close1");
    obt1.onclick = function () {
        showDiv1();
    }
    oclose1.onclick = function () {
        closeDiv1();

    }
}
function fn2() {
    var obt2 = document.getElementById("bt2");
    var oclose2 = document.getElementById("close2");
    obt2.onclick = function () {
        showDiv2();
    }
    oclose2.onclick = function () {
        closeDiv2();
    }
}

window.onload = function () {
    fn1();
    fn2();
}


// Login界面内部的动效
const container = document.getElementsByClassName('container')[0];
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');

signUp.onclick = function () {
    container.classList.add('active');
}
signIn.onclick = function () {
    container.classList.remove('active');
}







