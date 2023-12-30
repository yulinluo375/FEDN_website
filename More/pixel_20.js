// 首先获取到canvas这个对象，使用querySlector
// 然后对画布进行一些脚本的设定
// 比如画笔的大小就是窗口的大小
// First get the canvas object, using querySlector
// Then you make some scripted settings for the canvas.
// For example, the size of the brush is the size of the window.
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight





let img = new Image()
img.src = "picture/20.png"
// img.src = "data:image/gif;base64,<?php echo base64_encode(fread(fopen('picture/luxun1.png', 'r'), filesize('picture/luxun1.png')));?>"

// < img src = "data:image/gif;base64,<?php echo base64_encode(fread(fopen('12.jpg', 'r'), filesize('12.jpg')));?>" />


// 这里声明一个空的数组，用来储存粒子
// partivArray 意思是零件数组
// Declare an empty array here to store the particles.
let particleArray = []




// 监听事件，意思是只有图片加载出来之后才能实施以下的步骤
// 因为生成的粒子是根据图片上的像素生成的。
// Listening to events means that the following steps can only be implemented once the image has been loaded
// because the particles generated are based on the pixels on the image.
img.addEventListener('load', () => {
    // 监听图片的加载之后还要创建一个画布，画布的大小直接等于图片的大小
    // Listen for images to load and then create a canvas whose size is directly equal to the size of the image.
    let ic = document.createElement("canvas")
    let ictx = ic.getContext("2d")
    ic.width = img.width
    ic.height = img.height
    // 再把图片写进画布里面
    // Write the image to the canvas
    ictx.drawImage(img, 0, 0, img.width, img.height)
    // 接下来需要获取图片里面的一些信息
    // Next, you need to get some information about the inside of the image

    let imgdata = ictx.getImageData(0, 0, img.width, img.height)




    // imgdata里面还有一个data属性，能够提供一个数组，数组里面的数据就是图片的像素信息
    // imgdata.data里面每4个数字都是一个数组，代表了像素点的rgba
    // a是透明度，即alpha，数值从0-1，0就是完全透明。
    // 创建一个数组，主要用于存放每隔像素点的序号信息。
    // imgdata also has a data property that provides an array of the pixel information of the image.
    // Every 4 digits in imgdata.data is an array representing the rgba of the pixel point.
    // a is the transparency, or alpha, value from 0-1, 0 is full transparency.
    // Create an array that is mainly used to hold information about the serial number of every other pixel point.
    let imgArr = []

    // 创建一个循环，循环的次数是像素的数量，像素的数量通过imgdata.data的长度除以4来获得
    // Create a loop where the number of loops is the number of pixels, which is obtained by dividing the length of imgdata.data by 4
    for (let i = 0; i < imgdata.data.length / 4; i++) {
        imgArr.push(i)
    }


    // 再创建一个函数，绘制粒子
    // 注意，这个函数里面的“|0”，是一个取整运算，也就是去掉小数的部分
    // Create another function to draw the particles
    // Note that the "|0" in this function is a rounding operation, i.e., it removes the fractional part.
    let newparticle = () => {
        for (let c = 0; c < 100; c++) {
            let ind = (Math.random() * imgArr.length) | 0
            let ci = imgArr[ind]
            let cx = ci % img.width
            let cy = (ci / img.width) | 0
            let r = imgdata.data[ci * 4]
            let g = imgdata.data[ci * 4 + 1]
            let b = imgdata.data[ci * 4 + 2]
            // 由于目前的图片是完全不透明的，所以所有的像素点的a值都是1、
            // Since the current image is completely opaque, all pixel points have an a value of 1
            let color = `rgb(${r},${g},${b})`
            particleArray.push(new Particle(
                cx + (canvas.width - img.width) / 2,
                cy + (canvas.height - img.height) / 2,
                color
            ))
            // 再每生成一个粒子，就删除一个对应的像素点。
            // Delete a corresponding pixel point for every particle generated again.
            ictx.clearRect(cx, cy, 1, 1)
            imgArr.splice(ind, 1)

            // 为了减少渲染的信息，删除一点粒子数量。
            // Remove a bit of the particle count in order to reduce the amount of information rendered.
            for (let i = 0; i < 3; i++) {
                let ind = (Math.random() * imgArr.length) | 0
                let ci = imgArr[ind]
                let cx = ci % img.width
                let cy = (ci / img.width) | 0
                ictx.clearRect(cx, cy, 1, 1)
                imgArr.splice(ind, 1)
            }
        }


    }



    // 创建一个函数，来根据数组里面的像素信息绘制粒子。
    // Create a function to draw particles based on the pixel information inside the array.
    let p_draw = () => {
        ctx.fillStyle = "rgba(0,0,0)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            ic,
            (canvas.width - ic.width) / 2,
            (canvas.height - ic.height) / 2,
            ic.width,
            ic.height,
        )
        newparticle()
        for (let i = 0; i < particleArray.length; i++) {
            // 执行每个粒子的update,更新每个粒子的位置，而不只是单纯的生成粒子
            // Perform an update on each particle, updating the position of each particle instead of just spawning it.
            particleArray[i].update()
            particleArray[i].draw()
            // 当粒子到了一定的数目，对粒子进行删除处理
            // Delete a particle when it reaches a certain number of particles.
            if (particleArray[i].t > 50) {
                particleArray.splice(i, 1)
            }
            // 这种粒子动画要不断生成和删除粒子，不断执行定时器会非常消耗性能
            // This type of particle animation is constantly generating and deleting particles, 
            // which makes it very performance intensive to keep executing the timer.
        }

        // 防止卡顿,新的API，参数设置一个回调函数，替换掉以前用的定时器
        // API的执行依赖于刷新率
        // To prevent lagging, the new API, parameterised with a callback function, replaces the previously used timer.
        // API execution depends on refresh rate
        requestAnimationFrame(p_draw)

    }
    p_draw()

})



class Particle {
    // 设定例子的坐标与颜色，还有变化的坐标
    // Setting the coordinates and colours of the examples, as well as the coordinates of the changes.
    constructor(x, y, c) {
        this.x = x
        this.y = y
        this.color = c
        this.vy = -Math.random()
        this.vx = Math.random()
        this.t = 0
    }

    // 粒子的坐标发生变化
    // 1.15作为变化的系数，系数越大，xy（即粒子的坐标变换的就越快）
    // The particle's coordinates change
    // 1.15 as a coefficient of variation, the larger the coefficient, the faster xy (i.e., the particle's coordinates) will transform

    update() {
        this.y += this.vy
        this.x += this.vx
        this.vy *= 1.7
        this.vx *= 2.0
        this.t++
    }



    // 生成粒子，创建粒子生成的路径
    // Generate particles, create paths for particle generation
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.y, this.x, this.vx, this.vy);

        // 根据粒子的坐标位置，画一个小圆粒子
        // ctx.arc(this.y, this.x, this.vx / 3, 0, Math.PI * 2, 0)
        ctx.fill()
        // ctx.strokeStyle = this.color;

    }

    // 生成粒子是根据图片上的像素生成的，生成粒子之后还需要把图片上对应的像素去除掉。
    // 这一部分是这段代码的难点
    // Generating particles is based on the pixels in the image, and after generating the particles you need to remove the corresponding pixels from the image.
    // This is the hard part of this code

} 
