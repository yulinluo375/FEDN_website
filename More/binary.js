
document.getElementById("off").onclick = function () {
    document.body.className = document.body.className != "cls" ? "cls" : "";
}
document.getElementById("star").onclick = function () {
    setInterval(function () {
        document.getElementById("dv").innerHTML = "<span>1001101&nbsp1000101&nbsp1001101&nbsp1001111&nbsp1010010&nbsp101101</span>";
        var span = document.querySelector("span");
        var dv = document.getElementById("dv");

        for (i = 0; i < 100; i++) {
            var sp = span.cloneNode(true);
            dv.appendChild(sp);

            var r = parseInt(Math.random() * 0);
            var g = parseInt(Math.random() * 256);
            var b = parseInt(Math.random() * 0);
            var y = parseInt(Math.random() * 1620);
            var x = parseInt(Math.random() * 800);

            document.getElementById("dv").firstElementChild.style.color = "rgb(" + r + "," + g + "," + b + ")";
            document.getElementById("dv").firstElementChild.style.left = y + "px";
            document.getElementById("dv").firstElementChild.style.top = x + "px";
        }
    }, 500);
};
// 网页每隔10s刷新一次
window.onload = function () {
    setTimeout('myrefresh()', 10000); //指定10秒刷新一次 
}


function myrefresh() {
    window.location.reload();
}