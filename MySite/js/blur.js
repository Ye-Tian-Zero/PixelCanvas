var img = document.createElement("img");
img.src = "/img/jayChou.jpg";
img.addEventListener("load", function (event) {
    var cvs = document.querySelector("#imgToBlur");
    cvs.width = cvs.offsetWidth;
    cvs.height = cvs.width / 4 * 3;
    cvs.style.boxShadow = "4px 4px 4px #222";
    var ctx = cvs.getContext("2d");
    ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
    var counter = 0;
    var workers = [];
    function MessageHandler(event) {
        var cvs = document.querySelector("#imgToBlur");
        var ctx = cvs.getContext("2d");
        var newData = event.data.imageData;
        var width = event.data.width;
        var height = event.data.height;
        var imgData = ctx.createImageData(event.data.width, event.data.height);
        for (var i = 0, len = imgData.data.length; i < len; ++i) {
            imgData.data[i] = newData[i];
        }
        ctx.putImageData(imgData, 0, event.data.startY);
        this.postMessage({
            "startY": event.data.startY,
            "imageData": ctx.getImageData(0, event.data.startY, width, height).data,
            "width": width,
            "height": height,
            "num": event.data.num
        })
        if(++counter >= event.data.num)
        {
            counter = 0;
            var cntTextarea = document.querySelector("#cnt");
            var txt = cntTextarea.value;
            txt = txt.split(":");
            var num = parseInt(txt[1]);
            num += 1;
            txt = txt[0] + ": " + num;
            cntTextarea.value = txt;
        }
    }

    var btn = document.querySelector("#BlurStart");
    var stpBtn = document.createElement("button");
    stpBtn.type = "button";
    stpBtn.classList.add("btn");
    stpBtn.classList.add("btn-danger");
    stpBtn.classList.add("form-control");
    stpBtn.style.marginTop = btn.style.marginTop;
    stpBtn.innerText = "Stop";
    stpBtn.addEventListener("click", function(event){
        for(var i = 0, len = workers.length; i < len; ++i) {
            workers[i].terminate();
        }
        workers = [];
        stpBtn.parentNode.replaceChild(btn, stpBtn);
        WorkersNum.removeAttribute("disabled");
    })
    btn.addEventListener("click", function (event) {
        btn.parentNode.replaceChild(stpBtn, btn);
        WorkersNum.setAttribute("disabled", "true");
        var num = WorkersNum.value;
        var cvs = document.querySelector("#imgToBlur");
        var ctx = cvs.getContext("2d");
        var width = cvs.width;
        var height = cvs.height;
        var chunkWidth = width;
        var chunkHeight = Math.ceil(height / num);
        for (var idx = 0; idx < num; ++idx) {
            var newWorker = new Worker("/js/blurAux.js");
            newWorker.addEventListener("message", MessageHandler);
            var startY = chunkHeight * idx;
            console.log(startY);
            newWorker.postMessage({
                "startY": startY,
                "width": chunkWidth,
                "height": chunkHeight,
                "imageData": ctx.getImageData(0, startY, chunkWidth, chunkHeight).data,
                "num": num
            });
            workers.push(newWorker);
        }
    });
})
