var panelItems = document.querySelectorAll("#panel-item");
function getElementPos(element) {
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current != null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return {
        left: actualLeft,
        top: actualTop
    };
}
(function () {
    var rotateX = 8, rotateY = 8;
    for (var i = 0, length = panelItems.length; i < length; ++i) {
        (function (panelItem) {
            panelItem.style.transition = "transform 0.05s linear, outline-color 0.05s ";
            panelItem.style.border = "solid 4px transparent"
            panelItem.parentNode.style.perspective = "500px";
            panelItem.position = getElementPos(panelItem);
            panelItem.parentNode.addEventListener("mousemove", function (event) {
                //panelItem.style.outline = "solid 2px rgb(10,10,17)";
                var centerX = panelItem.offsetWidth / 2;
                var centerY = panelItem.offsetHeight / 2;
                var mouseXDis = event.pageX - panelItem.position.left - centerX;
                var mouseYDis = event.pageY - panelItem.position.top - centerY;
                var rotateXFactor = -Math.sign(mouseYDis) * Math.min(Math.abs(mouseYDis) / centerY, 1);
                var rotateYFactor = Math.sign(mouseXDis) * Math.min(Math.abs(mouseXDis) / centerX, 1);
                var actualRotateX = rotateX * rotateXFactor + "deg";
                var actualRotateY = rotateY * rotateYFactor + "deg";
                panelItem.style.transform = "translateZ(40px) rotateX(" + actualRotateX + ") rotateY(" + actualRotateY +")";
                panelItem.style.outline = "2px solid rgb(40,100,120)";
                //panelItem.style.transformStyle = "preserve-3d";
                var width = panelItem.offsetWidth;
                var height = panelItem.offsetHeight;
            })

            panelItem.parentNode.addEventListener("mouseleave", function (event) {
                panelItem.style.outline = "none";
                panelItem.style.transform = "";
                panelItem.backgroundColor = "";
                panelItem.style.width = "";
                panelItem.style.height = "";
            })

        })(panelItems[i]);
    }
    window.addEventListener("resize", function(event){
        for (var i = 0, length = panelItems.length; i < length; ++i) {
            panelItems[i].position = getElementPos(panelItems[i]);
        }
    })
})();
