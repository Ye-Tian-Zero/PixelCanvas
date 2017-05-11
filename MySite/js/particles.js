var bgCanvas = document.querySelector("canvas#bg-particles");
bgCanvas.width = bgCanvas.offsetWidth * devicePixelRatio;
bgCanvas.height = (innerHeight - 50) * 0.8 * devicePixelRatio;
bgCanvas.style.marginTop = ((innerHeight - 50) * 0.1 + 50).toString() + "px";
bgCanvas.style.minHeight = "400px";
var w = bgCanvas.width;
var h = bgCanvas.height;
var bgContext = bgCanvas.getContext("2d");
var particlesNum = 40;
var minSpeed = 1;
var maxSpeed = 2;
var minRadius = 5;
var maxRadius = 15;
var particles = [];
var hue_speed = 1;
var funny = false;

function Particle(x, y, speedX, speedY, radius, hue, hue_speed) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.funnySpeedX = speedX;
    this.funnySpeedY = speedY;
    this.radius = radius;
    this.hue = hue;
    this.connectPts = [];
    this.connectCnt = 0;
    if (typeof hue_speed != "number") {
        this.hue_speed = window.hue_speed;
    }
    else {
        this.hue_speed = hue_speed;
    }

    if (typeof this.moveNextPosition != "function") {
        Particle.prototype.moveNextPosition = function () {
            if (funny) {
                this.x += this.funnySpeedX;
                this.y += this.funnySpeedY;
                this.funnySpeedX += (Math.random() - 0.5) * 2;
                this.funnySpeedY += (Math.random() - 0.5) * 2;
            }
            else {
                this.x += this.speedX;
                this.y += this.speedY;
            }
            this.hue += this.hue_speed;
            if (funny) {
                if ((this.x - this.radius <= 0 && this.funnySpeedX < 0) ||
                    (this.x + this.radius >= w && this.funnySpeedX > 0))
                    this.funnySpeedX = -this.funnySpeedX;
                if ((this.y - this.radius <= 0 * devicePixelRatio && this.funnySpeedY < 0) ||
                    (this.y + this.radius >= h && this.funnySpeedY > 0))
                    this.funnySpeedY = -this.funnySpeedY;
            }
            else {
                if ((this.x - this.radius <= 0 && this.speedX < 0) ||
                    (this.x + this.radius >= w && this.speedX > 0))
                    this.speedX = -this.speedX;
                if ((this.y - this.radius <= 0 * devicePixelRatio && this.speedY < 0) ||
                    (this.y + this.radius >= h && this.speedY > 0))
                    this.speedY = -this.speedY;
            }
            if ((this.hue >= 360 && this.hue_speed > 0) ||
                (this.hue <= 0 && this.hue_speed < 0))
                this.hue_speed = - this.hue_speed;
        }
        Particle.prototype.getColor = function (alpha) {
            if (typeof alpha != "number") {
                return "hsl(" + this.hue.toString() + ", 75%, 70%)"
            }
            else {
                return "hsla(" + this.hue.toString() + ", 75%, 70%, " + alpha.toString() + ")";
            }

        }
        Particle.prototype.getDist = function (particle) {
            if (typeof (particle) != "object")
                return 0;
            return Math.sqrt(Math.pow(this.x - particle.x, 2) + Math.pow(this.y - particle.y, 2));
        }
        Particle.prototype.maxDist = Math.max(w, h) / 2;
    }
}

(function () {
    var randomSpeed = function () {
        return Math.sign(Math.random() - 0.5) * (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    }
    for (var i = 0; i != particlesNum; ++i) {
        particles.push(new Particle(
            Math.random() * w,
            Math.random() * h,
            randomSpeed(),
            randomSpeed(),
            Math.random() * (maxRadius - minRadius) + minRadius,
            Math.random() * 360
        ))
    }
    for (var i = 0, length = particles.length; i < length; ++i) {
        var particle = particles[i];
        for (var j = i + 1; j < length; ++j) {
            var distPt = particles[j];
            if (particle.connectCnt < 40 && distPt.connectCnt < 40) {
                particle.connectPts.push(j);
                ++particle.connectCnt;
                ++distPt.connectCnt;
            }
            else {
                continue;
            }

        }
    }
})();

(function loop() {
    requestAnimationFrame(loop);
    bgContext.clearRect(0, 0, w, h);
    particles.forEach(function (item, index, array) {
        item.connectCnt = 0;
    })
    for (var i = 0, length = particles.length; i < length; ++i) {
        var particle = particles[i];
        for (var j = 0, length_pt = particle.connectPts.length; j < length_pt; ++j) {
            var distPt = particles[particle.connectPts[j]];
            var dist = Math.min(particle.getDist(distPt), particle.maxDist);
            var opacity = (particle.maxDist - dist) / particle.maxDist * 0.5;
            //var opacity = 0;
            //console.log(opacity);
            bgContext.beginPath();
            bgContext.strokeStyle = "rgba(230, 230, 230," + opacity.toString() + " )";
            bgContext.moveTo(particle.x, particle.y);
            bgContext.lineTo(distPt.x, distPt.y);
            bgContext.stroke();
        }
    }
    for (var i = 0, length = particles.length; i != length; ++i) {
        var particle = particles[i];
        bgContext.beginPath();
        bgContext.fillStyle = particle.getColor();
        bgContext.moveTo(particle.x + particle.radius, particle.y);
        bgContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        particle.moveNextPosition();
        bgContext.fill();
    }
})();

(function () {
    window.addEventListener("resize", function (event) {
        w = bgCanvas.width = bgCanvas.offsetWidth * devicePixelRatio;
        bgCanvas.style.marginTop = ((innerHeight - 50) * 0.1 + 50).toString() + "px";
        h = bgCanvas.height = (innerHeight - 50) * 0.8 * devicePixelRatio;
        Particle.prototype.maxDist = Math.max(w, h) / 2;
    })
    var funnyButton = document.querySelector("#funny-button");
    var stopButton = document.createElement("button");
    var Handle;
    stopButton.setAttribute("class", "btn btn-danger navbar-btn");
    stopButton.textContent = "STOP";
    funnyButton.addEventListener("click", function (event) {
        if (stopButton.style.width == "") {
            var funnyButtonStyle = getComputedStyle(funnyButton, null);
            stopButton.style.marginLeft = funnyButtonStyle.marginLeft;
            stopButton.style.width = funnyButton.offsetWidth + "px";
            stopButton.style.marginTop = funnyButtonStyle.marginTop;
            stopButton.style.marginLeft = "auto";
            stopButton.style.marginRight = "auto";
            stopButton.style.display = "block";
            stopButton.style.fontSize = funnyButtonStyle.fontSize;
        }
        Handle = setInterval(function () {
            funny = !funny;
        }, 200);
        funnyButton.parentNode.replaceChild(stopButton, funnyButton);
    })

    stopButton.addEventListener("click", function (event) {
        clearInterval(Handle);
        funny = false;
        stopButton.parentNode.replaceChild(funnyButton, stopButton);
    })
})();
