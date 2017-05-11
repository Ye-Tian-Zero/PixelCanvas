function valid(i, width, height) {
    return ((i >= 0) && (i < width * height * 4));
}

function blur(imageData, i, width, height) {
    var v = imageData[i];
    var north = valid(i - width * 4, width, height) ? imageData[i - width * 4] : v;
    var south = valid(i + width * 4, width, height) ? imageData[i + width * 4] : v;
    var west = valid(i - 4, width, height) ? imageData[i - 4] : v;
    var east = valid(i + 4, width, height) ? imageData[i + 4] : v;

    var ne = valid(i - width * 4 + 4, width, height) ? imageData[i - width * 4 + 4] : v;
    var nw = valid(i - width * 4 - 4, width, height) ? imageData[i - width * 4 - 4] : v;
    var se = valid(i + width * 4 + 4, width, height) ? imageData[i + width * 4 + 4] : v;
    var sw = valid(i + width * 4 - 4, width, height) ? imageData[i + width * 4 - 4] : v;

    var avgVal = Math.floor((north + south + west + east + ne + nw + se + sw + v) / 9);
    return avgVal;
}

function boxBlur(imageData, width, height){
    var data = [];
    var val = 0;
    for(var i = 0; i < width * height * 4; ++i)
    {
        var val = blur(imageData, i, width, height);
        data[i] = val;
    }
    return data;
}

addEventListener("message", function(event){
    with(event.data){
        var newData = boxBlur(imageData, width, height);
        postMessage({
            "startY": startY,
            "imageData":  newData,
            "width": width,
            "height": height,
            "num": num
        });
    }
})