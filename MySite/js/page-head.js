var img = new Image();
img.src = "/img/bg.jpg";
img.addEventListener("load", function () {
    var pageHead = document.querySelector(".page-head");
    pageHead.style.background = "url(" + img.src + ") center center no-repeat";
    pageHead.style.filter = "blur(3)";
    var sizeX = 0;
    var sizeY = 0;
    var w_h = 0; //0 for height; 1 for width;
    if (pageHead.offsetWidth / pageHead.offsetHeight < img.width / img.height) {
        sizeY = pageHead.offsetHeight;
        sizeX = img.width / img.height * sizeY;
        w_h = 0;
    } else {
        sizeX = pageHead.offsetWidth;
        sizeY = img.height / img.width * sizeX;
        w_h = 1;
    }
    var direction = true;
    var speedX = 2;
    var speedY = 2;
    var maxsizeX = sizeX * 2;
    var minsizeX = sizeX;
    window.addEventListener("resize", function (event) {
        if (pageHead.offsetWidth / pageHead.offsetHeight < img.width / img.height) {
            sizeY = pageHead.offsetHeight;
            sizeX = img.width / img.height * sizeY;
            w_h = 0;
        } else {
            sizeX = pageHead.offsetWidth;
            sizeY = img.height / img.width * sizeX;
            w_h = 1;
        }
        maxsizeX = sizeX * 2;
        minsizeX = sizeX;
        direction = true;
        speedX = 2;
        speedY = 2;
    });
    (function loop() {
        function setloop() {
            return function () {
                requestAnimationFrame(loop);
            };
        }
        if (sizeX >= maxsizeX && direction || sizeX <= minsizeX && !direction) {
            speedX = -speedX;
            speedY = -speedY;
            direction = !direction;
            if(direction)
                pageHead.filter = "blur(3)";
            else
                pageHead.filter = "blur(0)";
            setTimeout(setloop(), 3000);
        } else {
            sizeX += speedX;
            sizeY += speedY;
            pageHead.style.backgroundSize = sizeX.toString() + "px " + sizeY.toString() + "px";
            requestAnimationFrame(loop);
        }
    })();
});