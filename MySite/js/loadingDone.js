var mainVM = new Vue({
    el: "#main-page",
    data: {
        dp_mode: "hidden"
    }
});

window.onload = function () {
    mainVM.dp_mode = "visible";
    (function loop() {
        if (parseFloat(loadingVM.loadingStyle.opacity) <= 0) {
            loadingVM.visiable = false;
            return;
        }
        else {
            if(loadingVM.progress < 90) {
                loadingVM.progress = 90;
                setTimeout(loop, 500);
                return;
            }
            else if(loadingVM.progress != 100){
                loadingVM.barType["progress-bar-success"] = true;
                loadingVM.progress = 100;
                setTimeout(loop, 100);
                return;
            }
            else {
                loadingVM.loadingStyle.opacity = (parseFloat(loadingVM.loadingStyle.opacity) - 0.05).toString();
                requestAnimationFrame(loop, 16);
            }
        }
    })();
}