var mainButton = document.querySelector("button.main-button");
var subButtons = document.querySelectorAll("button.sub-button");
mainButton.isOpen = false;
for(var i = 0, length = subButtons.length; i != length; ++ i){
    subButtons[i].style.webkitTransitionDelay = i * 0.1 + "s";
    subButtons[i].style.mozTransitionDelay = i * 0.1 + "s";
    subButtons[i].style.transitionDelay = i * 0.1 + "s";
}
mainButton.addEventListener("mouseup", function(event){
    var interval = 1 / 4 * Math.PI;
    var dist = 70;
    if(!mainButton.isOpen)
    {
        for(var i = 0, length = subButtons.length; i != length; ++ i){
            var posAngle = 3 * interval + i * interval;
            var x_coor = Math.cos(posAngle) * dist;
            var y_coor = Math.sin(posAngle) * dist;
            x_coor = Math.round(x_coor);
            y_coor = Math.round(y_coor);
            subButtons[i].style.webkitTransform = "translateX(" + x_coor + "px) " + "translateY(" + y_coor + "px) rotate(360deg)";
            subButtons[i].style.mozTransform = "translateX(" + x_coor + "px) " + "translateY(" + y_coor + "px) rotate(360deg)";
            subButtons[i].style.transform = "translateX(" + x_coor + "px) " + "translateY(" + y_coor + "px) rotate(360deg)";
            subButtons[i].style.opacity = "1";
        }
    }
    else{
        for(var i = subButtons.length - 1; i >= 0; -- i){
            subButtons[i].style.webkitTransform = "";
            subButtons[i].style.mozTransform = "";
            subButtons[i].style.transform = "";
            subButtons[i].style.opacity = "0";
        }
    }
    if(!mainButton.isOpen) {
        mainButton.style.webkitTransform = "rotate(45deg)";
        mainButton.style.mozTransform = "rotate(45deg)";
        mainButton.style.transform = "rotate(45deg)";
        mainButton.isOpen = true;
    }
    else{
        mainButton.style.webkitTransform = "rotate(0deg)";
        mainButton.style.mozTransform = "rotate(0deg)";
        mainButton.style.transform = "rotate(0deg)";
        mainButton.isOpen = false;
    }
})

